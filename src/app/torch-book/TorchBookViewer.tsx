"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Download, Maximize, Minimize, Volume2, VolumeX, X, ZoomIn, ZoomOut } from "lucide-react";
import { torchBookPages, TORCH_BOOK_PDF, TORCH_BOOK_TITLE } from "@/data/torchBook";
import { DEALER_WHATSAPP } from "@/data/products";
import styles from "./TorchBookViewer.module.css";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

// react-pageflip ships no published .d.ts for the imperative handle — this
// is the subset of the underlying PageFlip instance's API this file uses.
interface PageFlipInstance {
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  flip: (page: number, corner?: "top" | "bottom") => void;
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
}
interface FlipBookHandle {
  pageFlip: () => PageFlipInstance;
}

const PAGE_COUNT = torchBookPages.length;
const LOAD_AHEAD = 3;
// Matches the exported page images (1400×1750) and, before that, the
// original PDF page size (576×720pt) — width / height.
const PAGE_RATIO = 1400 / 1750;
const PORTRAIT_BREAKPOINT = 640;
const GAP = 6;

/** react-pageflip constructs its underlying PageFlip instance exactly once,
    from whatever width/height/size props were passed on first mount — see
    react-pageflip's build/index.js, `if (!pageFlip$1.current) { new
    PageFlip(...) }`. Later prop changes are silently ignored. Worse, its
    own "stretch" sizing mode measures offsetHeight/Width on the same DOM
    node it then resizes via autoSize, so once it renders too large for its
    container it has no way to notice or correct that — every future
    measurement just confirms its own earlier mistake.
    So: don't use "stretch" at all. Measure the real container ourselves
    with ResizeObserver (a node the library never touches), compute the
    correct page size by hand, and force a full remount (via `key`) with
    fixed dimensions whenever that changes — the one reliable way to get
    this library to pick up a new size. */
function computePageSize(containerW: number, containerH: number): { width: number; height: number; isPortrait: boolean } {
  const isPortrait = containerW < PORTRAIT_BREAKPOINT;
  let pageW = isPortrait ? containerW : (containerW - GAP) / 2;
  pageW = Math.max(160, Math.floor(pageW));
  let pageH = Math.floor(pageW / PAGE_RATIO);
  if (pageH > containerH) {
    pageH = Math.max(200, Math.floor(containerH));
    pageW = Math.floor(pageH * PAGE_RATIO);
  }
  return { width: pageW, height: pageH, isPortrait };
}

/** Short synthesized "paper whoosh" — filtered noise burst, no external
    audio asset needed. Fails silently if Web Audio is unavailable/blocked
    (e.g. before a user gesture), since sound here is a non-essential
    enhancement, muted by default anyway. */
function playPageTurnSound() {
  try {
    const AudioCtxCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtxCtor();
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.22);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1900, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.2);
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.21);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.22);
    noise.onended = () => ctx.close();
  } catch {
    // Non-essential — ignore.
  }
}

const BookPage = forwardRef<HTMLDivElement, { index: number; loaded: boolean }>(function BookPage(
  { index, loaded },
  ref
) {
  const page = torchBookPages[index];
  return (
    <div className={styles.page} ref={ref}>
      {loaded ? (
        // eslint-disable-next-line @next/next/no-img-element -- react-pageflip manipulates page DOM directly; next/image's wrapper markup breaks that.
        <img src={page.src} alt={`Torch book page ${index + 1} of ${PAGE_COUNT}`} className={styles.pageImage} draggable={false} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={page.thumb} alt="" aria-hidden="true" className={`${styles.pageImage} ${styles.pagePlaceholder}`} draggable={false} />
      )}
      <span className={styles.pageNumber} aria-hidden="true">
        {index + 1}
      </span>
    </div>
  );
});

export default function TorchBookViewer() {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(() => new Set([0, 1, 2, 3, 4]));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const [pageSize, setPageSize] = useState<{ width: number; height: number; isPortrait: boolean } | null>(null);

  const expandLoaded = useCallback((center: number) => {
    setLoadedPages((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (let i = center - LOAD_AHEAD; i <= center + LOAD_AHEAD + 1; i++) {
        if (i >= 0 && i < PAGE_COUNT && !next.has(i)) {
          next.add(i);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const handleFlip = useCallback(
    (e: { data: number }) => {
      setCurrentPage(e.data);
      expandLoaded(e.data);
      if (!mutedRef.current) playPageTurnSound();
    },
    [expandLoaded]
  );

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // Measure synchronously on mount — don't wait for ResizeObserver's
    // first callback, which in some environments doesn't fire promptly
    // (or, rarely, at all).
    const rect = el.getBoundingClientRect();
    if (rect.width >= 1 && rect.height >= 1) {
      setPageSize(computePageSize(rect.width, rect.height));
    }

    // Debounced: HTMLFlipBook does a full teardown/remount every time
    // pageSize changes (see computePageSize's comment), and ResizeObserver
    // fires repeatedly during layout changes (fonts, images reflowing) —
    // without debouncing, rapid-fire remounts leave the underlying
    // PageFlip instance stuck mid-init.
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width < 1 || height < 1) return;
      clearTimeout(timeout);
      timeout = setTimeout(() => setPageSize(computePageSize(width, height)), 150);
    });
    observer.observe(el);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  const goPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goNext = () => bookRef.current?.pageFlip().flipNext();
  const jumpTo = (index: number) => {
    bookRef.current?.pageFlip().flip(index);
    setShowThumbnails(false);
  };

  const zoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));

  const whatsappHref = useMemo(
    () =>
      `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(
        `Hi KAG Batteries, I was browsing the ${TORCH_BOOK_TITLE} torch book and would like to enquire.`
      )}`,
    []
  );

  const pages = useMemo(
    () => torchBookPages.map((_, i) => <BookPage key={i} index={i} loaded={loadedPages.has(i)} />),
    [loadedPages]
  );

  return (
    <div ref={containerRef} className={styles.viewer}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft size={18} aria-hidden="true" />
          <span>Back to website</span>
        </Link>

        <p className={styles.title}>{TORCH_BOOK_TITLE}</p>

        <div className={styles.controls}>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute page-turn sound" : "Mute page-turn sound"} title={muted ? "Unmute sound" : "Mute sound"}>
            {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
          </button>
          <button type="button" onClick={zoomOut} disabled={zoom <= 1} aria-label="Zoom out" title="Zoom out">
            <ZoomOut size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={zoomIn} disabled={zoom >= 2.5} aria-label="Zoom in" title="Zoom in">
            <ZoomIn size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setShowThumbnails((s) => !s)} aria-label="Toggle page index" title="All pages">
            <BookOpen size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full screen" : "Full screen"} title={isFullscreen ? "Exit full screen" : "Full screen"}>
            {isFullscreen ? <Minimize size={17} aria-hidden="true" /> : <Maximize size={17} aria-hidden="true" />}
          </button>
          <a href={TORCH_BOOK_PDF} download className={styles.iconLink} aria-label="Download PDF" title="Download PDF">
            <Download size={17} aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* ── Book stage ──────────────────────────────────────────────────── */}
      <div className={styles.stage}>
        <button type="button" className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={goPrev} disabled={currentPage <= 0} aria-label="Previous page">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <div className={styles.zoomViewport} ref={viewportRef}>
          <div className={styles.zoomFrame} style={{ transform: `scale(${zoom})` }}>
            {pageSize && (
              <HTMLFlipBook
                // Force a full remount whenever the computed size changes —
                // see the comment on computePageSize for why this library
                // needs that instead of just updating props.
                key={`${pageSize.width}x${pageSize.height}`}
                ref={bookRef}
                width={pageSize.width}
                height={pageSize.height}
                size="fixed"
                minWidth={pageSize.width}
                maxWidth={pageSize.width}
                minHeight={pageSize.height}
                maxHeight={pageSize.height}
                showCover
                usePortrait
                mobileScrollSupport
                maxShadowOpacity={0.4}
                flippingTime={650}
                className={styles.flipbook}
                // With autoSize off, nothing else sets this element's real
                // width — and the library's own portrait/landscape check
                // (blockWidth < pageWidth*2) reads exactly this element's
                // offsetWidth, so without it the check sees ~0 and always
                // falls back to single-page mode, even on a wide desktop
                // window. Supply it ourselves from the same trustworthy
                // measurement computePageSize already used.
                style={{
                  width: pageSize.isPortrait ? pageSize.width : pageSize.width * 2,
                  height: pageSize.height,
                }}
                startPage={currentPage}
                drawShadow
                startZIndex={10}
                autoSize={false}
                swipeDistance={30}
                clickEventForward
                useMouseEvents
                showPageCorners
                disableFlipByClick={false}
                onFlip={handleFlip}
                onInit={() => expandLoaded(currentPage)}
              >
                {pages}
              </HTMLFlipBook>
            )}
          </div>
        </div>

        <button type="button" className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={goNext} disabled={currentPage >= PAGE_COUNT - 1} aria-label="Next page">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      <footer className={styles.bottombar}>
        <span className={styles.pageIndicator}>
          Page {Math.min(currentPage + 1, PAGE_COUNT)} of {PAGE_COUNT}
        </span>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className={styles.whatsappCta}>
          Ask about this torch book on WhatsApp
        </a>
      </footer>

      {/* ── Thumbnail / index panel ─────────────────────────────────────── */}
      {showThumbnails && (
        <div className={styles.thumbPanel} role="dialog" aria-label="Jump to page">
          <div className={styles.thumbHeader}>
            <span>All pages</span>
            <button type="button" onClick={() => setShowThumbnails(false)} aria-label="Close page index">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.thumbGrid}>
            {torchBookPages.map((p, i) => (
              <button
                type="button"
                key={p.src}
                className={`${styles.thumbItem} ${i === currentPage ? styles.thumbActive : ""}`}
                onClick={() => jumpTo(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumb} alt={`Page ${i + 1}`} draggable={false} />
                <span>{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

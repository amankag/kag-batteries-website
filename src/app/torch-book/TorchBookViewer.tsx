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
  /** Direct page changes — no fold/corner geometry involved. */
  turnToNextPage: () => void;
  turnToPrevPage: () => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  getPageCount: () => number;
}
interface FlipBookHandle {
  pageFlip: () => PageFlipInstance;
}

const PAGE_COUNT = torchBookPages.length;
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

const BookPage = forwardRef<HTMLDivElement, { index: number }>(function BookPage({ index }, ref) {
  const page = torchBookPages[index];
  return (
    <div className={styles.page} ref={ref}>
      {/* eslint-disable-next-line @next/next/no-img-element -- react-pageflip manipulates page DOM directly; next/image's wrapper markup breaks that. */}
      <img src={page.src} alt={`Torch book page ${index + 1} of ${PAGE_COUNT}`} className={styles.pageImage} draggable={false} />
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
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(muted);
  const [pageSize, setPageSize] = useState<{ width: number; height: number; isPortrait: boolean } | null>(null);

  // True once the library's page collection is confirmed populated (see
  // the readiness-polling effect below) — all navigation is gated on it,
  // and it resets on every size-change remount.
  const [bookReady, setBookReady] = useState(false);
  const bookReadyRef = useRef(false);

  // All 21 pages (~4.2MB total) load upfront rather than lazily — the
  // earlier lazy-load-nearby-pages scheme meant flipping to an
  // not-yet-loaded page popped from a blurred placeholder to full-res
  // mid-turn, which read as jank on top of the remount issue below.
  // A short branded loading screen up front trades that for a
  // consistently smooth book once it opens.
  const imagesReady = loadedCount >= PAGE_COUNT;

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    torchBookPages.forEach((p) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoadedCount(count);
      };
      img.src = p.src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFlip = useCallback((e: { data: number }) => {
    // The library's confirmed page. currentPageRef is mirrored here rather
    // than only in render so the navigation logic (which runs from event
    // handlers and timers) always reads a fresh value.
    currentPageRef.current = e.data;
    setCurrentPage(e.data);
    if (!mutedRef.current) playPageTurnSound();
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // Measure via setTimeout(0) rather than waiting for ResizeObserver's
    // first callback, which in some environments doesn't fire promptly
    // (or, rarely, at all). Deliberately NOT requestAnimationFrame: rAF
    // callbacks are suspended entirely while the page is hidden (e.g.
    // opened in a background tab), which left the book stuck on its
    // loading screen forever — setTimeout still fires there. And not
    // inline, so the state update isn't synchronous in the effect body.
    /** Mobile browsers grow/shrink the viewport as the address bar hides
        and reveals itself — constantly, while you're reading. Feeding that
        straight into computePageSize resized the book (a full remount)
        every time, which is the page visibly changing size mid-swipe.
        So height is tracked as the tallest seen *for the current width*:
        the bar collapsing reveals the true height and can grow the book,
        but the bar reappearing never shrinks it. A real orientation change
        (different width) resets the baseline. */
    const layout = { width: 0, maxHeight: 0 };

    const applySize = (rawW: number, rawH: number) => {
      if (rawW < 1 || rawH < 1) return;
      if (rawW !== layout.width) {
        layout.width = rawW;
        layout.maxHeight = rawH;
      } else if (rawH > layout.maxHeight) {
        layout.maxHeight = rawH;
      }
      const next = computePageSize(layout.width, layout.maxHeight);
      // Identity-preserving: an unchanged size must NOT produce a new
      // object, or the `key` below churns and remounts the book for
      // nothing (losing the reader's page and flashing the loader).
      setPageSize((prev) =>
        prev && prev.width === next.width && prev.height === next.height && prev.isPortrait === next.isPortrait
          ? prev
          : next
      );
    };

    const initialMeasure = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      applySize(rect.width, rect.height);
    }, 0);

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
      timeout = setTimeout(() => applySize(width, height), 150);
    });
    observer.observe(el);
    return () => {
      clearTimeout(initialMeasure);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  /** Readiness is polled rather than driven by the library's onInit event,
      because that event is unreliable here: react-pageflip calls
      loadFromHTML() (which triggers "init") *before* setHandlers() attaches
      our listener, so onInit is frequently missed entirely — observed
      directly, with bookReady stuck false and the book never opening.

      It also can't just be assumed ready on mount: the library's
      flipToPage() reads its page collection *outside* its own try/catch —

        flipToPage(t){ const i=getPageCollection().getCurrentSpreadIndex(), ... }

      — so a flip issued before that collection exists throws, which is why
      the first swipe after any mount used to be swallowed. (It recurs
      mid-session too: every resize remounts the book.) getPageCount() reads
      the same collection, so it's a safe read-only proxy for "flips will
      work now". All navigation is gated on the resulting bookReady. */
  useEffect(() => {
    if (!pageSize) return;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      const pf = bookRef.current?.pageFlip();
      let ready = false;
      if (pf) {
        try {
          ready = pf.getPageCount() === PAGE_COUNT;
        } catch {
          ready = false;
        }
      }
      // Bail out after ~3s rather than trapping the reader behind a
      // spinner forever.
      if (ready || attempts >= 60) {
        setBookReady(true);
        return;
      }
      attempts += 1;
      timer = setTimeout(check, 50);
    };
    // This effect only re-runs when pageSize changes *identity*, which now
    // only happens on a real size change (see applySize) — and that
    // remounts the book, so gate navigation until the new instance is up.
    timer = setTimeout(() => {
      setBookReady(false);
      check();
    }, 0);
    return () => clearTimeout(timer);
  }, [pageSize]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  /* ── Serialized navigation ────────────────────────────────────────────
     page-flip has no internal guard against overlapping flips, and two of
     its internals make that actively destructive (both verified directly
     in node_modules/page-flip/dist/js/page-flip.module.js):

       flipToPage(t){ const i=getCurrentSpreadIndex(), s=getSpreadIndexByPage(t);
                      try{ s>i && (setCurrentSpreadIndex(s-1), flipNext());
                           s<i && (setCurrentSpreadIndex(s+1), flipPrev()); }catch(t){} }

     — it *mutates* the spread index synchronously, before animating, and
     swallows any error silently; and

       startAnimation(...){ this.finishAnimation(); ... }

     — starting a flip force-completes whatever was mid-flight (jumping it
     to its final frame). So a second flip arriving mid-animation leaves
     spread index and visible page out of sync, which is what produced
     wrong-direction turns and dead swipes.

     Adjacent moves are expressed as a *direction*, not a target page,
     because "one page forward" isn't a page-index step in both layouts:
     in the desktop two-page spread, pages 1 and 2 sit in the same spread,
     so a page-index step targets something already on screen and does
     nothing at all (the dead "next" click). Directions let the library
     move by whole spreads on desktop and single pages in portrait.
     Absolute targets are kept only for thumbnail jumps.

     Because every navigation call below is synchronous (see runNav), a
     request always completes before the next one is accepted — the
     overlapping-flip races that caused wrong-direction turns can't arise
     in the first place.
     ------------------------------------------------------------------ */

  type NavRequest = { kind: "dir"; dir: 1 | -1 } | { kind: "abs"; page: number };

  /** Last page the library *confirmed* via onFlip (kept in sync there, not
      during render). */
  const currentPageRef = useRef(0);

  const runNav = useCallback(
    (req: NavRequest) => {
      const pf = bookRef.current?.pageFlip();
      if (!pf) return;

      // Every *animated* entry point in this library ultimately routes
      // through flipNext()/flipPrev(), which don't take a target at all —
      // they synthesize a fake mouse grab-point from the render rect and
      // let the fold physics infer a direction:
      //
      //   flipNext(){ this.flip({ x: rect.left + 2*rect.pageWidth - 10, … }) }
      //   flipPrev(){ this.flip({ x: 10, … }) }
      //
      // That's fragile in both layouts, and measurably wrong in ours:
      //   • portrait — the book is one pageWidth wide, so flipNext's x
      //     lands off the page and forward turns silently die, while
      //     flipPrev (x:10, always on-page) fires. Exactly the reported
      //     "swipes go backward / forward needs many tries".
      //   • landscape — measured: the first call after mount is dead, and
      //     a later flipPrev() advanced the book *forward* two spreads.
      //   • flip(target) inherits all of it, since flipToPage() just
      //     pre-mutates the spread index and delegates to those two.
      //
      // turnTo*Page skip the fold entirely (pages.showNext()/showPrev()/
      // show()) — pure index moves, spread-aware, no geometry and no
      // pre-mutation, so direction is always correct in both layouts.
      // They're synchronous and fire "flip" inline, so settle immediately
      // rather than awaiting a changeState that will never come.
      //
      // Trade-off: programmatic turns (swipe, arrows, thumbnails) are
      // instant rather than curled. The library's own mouse-drag on
      // desktop is untouched and still animates, since that path builds a
      // real grab-point from the actual pointer.
      const from = currentPageRef.current;
      if (req.kind === "dir") {
        const target = from + req.dir;
        if (target >= 0 && target < PAGE_COUNT) {
          if (req.dir === 1) pf.turnToNextPage();
          else pf.turnToPrevPage();
        }
      } else {
        const target = Math.max(0, Math.min(PAGE_COUNT - 1, req.page));
        if (target !== from) pf.turnToPage(target);
      }
    },
    []
  );

  const requestNav = useCallback(
    (req: NavRequest) => {
      if (!bookReadyRef.current) return;
      runNav(req);
    },
    [runNav]
  );

  const goPrev = useCallback(() => requestNav({ kind: "dir", dir: -1 }), [requestNav]);
  const goNext = useCallback(() => requestNav({ kind: "dir", dir: 1 }), [requestNav]);

  /** On a full-width portrait page there's no room for the library's
      physical drag-to-fold gesture — it decides flip direction by which
      half of the page the touch *started* on (like grabbing a real page's
      left vs. right edge), so a swipe starting anywhere near the middle
      reads as "grabbed the left page" and flips backward regardless of
      which way the finger actually moves, and a full page-width drag is
      needed to pass its fold threshold, which barely fits on a small
      screen. Replaced with a plain swipe/tap detector: swipe direction
      (not start position) decides next/prev, and a tap position picks a
      side — the same convention as most mobile readers.
      useMouseEvents on the flipbook is already false on mobile (see the
      prop below), which stops the library from binding its own
      touchstart/mousedown there at all — no competing handler to fight.
      Capture phase + stopPropagation here is just a defensive second
      layer in case that ever changes. */
  const isPortrait = pageSize?.isPortrait ?? false;
  const gestureEnabled = isPortrait && zoom === 1;

  // Mirrors of render state that the imperative navigation/audio code
  // reads from event handlers and timers. Written in effects, never
  // during render.
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    bookReadyRef.current = bookReady;
  }, [bookReady]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !gestureEnabled) return;

    let start: { x: number; y: number } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      // Ignore multitouch outright — a second finger means pinch/zoom
      // intent, never a page turn.
      if (e.touches.length !== 1) {
        start = null;
        return;
      }
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY };
      e.stopPropagation();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!start) return;
      if (e.touches.length !== 1) {
        start = null;
        return;
      }
      e.stopPropagation();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!start) return;
      e.stopPropagation();
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const rect = el.getBoundingClientRect();
      start = null;

      const SWIPE_THRESHOLD = 32;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goNext();
        else goPrev();
      } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        // A tap, not a swipe — which half of the page was tapped.
        if (t.clientX - rect.left > rect.width / 2) goNext();
        else goPrev();
      }
    };
    const onTouchCancel = () => {
      start = null;
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    el.addEventListener("touchstart", onTouchStart, opts);
    el.addEventListener("touchmove", onTouchMove, opts);
    el.addEventListener("touchend", onTouchEnd, opts);
    el.addEventListener("touchcancel", onTouchCancel, opts);
    return () => {
      const removeOpts: EventListenerOptions = { capture: true };
      el.removeEventListener("touchstart", onTouchStart, removeOpts);
      el.removeEventListener("touchmove", onTouchMove, removeOpts);
      el.removeEventListener("touchend", onTouchEnd, removeOpts);
      el.removeEventListener("touchcancel", onTouchCancel, removeOpts);
    };
  }, [gestureEnabled, goNext, goPrev]);

  const jumpTo = useCallback(
    (index: number) => {
      requestNav({ kind: "abs", page: index });
      setShowThumbnails(false);
    },
    [requestNav]
  );

  const zoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));

  const whatsappHref = useMemo(
    () =>
      `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(
        `Hi KAG Batteries, I was browsing the ${TORCH_BOOK_TITLE} torch book and would like to enquire.`
      )}`,
    []
  );

  const pages = useMemo(() => torchBookPages.map((_, i) => <BookPage key={i} index={i} />), []);

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
        <button type="button" className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={goPrev} disabled={!bookReady || currentPage <= 0} aria-label="Previous page">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <div
          className={`${styles.zoomViewport} ${zoom > 1 ? styles.zoomed : ""} ${gestureEnabled ? styles.gesturePanY : ""}`}
          ref={viewportRef}
        >
          {!(imagesReady && bookReady) && (
            <div className={styles.loadingScreen}>
              <div className={styles.loadingBarTrack}>
                <div className={styles.loadingBarFill} style={{ width: `${(loadedCount / PAGE_COUNT) * 100}%` }} />
              </div>
              <p>Opening the book… {loadedCount}/{PAGE_COUNT}</p>
            </div>
          )}
          <div className={styles.zoomFrame} style={{ transform: `scale(${zoom})`, visibility: imagesReady && bookReady ? "visible" : "hidden" }}>
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
                // Must stay true: the underlying page-flip library registers
                // its touchmove listener as `{ passive: !mobileScrollSupport }`
                // — false here makes that listener passive, so it can no
                // longer preventDefault() during a drag and loses the touch
                // gesture to the browser's own default handling. That's what
                // caused unreliable/backwards-feeling swipes on mobile.
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
                // Desktop only. The library's own gesture handling (both
                // mousedown *and* touchstart are gated by this one flag)
                // decides flip direction by which half of the page a touch
                // *started* on — physically realistic for a two-page spread
                // dragged by mouse, but on a single full-width portrait page
                // a touch starting near the middle reads as "grabbed the
                // left page" and flips backward no matter which way the
                // finger moves, and its fold threshold barely fits a small
                // screen. Mobile gets its own plain swipe/tap handler below
                // instead (see the touch effect above) — crossing this
                // breakpoint already forces a remount via the `key` above,
                // so it's safe to fix this per-mount rather than needing it
                // to react live.
                useMouseEvents={!pageSize.isPortrait}
                showPageCorners={!pageSize.isPortrait}
                disableFlipByClick={false}
                onFlip={handleFlip}
              >
                {pages}
              </HTMLFlipBook>
            )}
          </div>
        </div>

        <button type="button" className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={goNext} disabled={!bookReady || currentPage >= PAGE_COUNT - 1} aria-label="Next page">
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

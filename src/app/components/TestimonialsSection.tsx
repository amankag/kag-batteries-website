"use client";

import { Star } from "lucide-react";
import styles from "./TestimonialsSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useLanguage, type Language } from "./LanguageContext";

type Review = { name: string; role: string; place: string; quote: string };

const reviews: Record<Language, Review[]> = {
  en: [
    {
      name: "Ramesh Patil",
      role: "Hardware Store Owner",
      place: "Nashik, Maharashtra",
      quote:
        "KAG torches we are selling since many years. Quality is genuine, customers never come back with complaint. This is why we trust only KAG.",
    },
    {
      name: "Sunita Deshmukh",
      role: "Electrical Distributor",
      place: "Pune, Maharashtra",
      quote:
        "Best part is delivery on time, every time. Whatever quantity we order, KAG team manages it without any tension. Very professional people.",
    },
    {
      name: "Rajendra Yadav",
      role: "Wholesale Dealer",
      place: "Indore, Madhya Pradesh",
      quote:
        "Direct from factory, so pricing is always fair. My customers ask for KAG by name now—that itself shows the trust we have built together.",
    },
    {
      name: "Anil Kumar Sharma",
      role: "Retail Shop Owner",
      place: "Bhopal, Madhya Pradesh",
      quote:
        "In villages also, power cut is common problem. KAG torch is first choice for farmers here—battery backup is superb and price is right for them.",
    },
    {
      name: "Farida Sheikh",
      role: "General Store Owner",
      place: "Aurangabad, Maharashtra",
      quote:
        "Whenever I message on WhatsApp, reply comes fast, no waiting. Small shop like mine, they treat us with same respect as big dealer. That means a lot.",
    },
  ],
  hi: [
    {
      name: "रमेश पाटील",
      role: "हार्डवेयर स्टोर के मालिक",
      place: "नासिक, महाराष्ट्र",
      quote:
        "काग की टॉर्च हम सालों से बेच रहे हैं। क्वालिटी एकदम असली है, ग्राहक कभी शिकायत लेकर वापस नहीं आते। इसीलिए हम सिर्फ काग पर भरोसा करते हैं।",
    },
    {
      name: "सुनीता देशमुख",
      role: "इलेक्ट्रिकल डिस्ट्रिब्यूटर",
      place: "पुणे, महाराष्ट्र",
      quote:
        "सबसे अच्छी बात है समय पर डिलीवरी, हर बार। जितनी भी क्वांटिटी ऑर्डर करें, काग टीम बिना किसी टेंशन के मैनेज कर देती है। बहुत प्रोफेशनल लोग हैं।",
    },
    {
      name: "राजेंद्र यादव",
      role: "होलसेल डीलर",
      place: "इंदौर, मध्य प्रदेश",
      quote:
        "सीधे फैक्ट्री से मिलता है, इसलिए कीमत हमेशा सही रहती है। अब मेरे ग्राहक नाम लेकर काग मांगते हैं—यही दिखाता है कि हमने साथ में कितना भरोसा बनाया है।",
    },
    {
      name: "अनिल कुमार शर्मा",
      role: "रिटेल शॉप के मालिक",
      place: "भोपाल, मध्य प्रदेश",
      quote:
        "गांवों में भी बिजली कटौती आम समस्या है। यहां किसानों की पहली पसंद काग टॉर्च ही है—बैटरी बैकअप ज़बरदस्त है और कीमत भी उनके हिसाब से सही है।",
    },
    {
      name: "फ़रीदा शेख",
      role: "जनरल स्टोर के मालिक",
      place: "औरंगाबाद, महाराष्ट्र",
      quote:
        "जब भी WhatsApp पर मैसेज करती हूं, जवाब जल्दी आता है, इंतज़ार नहीं करना पड़ता। मेरी जैसी छोटी दुकान को भी वो बड़े डीलर जितनी ही इज़्ज़त देते हैं। यह बहुत मायने रखता है।",
    },
  ],
};

const headingCopy = {
  en: {
    topline: "FROM THE COUNTER",
    eyebrow: "REAL DEALERS. REAL WORDS.",
    title: (
      <>
        Made to be <em>recommended.</em>
      </>
    ),
    body: "From Indore to the counters of Maharashtra and Madhya Pradesh—what the people who sell KAG every day have to say.",
  },
  hi: {
    topline: "काउंटर से",
    eyebrow: "असली डीलर। असली बातें।",
    title: (
      <>
        बनाया ही ऐसा, कि लोग <em>सुझाएं।</em>
      </>
    ),
    body: "इंदौर से लेकर महाराष्ट्र और मध्य प्रदेश के काउंटरों तक—जो लोग रोज़ काग बेचते हैं, वे क्या कहते हैं।",
  },
};

export default function TestimonialsSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { language } = useLanguage();
  const currentReviews = reviews[language];
  const t = headingCopy[language];

  const raw = progress * currentReviews.length;
  const active = Math.min(currentReviews.length - 1, Math.floor(raw));

  const goTo = (index: number) => {
    const node = ref.current;
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    const travel = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.08) / currentReviews.length), behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className={styles.track}
      style={{ height: `${currentReviews.length * 68}vh` }}
      aria-label="What dealers and shop owners say about KAG"
    >
      <div className={styles.stage}>
        <div className={styles.topline}>
          <span>{t.topline}</span>
          <b>
            {String(active + 1).padStart(2, "0")} / {String(currentReviews.length).padStart(2, "0")}
          </b>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <p>{t.eyebrow}</p>
            <h2>{t.title}</h2>
            <span className={styles.headingBody}>{t.body}</span>

            <div className={styles.dots}>
              {currentReviews.map((review, index) => (
                <button
                  type="button"
                  key={review.name}
                  className={index === active ? styles.isActive : index < active ? styles.isPassed : ""}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${review.name}'s review`}
                />
              ))}
            </div>
          </div>

          <div className={styles.cards}>
          {currentReviews.map((review, index) => {
            const pos = raw - index;
            // Hold each card at full opacity for most of its dwell time and
            // only blend during a short window at the edge, so consecutive
            // cards never both sit at a legibility-killing half-opacity.
            const fade = Math.min(1, Math.max(0, (Math.abs(pos) - 0.62) / 0.38));
            const isCurrent = index === active;

            return (
              <figure
                key={review.name}
                className={styles.card}
                style={{ "--pos": pos, "--fade": fade } as React.CSSProperties}
                aria-hidden={!isCurrent}
              >
                <span className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <div className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  <span className={styles.avatar} aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <b>{review.name}</b>
                    <small>
                      {review.role} · {review.place}
                    </small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

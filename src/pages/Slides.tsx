import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import SlideBrand from '../components/slides/SlideBrand';
import LanguageSelector from '../components/LanguageSelector';
import { SlideVisual } from '../components/slides/SlideMockups';
import { getSlidesLocale, type SlideContent } from '../i18n/slides';
import { useIsMobileSlides } from '../hooks/useMediaQuery';
import { useLocaleStore, type Locale } from '../store/localeStore';
import '../styles/slides.css';

function speakerClass(speaker: SlideContent['speaker']) {
  if (speaker === 'eduardo') return 'slide-speaker-eduardo';
  if (speaker === 'jhorman') return 'slide-speaker-jhorman';
  return 'slide-speaker-both';
}

function SlideBody({ slide, locale }: { slide: SlideContent; locale: Locale }) {
  if (slide.layout === 'title') {
    return (
      <div className="slide-title-layout slide-title-with-visual">
        <div className="slide-title-copy">
          <h1>{slide.title}</h1>
          {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
        </div>
        {slide.visual && (
          <div className="slide-title-visual">
            <SlideVisual type={slide.visual} locale={locale} />
          </div>
        )}
      </div>
    );
  }

  if (slide.layout === 'closing') {
    return (
      <div className="slide-closing">
        {slide.visual && (
          <div className="slide-closing-mascot">
            <SlideVisual type={slide.visual} locale={locale} />
          </div>
        )}
        <h1>{slide.title}</h1>
        {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
        {slide.bullets && (
          <ul className="slide-bullets">
            {slide.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (slide.layout === 'split') {
    return (
      <div className="slide-split-body">
        <div className="slide-split-copy">
          <h2 className="slide-heading">{slide.title}</h2>
          {slide.subtitle && <p className="slide-subheading">{slide.subtitle}</p>}
          {slide.bullets && (
            <ul className="slide-bullets compact">
              {slide.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        {slide.visual && (
          <div className="slide-split-visual">
            <SlideVisual type={slide.visual} locale={locale} />
          </div>
        )}
      </div>
    );
  }

  if (slide.layout === 'visual') {
    return (
      <div className="slide-visual-body">
        <div className="slide-visual-copy">
          <h2 className="slide-heading">{slide.title}</h2>
          {slide.subtitle && <p className="slide-subheading">{slide.subtitle}</p>}
          {slide.bullets && (
            <ul className="slide-bullets compact">
              {slide.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        {slide.visual && (
          <div className="slide-visual-mock">
            <SlideVisual type={slide.visual} locale={locale} />
          </div>
        )}
      </div>
    );
  }

  return null;
}

function SlideFrame({
  slide,
  index,
  total,
  meta,
  locale,
  showMeta = true,
  forPrint = false,
}: {
  slide: SlideContent;
  index: number;
  total: number;
  meta: ReturnType<typeof getSlidesLocale>['meta'];
  locale: Locale;
  showMeta?: boolean;
  forPrint?: boolean;
}) {
  return (
    <section
      className={`slide-frame${forPrint ? ' slide-frame-print' : ''}`}
      aria-label={`${slide.title} (${index + 1} ${meta.slideOf} ${total})`}
    >
      <div className="slide-inner">
        <div className="slide-brand">
          <SlideBrand />
        </div>
        <div className="slide-content">
          <SlideBody slide={slide} locale={locale} />
        </div>
        {showMeta && (
          <>
            <span className={`slide-speaker-badge ${speakerClass(slide.speaker)}`} aria-hidden />
            <span className="slide-number">
              {index + 1} {meta.slideOf} {total}
            </span>
          </>
        )}
      </div>
    </section>
  );
}

export default function Slides() {
  useSlidesLocaleBootstrap();
  const locale = useLocaleStore((s) => s.locale);
  const content = getSlidesLocale(locale);
  const { slides, meta } = content;
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const isMobile = useIsMobileSlides();
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      setCurrent((i) => Math.max(0, Math.min(slides.length - 1, i + delta)));
    },
    [slides.length],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'f' || e.key === 'F') {
        setFullscreen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  useEffect(() => {
    if (fullscreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, [fullscreen]);

  return (
    <div
      className={`slides-root${isMobile ? ' slides-mobile' : ''}`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {!fullscreen && (
        <header className="slides-toolbar no-print">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Home size={16} />
              <span className="slides-home-label">{meta.home}</span>
            </Link>
            <span className="hidden text-sm text-white/50 sm:inline">{meta.title}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="light" />
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center rounded-lg border border-white/15 px-2.5 py-2 text-white/85 transition hover:bg-white/10"
              aria-label="Fullscreen"
              title="F"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </header>
      )}

      {fullscreen && (
        <button
          type="button"
          className="no-print fixed right-4 top-4 z-50 rounded-lg border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur hover:bg-black/55"
          onClick={() => setFullscreen(false)}
          aria-label="Exit fullscreen"
        >
          <Minimize2 size={18} />
        </button>
      )}

      <main className="slides-viewport">
        <SlideFrame slide={slides[current]} index={current} total={slides.length} meta={meta} locale={locale} />
      </main>

      <div className="slides-print-stack" aria-hidden>
        {slides.map((s, i) => (
          <div key={s.id} className="slides-print-page">
            <SlideFrame
              slide={s}
              index={i}
              total={slides.length}
              meta={meta}
              locale={locale}
              showMeta
              forPrint
            />
          </div>
        ))}
      </div>

      {!fullscreen && (
        <footer className="slides-controls no-print">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft size={18} />
            <span className="slides-nav-label">{meta.prev}</span>
          </button>
          <div className="slides-progress" aria-hidden>
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`slides-progress-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="min-w-[4rem] text-center text-sm text-white/60">
            {current + 1} {meta.slideOf} {slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={current === slides.length - 1}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-30"
          >
            <span className="slides-nav-label">{meta.next}</span>
            <ChevronRight size={18} />
          </button>
        </footer>
      )}
    </div>
  );
}

function useSlidesLocaleBootstrap() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  useEffect(() => {
    const key = 'euler-slides-visited';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      if (locale === 'es') setLocale('en');
    }
  }, [locale, setLocale]);
}

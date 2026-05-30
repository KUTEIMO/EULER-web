import { Link } from 'react-router-dom';
import { FileDown, Home, Presentation } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import SlideBrand from '../components/slides/SlideBrand';
import { getSlidesLocale, type ScriptLine } from '../i18n/slides';
import { useLocaleStore } from '../store/localeStore';
import '../styles/guion.css';

function speakerDot(who: ScriptLine['who']) {
  return who === 'eduardo' ? 'guion-dot-eduardo' : 'guion-dot-jhorman';
}

export default function Guion() {
  const locale = useLocaleStore((s) => s.locale);
  const { slides, meta } = getSlidesLocale(locale);

  return (
    <div className="guion-root">
      <header className="guion-toolbar no-print">
        <div className="flex items-center gap-3">
          <Link to="/slides" className="guion-toolbar-link">
            <Presentation size={16} />
            <span className="guion-link-text">{meta.guionBack}</span>
          </Link>
          <Link to="/" className="guion-toolbar-link muted">
            <Home size={16} />
            <span className="guion-link-text">{meta.home}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector variant="light" />
          <button type="button" onClick={() => window.print()} className="guion-toolbar-btn">
            <FileDown size={15} />
            <span className="hidden sm:inline">{meta.guionPrint}</span>
          </button>
        </div>
      </header>

      <main className="guion-main">
        <div className="guion-header">
          <SlideBrand />
          <h1>{meta.guionTitle}</h1>
          <p>{meta.guionDuration}</p>
        </div>

        <ol className="guion-list">
          {slides.map((slide, index) => (
            <li key={slide.id} className="guion-card">
              <div className="guion-card-head">
                <span className="guion-slide-num">
                  {index + 1} {meta.slideOf} {slides.length}
                </span>
                <h2>{slide.title}</h2>
                {slide.subtitle && <p className="guion-slide-sub">{slide.subtitle}</p>}
              </div>

              {slide.bullets && slide.bullets.length > 0 && (
                <ul className="guion-slide-bullets">
                  {slide.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              <div className="guion-script">
                {slide.script.map((line, i) => (
                  <div key={i} className="guion-line">
                    <span className={`guion-dot ${speakerDot(line.who)}`} aria-hidden />
                    <div>
                      <span className="guion-who">{line.who === 'eduardo' ? 'Eduardo' : 'Jhorman'}</span>
                      <p className="guion-text">&ldquo;{line.line}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { buildHeroUiWindows, fillTemplate, getPageMeta, siteContent, siteSettings } from "./lib/siteData";

const navItems = siteContent.site.navigation;
const heroVideoWindows = buildHeroUiWindows(siteContent.hero.uiWindows);
const heroUiFadeSeconds = 0.9;
const apiBaseUrl = siteSettings.api.baseUrl.replace(/\/+$/, "");

async function submitBackendForm(type, payload) {
  const response = await fetch(`${apiBaseUrl}${siteSettings.api.formsEndpoint}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`);
  }

  return response.json();
}

const createContactFormState = () => ({
  name: "",
  email: "",
  org: "",
  interest: siteContent.forms.contact.fields.interest.options[0],
  message: "",
});

const createProjectFormState = () => ({
  name: "",
  email: "",
  org: "",
  interest: siteContent.forms.projectModal.fields.interest.options[0],
  message: "",
});

const calculateOffsets = (tons) => ({
  co2Saved: (tons * 1.83).toFixed(1),
  treesEquivalent: Math.round(tons * 30.5),
  truckloads: Math.round(tons * 1.35 * 12 / 15),
});

const getHeroUiPhase = (time) => {
  const activeWindow = heroVideoWindows.find(({ start, end }) => time >= start && time <= end);

  if (activeWindow) {
    const fadeOutProgress = Math.min(1, Math.max(0, (time - activeWindow.start) / heroUiFadeSeconds));
    return fadeOutProgress >= 1 ? "hidden" : "exiting";
  }

  const previousWindow = [...heroVideoWindows]
    .reverse()
    .find(({ end }) => Number.isFinite(end) && time > end);

  if (previousWindow && time - previousWindow.end < heroUiFadeSeconds) {
    return "entering";
  }

  return "visible";
};

function AppLink({ to, onNavigate, className, children, ...props }) {
  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function SocialIcon({ label }) {
  switch (label) {
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.558 3.5 12 3.5 12 3.5s-7.558 0-9.399.564c-1.025.273-1.827 1.077-2.099 2.099C0 8.002 0 12 0 12s0 3.998.564 5.837c.272 1.022 1.074 1.826 2.099 2.099C4.442 20.5 12 20.5 12 20.5s7.558 0 9.399-.564c1.025-.273 1.827-1.077 2.099-2.099C24 15.998 24 12 24 12s0-3.998-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
  }
}

function Header({ currentPath, currentTone, onNavigate, theme, setTheme, onOpenProjectModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}
      data-nav-tone={currentTone}
      data-scrolled={scrolled ? "true" : "false"}
      data-theme={theme}
    >
      <AppLink
        className="brand"
        to="/"
        onNavigate={(to) => {
          setMobileMenuOpen(false);
          onNavigate(to);
        }}
        aria-label={`${siteContent.site.name} home`}
      >
        <img src={siteContent.site.logo.src} alt={siteContent.site.logo.alt} />
      </AppLink>

      <nav className={`site-nav ${mobileMenuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <AppLink
            key={item.path}
            to={item.path}
            onNavigate={(to) => {
              setMobileMenuOpen(false);
              onNavigate(to);
            }}
            aria-current={currentPath === item.path ? "page" : undefined}
            data-active={currentPath === item.path ? "true" : "false"}
          >
            {item.label}
          </AppLink>
        ))}
        <button
          className="nav-action-mobile"
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenProjectModal();
          }}
          style={{ border: "none", cursor: "pointer" }}
        >
          {siteContent.forms.projectModal.title}
        </button>
        <button
          className="theme-toggle-mobile"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Use Light Mode
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Use Dark Mode
            </>
          )}
        </button>
      </nav>

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <button
          className="nav-action"
          onClick={onOpenProjectModal}
          aria-label={`${siteContent.forms.projectModal.title} with ${siteContent.site.name}`}
        >
          {siteContent.forms.projectModal.title}
        </button>
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero({ onNavigate }) {
  const videoRef = useRef(null);
  const [heroUiPhase, setHeroUiPhase] = useState("hidden");
  const [isHeroFullscreen, setIsHeroFullscreen] = useState(false);

  const syncHeroVisibility = (event) => {
    const time = event.currentTarget.currentTime;
    setHeroUiPhase(getHeroUiPhase(time));
  };

  useEffect(() => {
    let frameId;
    let lastPhase = "hidden";

    const watchVideoTime = () => {
      if (videoRef.current) {
        const nextPhase = getHeroUiPhase(videoRef.current.currentTime || 0);

        if (nextPhase !== lastPhase) {
          lastPhase = nextPhase;
          setHeroUiPhase(nextPhase);
        }
      }

      frameId = window.requestAnimationFrame(watchVideoTime);
    };

    frameId = window.requestAnimationFrame(watchVideoTime);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const syncFullscreenState = () => {
      const isFullscreen = document.fullscreenElement === videoRef.current;
      setIsHeroFullscreen(isFullscreen);

      if (!isFullscreen && videoRef.current) {
        videoRef.current.muted = true;
      }
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  const openVideoFullscreen = async () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;
    video.volume = 1;
    await video.play();

    if (video.requestFullscreen) {
      await video.requestFullscreen();
      setIsHeroFullscreen(true);
    }
  };

  return (
    <section
      className={`hero hero-ui-${heroUiPhase} ${isHeroFullscreen ? "hero-video-fullscreen" : ""}`}
      id="top"
      data-nav-theme="dark"
    >
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={syncHeroVisibility}
        onPlay={syncHeroVisibility}
        onSeeked={syncHeroVisibility}
        onTimeUpdate={syncHeroVisibility}
      >
        <source src={siteContent.hero.videoSources.mp4} type="video/mp4" />
        <source src={siteContent.hero.videoSources.mov} type="video/quicktime" />
      </video>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">{siteContent.hero.eyebrow}</p>
        <div className="rotating-title" aria-label={`${siteContent.site.name} key messages`}>
          {siteContent.hero.messages.map((message) => (
            <span key={message}>{message}</span>
          ))}
        </div>
        <p className="hero-copy">{siteContent.hero.copy}</p>
        <div className="hero-actions">
          <AppLink className="primary-action" to={siteContent.hero.primaryAction.path} onNavigate={onNavigate}>
            {siteContent.hero.primaryAction.label}
          </AppLink>
          <AppLink className="secondary-action" to={siteContent.hero.secondaryAction.path} onNavigate={onNavigate}>
            {siteContent.hero.secondaryAction.label}
          </AppLink>
        </div>
      </div>
      <button
        className="fullscreen-video-button"
        type="button"
        onClick={openVideoFullscreen}
        aria-label="Play hero video fullscreen with sound"
      >
        <span className="fullscreen-icon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span>{siteContent.hero.fullscreenLabel}</span>
      </button>
    </section>
  );
}

function SolutionsPage() {
  const { intro, offerings, technicalDetails } = siteContent.pages.solutions;

  return (
    <>
      <section className="page-intro page-intro-light">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p>{intro.copy}</p>
      </section>
      <section className="section section-light">
        <div className="offering-grid">
          {offerings.map((item) => (
            <article className="offering" key={item.title}>
              <div className="offering-icon">
                <LeafIcon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-specs section-light">
        <div className="section-heading">
          <p className="eyebrow">{technicalDetails.eyebrow}</p>
          <h2>{technicalDetails.title}</h2>
          <p>{technicalDetails.copy}</p>
        </div>
        <div className="table-container">
          <table className="tech-specs-table">
            <thead>
              <tr>
                {technicalDetails.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technicalDetails.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ProcessPage() {
  const { intro, overview, timeline } = siteContent.pages.process;

  return (
    <>
      <section className="page-intro page-intro-light">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p>{intro.copy}</p>
      </section>
      <section className="section section-process">
        <div className="process-media">
          <img src={overview.image.src} alt={overview.image.alt} />
        </div>
        <div className="process-copy">
          <p className="eyebrow">{overview.eyebrow}</p>
          <h2>{overview.title}</h2>
          <p>{overview.copy}</p>
          <ol className="process-list">
            {overview.steps.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section-light timeline-section">
        <div className="section-heading">
          <p className="eyebrow">{timeline.eyebrow}</p>
          <h2>{timeline.title}</h2>
          <p>{timeline.copy}</p>
        </div>
        <div className="timeline-container">
          {timeline.steps.map((step) => (
            <div className="timeline-step" key={step.num}>
              <div className="step-badge">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ImpactPage() {
  const { intro, overview, calculator } = siteContent.pages.impact;
  const [coalOffset, setCoalOffset] = useState(calculator.range.defaultValue);
  const { co2Saved, treesEquivalent, truckloads } = calculateOffsets(coalOffset);

  return (
    <>
      <section className="page-intro page-intro-dark">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p>{intro.copy}</p>
      </section>
      <section className="section impact">
        <div>
          <p className="eyebrow">{overview.eyebrow}</p>
          <h2>{overview.title}</h2>
          <p>{overview.copy}</p>
        </div>
        <div className="impact-stats-cards">
          {overview.cards.map((card) => (
            <div className="impact-card" key={card.label}>
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-light calc-section">
        <div className="calc-card">
          <p className="eyebrow">{calculator.eyebrow}</p>
          <h2>{calculator.title}</h2>
          <p>{calculator.copy}</p>
          <div className="slider-container">
            <label htmlFor="coal-slider">
              {calculator.labelPrefix} <strong>{coalOffset} {calculator.labelSuffix}</strong>
            </label>
            <input
              id="coal-slider"
              type="range"
              min={calculator.range.min}
              max={calculator.range.max}
              step={calculator.range.step}
              value={coalOffset}
              onChange={(event) => setCoalOffset(Number(event.target.value))}
            />
          </div>
          <div className="calc-results">
            <div className="result-item">
              <span className="result-num">{co2Saved} Tons</span>
              <span className="result-lbl">{calculator.results.co2Label}</span>
            </div>
            <div className="result-item">
              <span className="result-num">{treesEquivalent.toLocaleString()}</span>
              <span className="result-lbl">{calculator.results.treesLabel}</span>
            </div>
            <div className="result-item">
              <span className="result-num">{truckloads.toLocaleString()} Trucks</span>
              <span className="result-lbl">Agri-Waste Diverted / year</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  const { intro, items } = siteContent.pages.projects;

  return (
    <>
      <section className="page-intro page-intro-light">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p>{intro.copy}</p>
      </section>
      <section className="section section-light">
        <div className="project-grid">
          {items.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="proj-img-wrap">
                <img src={project.img} alt={project.title} />
              </div>
              <div className="proj-content">
                <p className="eyebrow">{`${project.location} - ${project.status}`}</p>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="proj-metric">
                  <strong>Impact:</strong> {project.stats}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [formState, setFormState] = useState(createContactFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { intro, panel } = siteContent.pages.contact;
  const formContent = siteContent.forms.contact;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBackendForm("contact", formState);
      setSubmitted(true);
    } catch (error) {
      window.alert("Contact form submission failed. Please make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormState(createContactFormState());
  };

  return (
    <>
      <section className="page-intro page-intro-dark">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h1>{intro.title}</h1>
        <p>{intro.copy}</p>
      </section>
      <section className="section section-light contact-grid-section">
        <div className="contact-grid">
          <div className="contact-info-panel">
            <p className="eyebrow">{panel.eyebrow}</p>
            <h2>{panel.title}</h2>
            <p>{panel.copy}</p>
            <div className="info-items">
              <div className="info-item">
                <strong>{panel.generalInquiriesLabel}</strong>
                <a href={`mailto:${panel.generalInquiriesEmail}`}>{panel.generalInquiriesEmail}</a>
              </div>
              <div className="info-item">
                <strong>{panel.officeAddressLabel}</strong>
                <p>
                  {panel.officeAddressLines.map((line) => (
                    <React.Fragment key={line}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className="contact-form-panel">
            {submitted ? (
              <div className="success-banner">
                <h3>{formContent.successTitle}</h3>
                <p>{fillTemplate(formContent.successMessageTemplate, { name: formState.name })}</p>
                <button className="primary-action" type="button" onClick={resetForm}>
                  {formContent.resetLabel}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="form-name">{formContent.fields.name.label}</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    placeholder={formContent.fields.name.placeholder}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">{formContent.fields.email.label}</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                    placeholder={formContent.fields.email.placeholder}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-org">{formContent.fields.org.label}</label>
                  <input
                    id="form-org"
                    type="text"
                    required
                    value={formState.org}
                    onChange={(event) => setFormState({ ...formState, org: event.target.value })}
                    placeholder={formContent.fields.org.placeholder}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-interest">{formContent.fields.interest.label}</label>
                  <select
                    id="form-interest"
                    value={formState.interest}
                    onChange={(event) => setFormState({ ...formState, interest: event.target.value })}
                  >
                    {formContent.fields.interest.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="form-message">{formContent.fields.message.label}</label>
                  <textarea
                    id="form-message"
                    required
                    rows="4"
                    value={formState.message}
                    onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                    placeholder={formContent.fields.message.placeholder}
                  />
                </div>
                <button className="primary-action submit-btn" type="submit">
                  {isSubmitting ? "Submitting..." : formContent.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function HomePage({ onNavigate }) {
  const { stats, advantageSection, exploreSection } = siteContent.home;

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <section className="section section-light stats-section">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-light why-choose-section">
        <div className="section-heading">
          <p className="eyebrow">{advantageSection.eyebrow}</p>
          <h2>{advantageSection.title}</h2>
          <p>{advantageSection.copy}</p>
        </div>
        <div className="why-grid">
          {advantageSection.cards.map((card) => (
            <div className="why-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-light page-rail">
        <div className="section-heading">
          <p className="eyebrow">{exploreSection.eyebrow}</p>
          <h2>{exploreSection.title}</h2>
          <p>{exploreSection.copy}</p>
        </div>
        <div className="offering-grid">
          {navItems
            .filter((item) => item.label !== "Home")
            .map((item) => (
              <article className="offering" key={item.path}>
                <div className="offering-icon">
                  <LeafIcon />
                </div>
                <h3>{item.label}</h3>
                <p>{exploreSection.cardCopy}</p>
                <AppLink className="primary-action" to={item.path} onNavigate={onNavigate}>
                  {exploreSection.ctaPrefix}
                  {item.label}
                </AppLink>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}

function Footer({ onNavigate, onOpenProjectModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();

    try {
      await submitBackendForm("newsletter", { email: newsletterEmail });
      window.alert(siteContent.forms.newsletter.successMessage);
      setNewsletterEmail("");
    } catch (error) {
      window.alert("Newsletter signup failed. Please make sure the backend is running.");
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <img src={siteContent.site.logo.src} alt={`${siteContent.site.logo.alt} Logo`} />
            <span>{siteContent.site.name}</span>
          </div>
          <p className="brand-desc">{siteContent.footer.brandDescription}</p>
          <div className="footer-socials">
            {siteContent.site.socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <SocialIcon label={link.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col links-col">
          <h4>{siteContent.footer.navigationTitle}</h4>
          <ul className="footer-links-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <AppLink to={item.path} onNavigate={onNavigate}>
                  {item.label}
                </AppLink>
              </li>
            ))}
            <li className="footer-highlight-li">
              <button
                onClick={onOpenProjectModal}
                className="footer-highlight-link"
                style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
              >
                {siteContent.footer.highlightLabel}
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h4>{siteContent.footer.contactTitle}</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="contact-lbl">{siteContent.footer.contactChannels.emailLabel}</span>
              <a href={`mailto:${siteContent.footer.contactChannels.email}`} className="contact-val">
                {siteContent.footer.contactChannels.email}
              </a>
            </li>
            <li>
              <span className="contact-lbl">{siteContent.footer.contactChannels.phoneLabel}</span>
              <a href={`tel:${siteContent.footer.contactChannels.phone.replace(/\s+/g, "")}`} className="contact-val">
                {siteContent.footer.contactChannels.phone}
              </a>
            </li>
            <li>
              <span className="contact-lbl">{siteContent.footer.contactChannels.headquartersLabel}</span>
              <p className="contact-val">{siteContent.footer.contactChannels.headquarters}</p>
            </li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4>{siteContent.forms.newsletter.title}</h4>
          <p className="newsletter-text">{siteContent.forms.newsletter.copy}</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={siteContent.forms.newsletter.placeholder}
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
              aria-label="Business email"
            />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-meta">
        <div className="footer-meta-left">
          <p>
            &copy; {new Date().getFullYear()} {siteContent.site.legalName}. All rights reserved.
          </p>
        </div>
        <div className="footer-meta-right">
          <ul className="footer-policies">
            {siteContent.site.footerPolicies.map((policy) => (
              <li key={policy.label}>
                <a href={policy.href}>{policy.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ProjectModal({ onClose }) {
  const [formState, setFormState] = useState(createProjectFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalContent = siteContent.forms.projectModal;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBackendForm("project", formState);
      setSubmitted(true);
    } catch (error) {
      window.alert("Project form submission failed. Please make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close form">
          &times;
        </button>
        {submitted ? (
          <div className="success-banner">
            <h3>{modalContent.successTitle}</h3>
            <p>{fillTemplate(modalContent.successMessageTemplate, { name: formState.name })}</p>
            <button className="primary-action" type="button" onClick={onClose} style={{ marginTop: "20px" }}>
              {modalContent.closeLabel}
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="modal-header-block">
              <h2>{modalContent.title}</h2>
              <p>{modalContent.copy}</p>
            </div>
            <div className="form-group">
              <label htmlFor="modal-name">{modalContent.fields.name.label}</label>
              <input
                id="modal-name"
                type="text"
                required
                placeholder={modalContent.fields.name.placeholder}
                value={formState.name}
                onChange={(event) => setFormState({ ...formState, name: event.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-email">{modalContent.fields.email.label}</label>
              <input
                id="modal-email"
                type="email"
                required
                placeholder={modalContent.fields.email.placeholder}
                value={formState.email}
                onChange={(event) => setFormState({ ...formState, email: event.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-org">{modalContent.fields.org.label}</label>
              <input
                id="modal-org"
                type="text"
                required
                placeholder={modalContent.fields.org.placeholder}
                value={formState.org}
                onChange={(event) => setFormState({ ...formState, org: event.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-interest">{modalContent.fields.interest.label}</label>
              <select
                id="modal-interest"
                value={formState.interest}
                onChange={(event) => setFormState({ ...formState, interest: event.target.value })}
              >
                {modalContent.fields.interest.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-message">{modalContent.fields.message.label}</label>
              <textarea
                id="modal-message"
                rows="4"
                required
                placeholder={modalContent.fields.message.placeholder}
                value={formState.message}
                onChange={(event) => setFormState({ ...formState, message: event.target.value })}
              />
            </div>
            <button className="primary-action submit-btn" type="submit" style={{ width: "100%", marginTop: "12px" }}>
              {isSubmitting ? "Submitting..." : modalContent.submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/+$/, "") || "/");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname.replace(/\/+$/, "") || "/");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fontFamily = siteSettings.design?.fontFamily || siteSettings.branding.fontFamily;
    const typography = siteSettings.design?.typography || {};

    document.documentElement.style.setProperty("--font-sans", fontFamily);
    Object.entries(siteSettings.themeTokens[theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    document.documentElement.style.setProperty("--type-scale-nav", typography.navScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-button", typography.buttonScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-eyebrow", typography.eyebrowScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-body", typography.bodyScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-hero", typography.heroTitleScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-page-title", typography.pageTitleScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-section-title", typography.sectionTitleScale ?? 1);
    document.documentElement.style.setProperty("--type-scale-card-title", typography.cardTitleScale ?? 1);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      if (!localStorage.getItem("theme")) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const currentPage = getPageMeta(pathname);

  useEffect(() => {
    document.title = `${siteContent.site.titlePrefix} | ${currentPage.label}`;
  }, [currentPage.label]);

  const navigateTo = (to) => {
    const nextPath = (to || "/").replace(/\/+$/, "") || "/";
    if (nextPath !== pathname) {
      window.history.pushState({}, "", nextPath);
      setPathname(nextPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page =
    {
      "/": <HomePage onNavigate={navigateTo} />,
      "/solutions": <SolutionsPage />,
      "/process": <ProcessPage />,
      "/impact": <ImpactPage />,
      "/projects": <ProjectsPage />,
      "/contact": <ContactPage />,
    }[pathname] || <HomePage onNavigate={navigateTo} />;

  return (
    <>
      <Header
        currentPath={pathname}
        currentTone={currentPage.tone}
        onNavigate={navigateTo}
        theme={theme}
        setTheme={setTheme}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
      />
      <main className="page-main">{page}</main>
      <Footer onNavigate={navigateTo} onOpenProjectModal={() => setIsProjectModalOpen(true)} />
      {isProjectModalOpen && <ProjectModal onClose={() => setIsProjectModalOpen(false)} />}
    </>
  );
}

export default App;

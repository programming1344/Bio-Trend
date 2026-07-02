const API_BASE = "";
const PREVIEW_BASE = window.location.origin.replace(/:\d+$/, ":5173");
const AUTH_KEYS = {
  token: "bio-trend-dashboard-token",
  user: "bio-trend-dashboard-user",
};
const DRAFT_KEYS = {
  content: "bio-trend-dashboard-content-draft",
  settings: "bio-trend-dashboard-settings-draft",
};

const DEFAULT_FONT_OPTIONS = [
  "\"Poppins\", system-ui, -apple-system, sans-serif",
  "\"Inter\", system-ui, -apple-system, sans-serif",
  "\"Manrope\", system-ui, -apple-system, sans-serif",
  "\"DM Sans\", system-ui, -apple-system, sans-serif",
  "\"Nunito Sans\", system-ui, -apple-system, sans-serif",
  "\"Plus Jakarta Sans\", system-ui, -apple-system, sans-serif",
  "\"Urbanist\", system-ui, -apple-system, sans-serif",
  "\"Outfit\", system-ui, -apple-system, sans-serif",
  "\"Sora\", system-ui, -apple-system, sans-serif",
  "\"Space Grotesk\", system-ui, -apple-system, sans-serif",
  "\"Montserrat\", system-ui, -apple-system, sans-serif",
  "\"Lato\", system-ui, -apple-system, sans-serif",
  "\"Open Sans\", system-ui, -apple-system, sans-serif",
  "\"Work Sans\", system-ui, -apple-system, sans-serif",
  "\"Mulish\", system-ui, -apple-system, sans-serif",
  "\"Rubik\", system-ui, -apple-system, sans-serif",
  "\"Kanit\", system-ui, -apple-system, sans-serif",
  "\"Archivo\", system-ui, -apple-system, sans-serif",
  "\"Barlow\", system-ui, -apple-system, sans-serif",
  "\"Heebo\", system-ui, -apple-system, sans-serif",
  "\"Public Sans\", system-ui, -apple-system, sans-serif",
  "\"Source Sans 3\", system-ui, -apple-system, sans-serif",
  "\"Lexend\", system-ui, -apple-system, sans-serif",
  "\"IBM Plex Sans\", system-ui, -apple-system, sans-serif",
  "\"Noto Sans\", system-ui, -apple-system, sans-serif",
  "\"Cabin\", system-ui, -apple-system, sans-serif",
  "\"Figtree\", system-ui, -apple-system, sans-serif",
  "\"Hind\", system-ui, -apple-system, sans-serif",
  "\"Onest\", system-ui, -apple-system, sans-serif",
  "\"Be Vietnam Pro\", system-ui, -apple-system, sans-serif",
];

const DEFAULT_DESIGN_PALETTES = {
  light: {
    pageBackground: "#f4f8f5",
    surface: "#ffffff",
    text: "#0a1d13",
    heading: "#0c2619",
    primary: "#1a7c4c",
    secondary: "#6b9e54",
    mist: "#e6f2eb",
  },
  dark: {
    pageBackground: "#040a06",
    surface: "#091810",
    text: "#e2efe6",
    heading: "#4ade80",
    primary: "#26c281",
    secondary: "#a3e635",
    mist: "#08130d",
  },
};

const TYPOGRAPHY_FIELDS = [
  { key: "heroTitleScale", label: "Hero headline" },
  { key: "pageTitleScale", label: "Page title" },
  { key: "sectionTitleScale", label: "Section title" },
  { key: "cardTitleScale", label: "Card title" },
  { key: "bodyScale", label: "Body copy" },
  { key: "eyebrowScale", label: "Eyebrow labels" },
  { key: "navScale", label: "Navigation text" },
  { key: "buttonScale", label: "Buttons" },
];

const PALETTE_FIELDS = [
  { key: "pageBackground", label: "Page background" },
  { key: "surface", label: "Cards and panels" },
  { key: "text", label: "Body text" },
  { key: "heading", label: "Headings" },
  { key: "primary", label: "Primary accent" },
  { key: "secondary", label: "Secondary accent" },
  { key: "mist", label: "Soft background tint" },
];

const CONTENT_GROUPS = [
  {
    id: "site",
    label: "Site Identity",
    description: "Brand name, logo, navigation links, and social links.",
    path: ["site"],
  },
  {
    id: "hero",
    label: "Hero Landing",
    description: "Landing video, hero text, and action buttons.",
    path: ["hero"],
  },
  {
    id: "home",
    label: "Home Page",
    description: "Homepage stats, advantages, and explore section content.",
    path: ["home"],
  },
  {
    id: "solutions",
    label: "Solutions Page",
    description: "Solutions intro, offering cards, and technical specification table.",
    path: ["pages", "solutions"],
  },
  {
    id: "process",
    label: "Process Page",
    description: "Workflow visuals, steps, and timeline content.",
    path: ["pages", "process"],
  },
  {
    id: "impact",
    label: "Impact Page",
    description: "Impact messaging, calculator copy, and result labels.",
    path: ["pages", "impact"],
  },
  {
    id: "projects",
    label: "Projects Page",
    description: "Project cards, locations, stats, statuses, and project images.",
    path: ["pages", "projects"],
  },
  {
    id: "contact",
    label: "Contact Page",
    description: "Contact page intro, panel copy, address, and inquiry details.",
    path: ["pages", "contact"],
  },
  {
    id: "footer",
    label: "Footer",
    description: "Footer description, highlight link, and contact information.",
    path: ["footer"],
  },
];

const FORM_GROUPS = [
  {
    id: "contactForm",
    label: "Contact Form",
    description: "Fields and confirmation messages for the contact page form.",
    path: ["forms", "contact"],
  },
  {
    id: "projectModal",
    label: "Project Modal",
    description: "Project enquiry modal labels, placeholders, and messages.",
    path: ["forms", "projectModal"],
  },
  {
    id: "newsletter",
    label: "Newsletter Form",
    description: "Newsletter title, supporting text, placeholder, and success message.",
    path: ["forms", "newsletter"],
  },
];

const ASSET_GROUPS = [
  {
    id: "mediaLibrary",
    label: "Media Library",
    description: "Images and videos used across all pages.",
    type: "media",
  },
  ...FORM_GROUPS.map((group) => ({ ...group, type: "form" })),
];

const THEME_SECTIONS = [
  {
    id: "typography",
    label: "Typography",
    description: "Font family and readable size controls for every major text type.",
  },
  {
    id: "lightPalette",
    label: "Light Palette",
    description: "Colors used when the public site is in light mode.",
  },
  {
    id: "darkPalette",
    label: "Dark Palette",
    description: "Colors used when the public site is in dark mode.",
  },
  {
    id: "preview",
    label: "Theme Preview",
    description: "Live mockups using the current font and color controls.",
  },
  {
    id: "settings",
    label: "Dashboard Settings",
    description: "Refresh interval, API base URL, and analytics sources.",
  },
  {
    id: "importExport",
    label: "Import / Export",
    description: "Bring in a saved theme file or export the current settings.",
  },
];

const HIDDEN_CONTENT_PATHS = new Set(["site.footerPolicies", "hero.uiWindows"]);

const state = {
  auth: {
    token: null,
    user: null,
  },
  schema: null,
  content: null,
  settings: null,
  defaults: {
    content: null,
    settings: null,
  },
  analytics: null,
  submissions: null,
  teamOverview: null,
  activePanel: "overview",
  previewPath: "/",
  autoRefreshId: null,
  statusResetId: null,
  dashboardViewTracked: false,
  contentSelection: {
    groupId: CONTENT_GROUPS[0].id,
    subKey: null,
  },
  assetsSelection: {
    groupId: ASSET_GROUPS[0].id,
    subKey: null,
  },
  themeSelection: THEME_SECTIONS[0].id,
};

const refs = {
  authShell: document.getElementById("authShell"),
  dashboardShell: document.getElementById("dashboardShell"),
  loginForm: document.getElementById("loginForm"),
  loginUsername: document.getElementById("loginUsername"),
  loginPassword: document.getElementById("loginPassword"),
  loginError: document.getElementById("loginError"),
  loginSubmitBtn: document.getElementById("loginSubmitBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  currentUserName: document.getElementById("currentUserName"),
  currentUserMeta: document.getElementById("currentUserMeta"),
  sessionBadge: document.getElementById("sessionBadge"),
  sidebarNav: document.getElementById("sidebarNav"),
  panelTitle: document.getElementById("panelTitle"),
  healthDot: document.getElementById("healthDot"),
  healthText: document.getElementById("healthText"),
  autoRefreshBadge: document.getElementById("autoRefreshBadge"),
  metricsGrid: document.getElementById("metricsGrid"),
  summaryGrid: document.getElementById("summaryGrid"),
  activityList: document.getElementById("activityList"),
  viewAllActivityBtn: document.getElementById("viewAllActivityBtn"),
  contentTree: document.getElementById("contentTree"),
  contentDetail: document.getElementById("contentDetail"),
  contentEditor: document.getElementById("contentEditor"),
  mediaLibrary: document.getElementById("mediaLibrary"),
  themeTree: document.getElementById("themeTree"),
  themeDetail: document.getElementById("themeDetail"),
  settingsEditor: document.getElementById("settingsEditor"),
  assetsTree: document.getElementById("assetsTree"),
  assetsDetail: document.getElementById("assetsDetail"),
  previewPageSelect: document.getElementById("previewPageSelect"),
  refreshPreviewBtn: document.getElementById("refreshPreviewBtn"),
  openPreviewBtn: document.getElementById("openPreviewBtn"),
  sitePreviewFrame: document.getElementById("sitePreviewFrame"),
  submissionChart: document.getElementById("submissionChart"),
  sourceList: document.getElementById("sourceList"),
  adminAnalyticsRow: document.getElementById("adminAnalyticsRow"),
  teamUsageGrid: document.getElementById("teamUsageGrid"),
  changeHistoryList: document.getElementById("changeHistoryList"),
  viewAllChangesBtn: document.getElementById("viewAllChangesBtn"),
  teamPanel: document.getElementById("teamPanel"),
  createStaffForm: document.getElementById("createStaffForm"),
  staffDisplayName: document.getElementById("staffDisplayName"),
  staffUsername: document.getElementById("staffUsername"),
  staffPassword: document.getElementById("staffPassword"),
  staffFormError: document.getElementById("staffFormError"),
  teamHistoryList: document.getElementById("teamHistoryList"),
  viewAllTeamHistoryBtn: document.getElementById("viewAllTeamHistoryBtn"),
  userGrid: document.getElementById("userGrid"),
  contactTable: document.getElementById("contactTable"),
  projectTable: document.getElementById("projectTable"),
  newsletterTable: document.getElementById("newsletterTable"),
  activityModal: document.getElementById("activityModal"),
  activityModalTitle: document.getElementById("activityModalTitle"),
  activityModalList: document.getElementById("activityModalList"),
  closeActivityModalBtn: document.getElementById("closeActivityModalBtn"),
};

function getDraftKey(type) {
  const username = state.auth.user?.username || "guest";
  return `${DRAFT_KEYS[type]}-${username}`;
}

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (state.auth.token) {
    headers.Authorization = `Bearer ${state.auth.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && state.auth.token) {
    handleUnauthorized("Your session expired. Please sign in again.");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.headers.get("content-type")?.includes("application/json")
    ? response.json()
    : response.text();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadDraft(type, fallback) {
  const raw = localStorage.getItem(getDraftKey(type));
  if (!raw) return cloneJson(fallback);

  try {
    return JSON.parse(raw);
  } catch {
    return cloneJson(fallback);
  }
}

function saveDraft(type, value) {
  localStorage.setItem(getDraftKey(type), JSON.stringify(value));
}

function clearDraft(type) {
  localStorage.removeItem(getDraftKey(type));
}

function setHealth(ok, text) {
  refs.healthDot.classList.toggle("online", ok);
  refs.healthText.textContent = text;
}

function flashStatus(text, ok = true) {
  clearTimeout(state.statusResetId);
  setHealth(ok, text);
  state.statusResetId = window.setTimeout(() => {
    if (state.auth.token) {
      setHealth(true, "Backend online");
    }
  }, 2200);
}

function setAuthView(mode) {
  document.body.dataset.auth = mode;
}

function persistSession(token, user) {
  state.auth.token = token;
  state.auth.user = user;
  localStorage.setItem(AUTH_KEYS.token, token);
  localStorage.setItem(AUTH_KEYS.user, JSON.stringify(user));
  updateSessionUI();
}

function clearSession() {
  state.auth.token = null;
  state.auth.user = null;
  state.schema = null;
  state.content = null;
  state.settings = null;
  state.analytics = null;
  state.submissions = null;
  state.teamOverview = null;
  state.dashboardViewTracked = false;
  clearInterval(state.autoRefreshId);
  localStorage.removeItem(AUTH_KEYS.token);
  localStorage.removeItem(AUTH_KEYS.user);
  closeActivityModal();
  updateSessionUI();
}

function updateSessionUI() {
  if (!state.auth.user) {
    refs.currentUserName.textContent = "Signed out";
    refs.currentUserMeta.textContent = "No active session";
    refs.sessionBadge.textContent = "Protected session";
    return;
  }

  refs.currentUserName.textContent = state.auth.user.displayName;
  refs.currentUserMeta.textContent = `${humanizeKey(state.auth.user.role)} | ${state.auth.user.username}`;
  refs.sessionBadge.textContent = `${humanizeKey(state.auth.user.role)} session`;
}

function handleUnauthorized(message) {
  clearSession();
  refs.loginError.textContent = message;
  refs.loginPassword.value = "";
  setAuthView("locked");
  setHealth(false, "Login required");
}

function humanizeKey(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (value) => value.toUpperCase());
}

function humanizePath(path) {
  return path
    .map((segment) => (typeof segment === "number" ? `Item ${segment + 1}` : humanizeKey(segment)))
    .join(" / ");
}

function joinPath(path) {
  return path.map((segment) => String(segment)).join(".");
}

function isHiddenContentPath(path) {
  return HIDDEN_CONTENT_PATHS.has(joinPath(path));
}

function isHeroVideoSourcesPath(path) {
  return joinPath(path) === "hero.videoSources";
}

function ensureContentEditingShape(content) {
  content.hero ||= {};
  content.hero.videoSources ||= {};
  const unifiedHeroVideo =
    content.hero.videoSource || content.hero.videoSources.mp4 || content.hero.videoSources.mov || "";
  content.hero.videoSource = unifiedHeroVideo;
  content.hero.videoSources.mp4 = unifiedHeroVideo;
  content.hero.videoSources.mov = unifiedHeroVideo;
  return content;
}

function getUnifiedHeroVideoValue() {
  return state.content?.hero?.videoSources?.mp4 || state.content?.hero?.videoSources?.mov || "";
}

function setUnifiedHeroVideoValue(value) {
  state.content.hero ||= {};
  state.content.hero.videoSources ||= {};
  state.content.hero.videoSource = value;
  state.content.hero.videoSources.mp4 = value;
  state.content.hero.videoSources.mov = value;
}

function formatDate(value) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString();
}

function normalizeHex(value) {
  if (typeof value !== "string") return null;
  const hex = value.trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return null;
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toLowerCase();
  }
  return hex.toLowerCase();
}

function safeHex(value, fallback) {
  return normalizeHex(value) || fallback;
}

function hexToRgb(value) {
  const hex = safeHex(value, "#000000").slice(1);
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function hexToRgba(value, alpha) {
  const { r, g, b } = hexToRgb(value);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixHex(a, b, weight = 0.5) {
  const colorA = hexToRgb(a);
  const colorB = hexToRgb(b);
  const ratio = Math.max(0, Math.min(1, weight));
  const blend = (left, right) => Math.round(left + (right - left) * ratio);
  const toHex = (number) => number.toString(16).padStart(2, "0");

  return `#${toHex(blend(colorA.r, colorB.r))}${toHex(blend(colorA.g, colorB.g))}${toHex(blend(colorA.b, colorB.b))}`;
}

function ensureDesignSettings(settings) {
  settings.api ||= {};
  settings.branding ||= {};
  settings.analytics ||= {};
  settings.design ||= {};
  settings.design.fontOptions = Array.from(
    new Set([...(settings.design.fontOptions || []), ...DEFAULT_FONT_OPTIONS])
  );
  settings.design.fontFamily ||= settings.branding.fontFamily || settings.design.fontOptions[0];
  settings.design.typography ||= {};
  settings.design.palettes ||= {};
  settings.themeTokens ||= {};

  TYPOGRAPHY_FIELDS.forEach(({ key }) => {
    if (typeof settings.design.typography[key] !== "number") {
      settings.design.typography[key] = 1;
    }
  });

  ["light", "dark"].forEach((mode) => {
    settings.design.palettes[mode] ||= {};
    PALETTE_FIELDS.forEach(({ key }) => {
      settings.design.palettes[mode][key] ||= DEFAULT_DESIGN_PALETTES[mode][key];
    });
  });

  settings.api.baseUrl ||= "http://127.0.0.1:8787";
  settings.analytics.dashboardRefreshSeconds = Math.max(
    5,
    Number(settings.analytics.dashboardRefreshSeconds || 30)
  );
  settings.analytics.trafficSources ||= ["Direct", "Search", "Social", "Referral"];
  settings.branding.fontFamily = settings.design.fontFamily;

  applyDesignToThemeTokens(settings);
  return settings;
}

function applyDesignToThemeTokens(settings) {
  settings.themeTokens ||= {};

  ["light", "dark"].forEach((mode) => {
    const palette = settings.design.palettes[mode];
    const pageBackground = safeHex(palette.pageBackground, DEFAULT_DESIGN_PALETTES[mode].pageBackground);
    const surface = safeHex(palette.surface, DEFAULT_DESIGN_PALETTES[mode].surface);
    const text = safeHex(palette.text, DEFAULT_DESIGN_PALETTES[mode].text);
    const heading = safeHex(palette.heading, DEFAULT_DESIGN_PALETTES[mode].heading);
    const primary = safeHex(palette.primary, DEFAULT_DESIGN_PALETTES[mode].primary);
    const secondary = safeHex(palette.secondary, DEFAULT_DESIGN_PALETTES[mode].secondary);
    const mist = safeHex(palette.mist, DEFAULT_DESIGN_PALETTES[mode].mist);

    const accentLift = mode === "light" ? mixHex(primary, "#77f6b1", 0.28) : mixHex(primary, "#ffffff", 0.18);
    const panelTint = mode === "light" ? mixHex(surface, mist, 0.55) : mixHex(surface, mist, 0.24);
    const softBg = mode === "light" ? mixHex(pageBackground, "#ffffff", 0.32) : mixHex(pageBackground, surface, 0.18);
    const deepBg = mode === "light" ? mixHex(pageBackground, mist, 0.48) : mixHex(pageBackground, "#010302", 0.36);

    settings.themeTokens[mode] = {
      "--paper": pageBackground,
      "--ink": text,
      "--navy": heading,
      "--green": primary,
      "--lime": secondary,
      "--mist": mist,
      "--line": mode === "light" ? hexToRgba(primary, 0.12) : hexToRgba(text, 0.08),
      "--shadow": mode === "light" ? hexToRgba(text, 0.08) : "rgba(0, 0, 0, 0.55)",
      "--hero-shade": mode === "light" ? hexToRgba(heading, 0.55) : "rgba(0, 0, 0, 0.74)",
      "--card-bg": surface,
      "--section-light-bg": `linear-gradient(180deg, ${softBg}, ${pageBackground} 72%)`,
      "--offering-bg": `linear-gradient(180deg, ${hexToRgba(surface, mode === "light" ? 0.88 : 0.84)}, ${hexToRgba(
        panelTint,
        mode === "light" ? 0.96 : 0.92
      )})`,
      "--offering-border": mode === "light" ? hexToRgba(primary, 0.08) : hexToRgba(text, 0.06),
      "--body-grad-1": hexToRgba(primary, mode === "light" ? 0.07 : 0.025),
      "--body-grad-2": hexToRgba(secondary, mode === "light" ? 0.05 : 0.02),
      "--body-grad-bg": `linear-gradient(180deg, ${pageBackground} 0%, ${softBg} 48%, ${deepBg} 100%)`,
      "--grad-emerald-mint": `linear-gradient(135deg, ${primary} 0%, ${accentLift} 100%)`,
      "--grad-pine-emerald": `linear-gradient(135deg, ${heading} 0%, ${primary} 100%)`,
      "--grad-soft-green": `linear-gradient(135deg, ${mist} 0%, ${softBg} 100%)`,
      "--header-scrolled-bg": mode === "light" ? hexToRgba(surface, 0.82) : hexToRgba(pageBackground, 0.82),
      "--header-scrolled-border": mode === "light" ? hexToRgba(primary, 0.08) : hexToRgba(text, 0.08),
      "--header-scrolled-shadow":
        mode === "light" ? `0 8px 32px ${hexToRgba(text, 0.08)}` : "0 8px 32px rgba(0, 0, 0, 0.5)",
      "--header-brand-color": mode === "light" ? heading : text,
      "--header-nav-color": mode === "light" ? hexToRgba(text, 0.82) : hexToRgba(text, 0.88),
      "--header-toggle-color": mode === "light" ? heading : text,
    };
  });
}

function buildPreviewUrl(path, cacheBust = true) {
  const url = new URL(path || "/", PREVIEW_BASE);
  if (cacheBust) {
    url.searchParams.set("preview", `${Date.now()}`);
  }
  return url.toString();
}

function isImagePath(value) {
  return typeof value === "string" && /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(value);
}

function isVideoPath(value) {
  return typeof value === "string" && /\.(mp4|mov|webm|m4v)$/i.test(value);
}

function isMediaPath(value) {
  return isImagePath(value) || isVideoPath(value);
}

function resolveMediaUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${PREVIEW_BASE}${value.startsWith("/") ? value : `/${value}`}`;
}

function setMediaValueByPath(path, nextValue) {
  if (isHeroVideoSourcesPath(path) || joinPath(path) === "hero.videoSources.mp4" || joinPath(path) === "hero.videoSources.mov") {
    setUnifiedHeroVideoValue(nextValue);
    return;
  }
  setValueByPath(state.content, path, nextValue);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read the selected file"));
    reader.readAsDataURL(file);
  });
}

async function uploadMediaFile(file) {
  const data = await readFileAsDataUrl(file);
  const result = await api("/api/media/upload", {
    method: "POST",
    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type,
      data,
    }),
  });
  return result.path;
}

function getValueByPath(object, path) {
  return path.reduce((current, segment) => current?.[segment], object);
}

function setValueByPath(object, path, nextValue) {
  const lastSegment = path[path.length - 1];
  const parent = path.slice(0, -1).reduce((current, segment) => current[segment], object);
  parent[lastSegment] = nextValue;
}

function createEmptyFromShape(shape) {
  if (typeof shape === "string") return "";
  if (typeof shape === "number") return 0;
  if (typeof shape === "boolean") return false;
  if (shape == null) return "";
  if (Array.isArray(shape)) {
    return shape.length ? [createEmptyFromShape(shape[0])] : [""];
  }
  if (typeof shape === "object") {
    return Object.fromEntries(Object.entries(shape).map(([key, value]) => [key, createEmptyFromShape(value)]));
  }
  return "";
}

function getCollectionLabel(item, index) {
  if (!item || typeof item !== "object") return `Item ${index + 1}`;
  return item.title || item.label || item.name || item.path || item.href || item.num || item.location || `Item ${index + 1}`;
}

function looksLongText(value, key) {
  if (typeof value !== "string") return false;
  if (value.includes("\n") || value.length > 80) return true;
  return /copy|message|description|desc|placeholder|template|address|headquarters/i.test(key);
}

function looksNumericKey(key) {
  return /^(start|end|min|max|step|defaultValue|seconds)$/i.test(key);
}

function createButton(className, text, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function createSection(title, description, open = true) {
  const details = document.createElement("details");
  details.className = "editor-block";
  details.open = open;

  const summary = document.createElement("summary");
  summary.className = "editor-block-head";

  const copy = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = title;
  copy.appendChild(heading);

  if (description) {
    const note = document.createElement("p");
    note.className = "card-note";
    note.textContent = description;
    copy.appendChild(note);
  }

  summary.appendChild(copy);
  details.appendChild(summary);
  return details;
}

function createMediaPreview(value, compact = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `media-preview ${compact ? "compact" : ""}`;

  if (!value) {
    const empty = document.createElement("div");
    empty.className = "media-empty";
    empty.textContent = "No asset selected";
    wrapper.appendChild(empty);
    return wrapper;
  }

  if (isVideoPath(value)) {
    const video = document.createElement("video");
    video.src = resolveMediaUrl(value);
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.controls = !compact;
    wrapper.appendChild(video);
    return wrapper;
  }

  if (isImagePath(value)) {
    const image = document.createElement("img");
    image.src = resolveMediaUrl(value);
    image.alt = "";
    wrapper.appendChild(image);
    return wrapper;
  }

  const fallback = document.createElement("div");
  fallback.className = "media-empty";
  fallback.textContent = value;
  wrapper.appendChild(fallback);
  return wrapper;
}

function syncContentDraft() {
  refs.contentEditor.value = JSON.stringify(state.content, null, 2);
  saveDraft("content", state.content);
}

function syncSettingsDraft() {
  refs.settingsEditor.value = JSON.stringify(state.settings, null, 2);
  saveDraft("settings", state.settings);
}

function createMediaControl(path, value, { compact = false } = {}) {
  const shell = document.createElement("div");
  shell.className = "media-control";

  let currentValue = value || "";
  let preview = createMediaPreview(currentValue, compact);

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentValue;
  input.placeholder = "Paste an image or video URL";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*,video/*";
  fileInput.className = "hidden";

  const browseButton = createButton("ghost-btn small", "Browse", () => fileInput.click());
  const clearButton = createButton("ghost-btn small", "Clear", () => applyValue(""));

  const status = document.createElement("small");
  status.className = "media-status";
  status.textContent = "Drag and drop, browse, or paste a direct URL.";

  const dropzone = document.createElement("div");
  dropzone.className = "media-dropzone";
  dropzone.textContent = "Drop file here";

  const actions = document.createElement("div");
  actions.className = "inline-actions";
  actions.append(browseButton, clearButton);

  function updatePreview(nextValue) {
    const nextPreview = createMediaPreview(nextValue, compact);
    preview.replaceWith(nextPreview);
    preview = nextPreview;
    shell.insertBefore(preview, input);
  }

  function applyValue(nextValue, { rerender = true, syncInput = true } = {}) {
    currentValue = nextValue.trim();
    setMediaValueByPath(path, currentValue);
    updatePreview(currentValue);
    if (syncInput) {
      input.value = currentValue;
    }
    syncContentDraft();
    if (rerender) {
      renderMediaPanels();
    }
  }

  async function handleSelectedFile(file) {
    if (!file) return;

    status.textContent = "Uploading...";
    fileInput.disabled = true;
    browseButton.disabled = true;
    clearButton.disabled = true;

    try {
      const uploadedPath = await uploadMediaFile(file);
      applyValue(uploadedPath);
      status.textContent = `Uploaded ${file.name}`;
    } catch (error) {
      status.textContent = error.message;
    } finally {
      fileInput.disabled = false;
      browseButton.disabled = false;
      clearButton.disabled = false;
      fileInput.value = "";
    }
  }

  input.addEventListener("input", (event) => {
    applyValue(event.target.value, { rerender: false, syncInput: false });
    status.textContent = "URL updated locally. Save content to publish.";
  });

  input.addEventListener("change", () => {
    renderMediaPanels();
  });

  fileInput.addEventListener("change", (event) => {
    handleSelectedFile(event.target.files?.[0]).catch(console.error);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("dragging");
    });
  });

  ["dragleave", "dragend", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.remove("dragging");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    handleSelectedFile(file).catch(console.error);
  });

  shell.append(preview, input, actions, dropzone, status, fileInput);
  return shell;
}

function renderPrimitiveField(path, value) {
  const key = String(path[path.length - 1]);
  const field = document.createElement("label");
  field.className = "field";

  const caption = document.createElement("span");
  caption.textContent = humanizeKey(key);
  field.appendChild(caption);

  if (isMediaPath(value)) {
    field.appendChild(createMediaControl(path, value));
    return field;
  }

  if (key === "tone" && (value === "light" || value === "dark")) {
    const select = document.createElement("select");
    ["light", "dark"].forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = humanizeKey(optionValue);
      option.selected = optionValue === value;
      select.appendChild(option);
    });
    select.addEventListener("change", (event) => {
      setValueByPath(state.content, path, event.target.value);
      syncContentDraft();
    });
    field.appendChild(select);
    return field;
  }

  if (typeof value === "boolean") {
    const toggle = document.createElement("label");
    toggle.className = "toggle-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = value;
    checkbox.addEventListener("change", (event) => {
      setValueByPath(state.content, path, event.target.checked);
      syncContentDraft();
    });
    const badge = document.createElement("span");
    badge.textContent = value ? "Enabled" : "Disabled";
    checkbox.addEventListener("change", () => {
      badge.textContent = checkbox.checked ? "Enabled" : "Disabled";
    });
    toggle.append(checkbox, badge);
    field.appendChild(toggle);
    return field;
  }

  const useNumber = typeof value === "number" || (value === null && looksNumericKey(key));
  if (useNumber) {
    const input = document.createElement("input");
    input.type = "number";
    input.step = Number.isInteger(value) || value == null ? "1" : "0.1";
    input.value = value ?? "";
    input.addEventListener("input", (event) => {
      setValueByPath(state.content, path, event.target.value === "" ? null : Number(event.target.value));
      syncContentDraft();
    });
    field.appendChild(input);
    return field;
  }

  const longText = looksLongText(value, key);
  const control = longText ? document.createElement("textarea") : document.createElement("input");
  if (longText) {
    control.rows = 4;
  } else {
    control.type = "text";
  }

  control.value = value ?? "";
  control.addEventListener("input", (event) => {
    setValueByPath(state.content, path, event.target.value);
    syncContentDraft();
  });
  field.appendChild(control);
  return field;
}

function isCompactObjectList(items) {
  return (
    items.length > 0 &&
    items.every(
      (item) =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        Object.values(item).every((value) => value == null || ["string", "number", "boolean"].includes(typeof value)) &&
        Object.keys(item).length <= 4
    )
  );
}

function createCompactObjectList(items, path) {
  const list = document.createElement("div");
  list.className = "compact-object-list";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "compact-object-card";

    const head = document.createElement("div");
    head.className = "collection-head";

    const heading = document.createElement("h4");
    heading.textContent = getCollectionLabel(item, index);
    head.appendChild(heading);
    head.appendChild(
      createButton("danger-btn small", "Remove", () => {
        items.splice(index, 1);
        syncContentDraft();
        renderContentWorkbench();
        renderAssetsWorkbench();
      })
    );

    const grid = document.createElement("div");
    grid.className = "compact-object-grid";

    Object.entries(item).forEach(([key, entryValue]) => {
      grid.appendChild(renderPrimitiveField([...path, index, key], entryValue));
    });

    card.append(head, grid);
    list.appendChild(card);
  });

  return list;
}

function renderArrayEditor(items, path, depth = 0) {
  const wrapper = document.createElement("div");
  wrapper.className = "array-editor";

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No items yet.";
    wrapper.appendChild(empty);
  }

  if (items.every((item) => typeof item === "string" || typeof item === "number" || item == null)) {
    const list = document.createElement("div");
    list.className = "repeater-list";

    items.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "repeater-row";

      const control = looksLongText(item, path[path.length - 1]) ? document.createElement("textarea") : document.createElement("input");
      if (control.tagName === "TEXTAREA") {
        control.rows = 3;
      } else {
        control.type = typeof item === "number" ? "number" : "text";
      }
      control.value = item ?? "";
      control.addEventListener("input", (event) => {
        items[index] = typeof item === "number" ? Number(event.target.value || 0) : event.target.value;
        syncContentDraft();
      });

      row.appendChild(control);
      row.appendChild(
        createButton("danger-btn small", "Remove", () => {
          items.splice(index, 1);
          syncContentDraft();
          renderContentWorkbench();
          renderAssetsWorkbench();
        })
      );
      list.appendChild(row);
    });

    wrapper.appendChild(list);
    wrapper.appendChild(
      createButton("ghost-btn small", "Add Item", () => {
        items.push(typeof items[0] === "number" ? 0 : "");
        syncContentDraft();
        renderContentWorkbench();
        renderAssetsWorkbench();
      })
    );
    return wrapper;
  }

  if (items.every(Array.isArray)) {
    const list = document.createElement("div");
    list.className = "matrix-list";

    items.forEach((rowValues, rowIndex) => {
      const row = document.createElement("div");
      row.className = "matrix-row";

      rowValues.forEach((cellValue, cellIndex) => {
        const input = document.createElement("input");
        input.type = typeof cellValue === "number" ? "number" : "text";
        input.value = cellValue ?? "";
        input.addEventListener("input", (event) => {
          rowValues[cellIndex] = typeof cellValue === "number" ? Number(event.target.value || 0) : event.target.value;
          syncContentDraft();
        });
        row.appendChild(input);
      });

      row.appendChild(
        createButton("danger-btn small", "Remove Row", () => {
          items.splice(rowIndex, 1);
          syncContentDraft();
          renderContentWorkbench();
        })
      );
      list.appendChild(row);
    });

    wrapper.appendChild(list);
    wrapper.appendChild(
      createButton("ghost-btn small", "Add Row", () => {
        items.push(items[0] ? createEmptyFromShape(items[0]) : [""]);
        syncContentDraft();
        renderContentWorkbench();
      })
    );
    return wrapper;
  }

  if (isCompactObjectList(items)) {
    wrapper.appendChild(createCompactObjectList(items, path));
    wrapper.appendChild(
      createButton("ghost-btn small", "Add Item", () => {
        items.push(items[0] ? createEmptyFromShape(items[0]) : {});
        syncContentDraft();
        renderContentWorkbench();
        renderAssetsWorkbench();
      })
    );
    return wrapper;
  }

  const collection = document.createElement("div");
  collection.className = "collection-list";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "collection-item";

    const head = document.createElement("div");
    head.className = "collection-head";

    const heading = document.createElement("h4");
    heading.textContent = getCollectionLabel(item, index);
    head.appendChild(heading);
    head.appendChild(
      createButton("danger-btn small", "Remove", () => {
        items.splice(index, 1);
        syncContentDraft();
        renderContentWorkbench();
        renderAssetsWorkbench();
      })
    );

    card.append(head, renderObjectEditor(item, [...path, index], depth + 1));
    collection.appendChild(card);
  });

  wrapper.appendChild(collection);
  wrapper.appendChild(
    createButton("ghost-btn small", "Add Item", () => {
      items.push(items[0] ? createEmptyFromShape(items[0]) : {});
      syncContentDraft();
      renderContentWorkbench();
      renderAssetsWorkbench();
    })
  );

  return wrapper;
}

function getVisibleObjectEntries(object, path) {
  return Object.entries(object).filter(([key]) => {
    const childPath = [...path, key];
    if (isHiddenContentPath(childPath)) return false;
    if (joinPath(childPath) === "hero.videoSources.mov") return false;
    return true;
  });
}

function createUnifiedHeroVideoEditor(path) {
  const wrapper = document.createElement("div");
  wrapper.className = "field-stack";

  const field = document.createElement("label");
  field.className = "field";

  const caption = document.createElement("span");
  caption.textContent = "Landing Video";
  field.appendChild(caption);
  field.appendChild(createMediaControl(path, getUnifiedHeroVideoValue()));
  wrapper.appendChild(field);

  const note = document.createElement("small");
  note.className = "card-note";
  note.textContent = "This single source updates both stored video fields for the hero.";
  wrapper.appendChild(note);

  return wrapper;
}

function renderObjectEditor(object, path, depth = 0) {
  if (isHeroVideoSourcesPath(path)) {
    return createUnifiedHeroVideoEditor(path);
  }

  const wrapper = document.createElement("div");
  wrapper.className = `editor-grid ${depth > 0 ? "nested" : ""}`;

  getVisibleObjectEntries(object, path).forEach(([key, value]) => {
    const childPath = [...path, key];

    if (Array.isArray(value) || (value && typeof value === "object")) {
      const block = document.createElement("section");
      block.className = "nested-block";

      const head = document.createElement("div");
      head.className = "nested-head";
      const heading = document.createElement("h4");
      heading.textContent = isHeroVideoSourcesPath(childPath) ? "Landing Video" : humanizeKey(key);
      head.appendChild(heading);

      block.append(head, renderEditorValue(value, childPath, depth + 1));
      wrapper.appendChild(block);
      return;
    }

    wrapper.appendChild(renderPrimitiveField(childPath, value));
  });

  return wrapper;
}

function renderEditorValue(value, path, depth = 0) {
  if (isHeroVideoSourcesPath(path)) return createUnifiedHeroVideoEditor(path);
  if (Array.isArray(value)) return renderArrayEditor(value, path, depth);
  if (value && typeof value === "object") return renderObjectEditor(value, path, depth);
  return renderPrimitiveField(path, value);
}

function collectMediaEntries(node, path = [], entries = []) {
  if (isHiddenContentPath(path)) {
    return entries;
  }

  if (isHeroVideoSourcesPath(path)) {
    entries.push({
      path,
      label: "Hero / Landing Video",
      value: getUnifiedHeroVideoValue(),
    });
    return entries;
  }

  if (typeof node === "string" && isMediaPath(node)) {
    if (joinPath(path) !== "hero.videoSources.mov") {
      entries.push({
        path,
        label: humanizePath(path),
        value: node,
      });
    }
    return entries;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => collectMediaEntries(item, [...path, index], entries));
    return entries;
  }

  if (node && typeof node === "object") {
    Object.entries(node).forEach(([key, entryValue]) => collectMediaEntries(entryValue, [...path, key], entries));
  }

  return entries;
}

function createMediaCard(entry, compact = false) {
  const card = document.createElement("article");
  card.className = "media-card";

  const meta = document.createElement("div");
  meta.className = "media-meta";

  const heading = document.createElement("strong");
  heading.textContent = isHeroVideoSourcesPath(entry.path)
    ? "Landing Video"
    : humanizeKey(entry.path[entry.path.length - 1] || "media");
  meta.appendChild(heading);

  const location = document.createElement("span");
  location.textContent = entry.label;
  meta.appendChild(location);

  card.append(meta, createMediaControl(entry.path, entry.value, { compact }));
  return card;
}

function renderMediaLibrary(container, compact = false) {
  const entries = collectMediaEntries(state.content);
  container.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No images or videos found.";
    container.appendChild(empty);
    return;
  }

  entries.forEach((entry) => container.appendChild(createMediaCard(entry, compact)));
}

function renderMediaPanels() {
  if (refs.mediaLibrary) {
    renderMediaLibrary(refs.mediaLibrary, false);
  }
  if (state.activePanel === "assets") {
    renderAssetsWorkbench();
  }
}

function renderPreviewControls() {
  const navigation = state.content.site.navigation || [];
  if (!navigation.some((item) => item.path === state.previewPath)) {
    state.previewPath = navigation[0]?.path || "/";
  }

  refs.previewPageSelect.innerHTML = "";
  navigation.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.path;
    option.textContent = item.label;
    option.selected = item.path === state.previewPath;
    refs.previewPageSelect.appendChild(option);
  });

  refs.openPreviewBtn.href = buildPreviewUrl(state.previewPath, false);
}

function refreshPreview() {
  refs.openPreviewBtn.href = buildPreviewUrl(state.previewPath, false);
  refs.sitePreviewFrame.src = buildPreviewUrl(state.previewPath, true);
}

function renderTreeNavigation(groups, selection, container, getChildren, onSelectGroup, onSelectChild) {
  container.innerHTML = "";

  groups.forEach((group) => {
    const groupButton = document.createElement("button");
    groupButton.type = "button";
    groupButton.className = `tree-item ${selection.groupId === group.id ? "active" : ""}`;
    groupButton.textContent = group.label;
    groupButton.addEventListener("click", () => onSelectGroup(group.id));
    container.appendChild(groupButton);

    if (selection.groupId !== group.id) {
      return;
    }

    const children = getChildren(group);
    if (!children.length) {
      return;
    }

    const childList = document.createElement("div");
    childList.className = "tree-children";

    children.forEach((child) => {
      const childButton = document.createElement("button");
      childButton.type = "button";
      childButton.className = `tree-child ${selection.subKey === child.key ? "active" : ""}`;
      childButton.textContent = child.label;
      childButton.addEventListener("click", () => onSelectChild(child.key));
      childList.appendChild(childButton);
    });

    container.appendChild(childList);
  });
}

function createWorkbenchPane(title, description) {
  const pane = document.createElement("section");
  pane.className = "workbench-pane";

  const head = document.createElement("div");
  head.className = "workbench-pane-head";

  const heading = document.createElement("h3");
  heading.textContent = title;
  head.appendChild(heading);

  if (description) {
    const note = document.createElement("p");
    note.className = "card-note";
    note.textContent = description;
    head.appendChild(note);
  }

  pane.appendChild(head);
  return pane;
}

function getContentChildren(group) {
  const value = getValueByPath(state.content, group.path);
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return [];
  }

  return getVisibleObjectEntries(value, group.path).map(([key, childValue]) => ({
    key,
    label: isHeroVideoSourcesPath([...group.path, key]) ? "Landing Video" : humanizeKey(key),
    path: [...group.path, key],
    value: childValue,
  }));
}

function renderContentWorkbench() {
  renderPreviewControls();
  renderMediaPanels();

  const currentGroup =
    CONTENT_GROUPS.find((group) => group.id === state.contentSelection.groupId) || CONTENT_GROUPS[0];
  const children = getContentChildren(currentGroup);
  if (children.length && !children.some((child) => child.key === state.contentSelection.subKey)) {
    state.contentSelection.subKey = children[0].key;
  }

  renderTreeNavigation(
    CONTENT_GROUPS,
    state.contentSelection,
    refs.contentTree,
    getContentChildren,
    (groupId) => {
      state.contentSelection.groupId = groupId;
      state.contentSelection.subKey = null;
      renderContentWorkbench();
    },
    (subKey) => {
      state.contentSelection.subKey = subKey;
      renderContentWorkbench();
    }
  );

  refs.contentDetail.innerHTML = "";
  const activeGroup =
    CONTENT_GROUPS.find((group) => group.id === state.contentSelection.groupId) || CONTENT_GROUPS[0];
  const value = getValueByPath(state.content, activeGroup.path);
  const activeChild = children.find((child) => child.key === state.contentSelection.subKey);

  const pane = createWorkbenchPane(
    activeChild ? `${activeGroup.label} / ${activeChild.label}` : activeGroup.label,
    activeGroup.description
  );
  pane.appendChild(renderEditorValue(activeChild ? activeChild.value : value, activeChild ? activeChild.path : activeGroup.path));
  refs.contentDetail.appendChild(pane);

  syncContentDraft();
}

function getFormChildren(group) {
  const value = getValueByPath(state.content, group.path);
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return [];
  }

  return Object.entries(value).map(([key, childValue]) => ({
    key,
    label: humanizeKey(key),
    path: [...group.path, key],
    value: childValue,
  }));
}

function renderAssetsWorkbench() {
  if (!refs.assetsTree || !refs.assetsDetail || !state.content) return;

  const currentGroup = ASSET_GROUPS.find((group) => group.id === state.assetsSelection.groupId) || ASSET_GROUPS[0];
  const children = currentGroup.type === "form" ? getFormChildren(currentGroup) : [];
  if (children.length && !children.some((child) => child.key === state.assetsSelection.subKey)) {
    state.assetsSelection.subKey = children[0].key;
  }

  renderTreeNavigation(
    ASSET_GROUPS,
    state.assetsSelection,
    refs.assetsTree,
    (group) => (group.type === "form" ? getFormChildren(group) : []),
    (groupId) => {
      state.assetsSelection.groupId = groupId;
      state.assetsSelection.subKey = null;
      renderAssetsWorkbench();
    },
    (subKey) => {
      state.assetsSelection.subKey = subKey;
      renderAssetsWorkbench();
    }
  );

  refs.assetsDetail.innerHTML = "";
  const activeGroup = ASSET_GROUPS.find((group) => group.id === state.assetsSelection.groupId) || ASSET_GROUPS[0];

  if (activeGroup.type === "media") {
    const pane = createWorkbenchPane(activeGroup.label, activeGroup.description);
    const library = document.createElement("div");
    library.className = "media-library media-grid";
    renderMediaLibrary(library, false);
    pane.appendChild(library);
    refs.assetsDetail.appendChild(pane);
    return;
  }

  const value = getValueByPath(state.content, activeGroup.path);
  const activeChild = children.find((child) => child.key === state.assetsSelection.subKey);
  const pane = createWorkbenchPane(
    activeChild ? `${activeGroup.label} / ${activeChild.label}` : activeGroup.label,
    activeGroup.description
  );
  pane.appendChild(renderEditorValue(activeChild ? activeChild.value : value, activeChild ? activeChild.path : activeGroup.path));
  refs.assetsDetail.appendChild(pane);
}

function createFontFamilyControl() {
  const field = document.createElement("label");
  field.className = "field";

  const caption = document.createElement("span");
  caption.textContent = "Font Family";

  const select = document.createElement("select");
  state.settings.design.fontOptions.forEach((family) => {
    const option = document.createElement("option");
    option.value = family;
    option.textContent = family.split(",")[0].replaceAll("\"", "");
    option.selected = family === state.settings.design.fontFamily;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    state.settings.design.fontFamily = select.value;
    state.settings.branding.fontFamily = select.value;
    applyDesignToThemeTokens(state.settings);
    syncSettingsDraft();
    renderThemeWorkbench();
  });

  field.append(caption, select);
  return field;
}

function createTypographyControls() {
  const stack = document.createElement("div");
  stack.className = "slider-stack";

  TYPOGRAPHY_FIELDS.forEach(({ key, label }) => {
    const row = document.createElement("div");
    row.className = "slider-row";

    const meta = document.createElement("div");
    meta.className = "slider-meta";

    const heading = document.createElement("strong");
    heading.textContent = label;
    meta.appendChild(heading);

    const valueBadge = document.createElement("span");
    valueBadge.className = "slider-value";
    valueBadge.textContent = `${state.settings.design.typography[key].toFixed(2)}x`;
    meta.appendChild(valueBadge);

    const controls = document.createElement("div");
    controls.className = "slider-controls";

    const range = document.createElement("input");
    range.type = "range";
    range.min = "0.75";
    range.max = "1.35";
    range.step = "0.05";
    range.value = String(state.settings.design.typography[key]);
    range.addEventListener("input", (event) => {
      state.settings.design.typography[key] = Number(event.target.value);
      valueBadge.textContent = `${state.settings.design.typography[key].toFixed(2)}x`;
      applyDesignToThemeTokens(state.settings);
      syncSettingsDraft();
      renderThemeWorkbench();
    });

    const decrease = createButton("ghost-btn icon-btn", "-", () => {
      state.settings.design.typography[key] = Math.max(0.75, Number((state.settings.design.typography[key] - 0.05).toFixed(2)));
      applyDesignToThemeTokens(state.settings);
      syncSettingsDraft();
      renderThemeWorkbench();
    });

    const increase = createButton("ghost-btn icon-btn", "+", () => {
      state.settings.design.typography[key] = Math.min(1.35, Number((state.settings.design.typography[key] + 0.05).toFixed(2)));
      applyDesignToThemeTokens(state.settings);
      syncSettingsDraft();
      renderThemeWorkbench();
    });

    controls.append(decrease, range, increase);
    row.append(meta, controls);
    stack.appendChild(row);
  });

  return stack;
}

function createPaletteField(mode, key, label) {
  const palette = state.settings.design.palettes[mode];
  const wrapper = document.createElement("label");
  wrapper.className = "color-field";

  const copy = document.createElement("div");
  copy.className = "color-field-copy";

  const heading = document.createElement("strong");
  heading.textContent = label;
  const note = document.createElement("span");
  note.textContent = palette[key];
  copy.append(heading, note);

  const input = document.createElement("input");
  input.type = "color";
  input.value = safeHex(palette[key], DEFAULT_DESIGN_PALETTES[mode][key]);
  input.addEventListener("input", (event) => {
    palette[key] = event.target.value;
    note.textContent = palette[key];
    applyDesignToThemeTokens(state.settings);
    syncSettingsDraft();
    renderThemeWorkbench();
  });

  wrapper.append(copy, input);
  return wrapper;
}

function createPaletteControls(mode) {
  const grid = document.createElement("div");
  grid.className = "color-grid";
  PALETTE_FIELDS.forEach(({ key, label }) => {
    grid.appendChild(createPaletteField(mode, key, label));
  });
  return grid;
}

function createThemePreviewCard(mode) {
  const palette = state.settings.design.palettes[mode];
  const typography = state.settings.design.typography;
  const card = document.createElement("article");
  card.className = "theme-preview-card";
  card.style.setProperty("--preview-bg", palette.pageBackground);
  card.style.setProperty("--preview-surface", palette.surface);
  card.style.setProperty("--preview-text", palette.text);
  card.style.setProperty("--preview-heading", palette.heading);
  card.style.setProperty("--preview-primary", palette.primary);
  card.style.setProperty("--preview-secondary", palette.secondary);
  card.style.setProperty("--preview-mist", palette.mist);
  card.style.setProperty("--preview-font", state.settings.design.fontFamily);
  card.style.setProperty("--preview-scale-hero", typography.heroTitleScale);
  card.style.setProperty("--preview-scale-page", typography.pageTitleScale);
  card.style.setProperty("--preview-scale-body", typography.bodyScale);
  card.style.setProperty("--preview-scale-button", typography.buttonScale);
  card.style.setProperty("--preview-scale-nav", typography.navScale);

  const label = document.createElement("span");
  label.className = "preview-mode-label";
  label.textContent = mode === "light" ? "Light mode preview" : "Dark mode preview";

  const shell = document.createElement("div");
  shell.className = "preview-shell";

  const topbar = document.createElement("div");
  topbar.className = "preview-topbar";

  const logo = document.createElement("div");
  logo.className = "preview-logo";
  logo.textContent = "Bio Trend";

  const nav = document.createElement("div");
  nav.className = "preview-nav";
  ["Home", "Solutions", "Projects"].forEach((item, index) => {
    const pill = document.createElement("span");
    pill.className = `preview-pill ${index === 0 ? "active" : ""}`;
    pill.textContent = item;
    nav.appendChild(pill);
  });

  topbar.append(logo, nav);

  const hero = document.createElement("div");
  hero.className = "preview-hero";
  hero.innerHTML = `
    <small>Cleaner Energy</small>
    <h4>Turning waste into clean energy</h4>
    <p>Preview how typography, palette, and spacing feel together before saving changes to the site.</p>
  `;

  const actions = document.createElement("div");
  actions.className = "preview-actions";
  actions.innerHTML = `
    <span class="preview-primary-btn">Start Project</span>
    <span class="preview-secondary-btn">Explore</span>
  `;

  const cards = document.createElement("div");
  cards.className = "preview-card-row";
  cards.innerHTML = `
    <div class="preview-mini-card">
      <strong>Industrial-ready fuel</strong>
      <span>Designed for cleaner thermal output and measurable savings.</span>
    </div>
    <div class="preview-mini-card">
      <strong>Operational visibility</strong>
      <span>Check contrast, font sizing, and card clarity without touching CSS.</span>
    </div>
  `;

  hero.appendChild(actions);
  shell.append(label, topbar, hero, cards);
  card.appendChild(shell);
  return card;
}

function createThemePreviewGrid() {
  const grid = document.createElement("div");
  grid.className = "theme-preview-grid";
  grid.appendChild(createThemePreviewCard("light"));
  grid.appendChild(createThemePreviewCard("dark"));
  return grid;
}

function createSettingsFields() {
  const shell = document.createElement("div");
  shell.className = "field-stack";

  const grid = document.createElement("div");
  grid.className = "two-col-grid compact-grid";

  const apiField = document.createElement("label");
  apiField.className = "field";
  apiField.innerHTML = "<span>API Base URL</span>";
  const apiInput = document.createElement("input");
  apiInput.type = "text";
  apiInput.value = state.settings.api.baseUrl;
  apiInput.addEventListener("input", () => {
    state.settings.api.baseUrl = apiInput.value.trim() || "http://127.0.0.1:8787";
    syncSettingsDraft();
  });
  apiField.appendChild(apiInput);

  const refreshField = document.createElement("label");
  refreshField.className = "field";
  refreshField.innerHTML = "<span>Auto Refresh (seconds)</span>";
  const refreshInput = document.createElement("input");
  refreshInput.type = "number";
  refreshInput.min = "5";
  refreshInput.step = "5";
  refreshInput.value = String(state.settings.analytics.dashboardRefreshSeconds);
  refreshInput.addEventListener("input", () => {
    state.settings.analytics.dashboardRefreshSeconds = Math.max(5, Number(refreshInput.value || 30));
    syncSettingsDraft();
    updateAutoRefreshBadge();
  });
  refreshField.appendChild(refreshInput);

  grid.append(apiField, refreshField);

  const sourceField = document.createElement("label");
  sourceField.className = "field";
  sourceField.innerHTML = "<span>Traffic Sources</span>";
  const sourcesInput = document.createElement("textarea");
  sourcesInput.rows = 5;
  sourcesInput.value = state.settings.analytics.trafficSources.join("\n");
  sourcesInput.addEventListener("input", () => {
    state.settings.analytics.trafficSources = sourcesInput.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    syncSettingsDraft();
  });
  const hint = document.createElement("small");
  hint.textContent = "One source per line.";
  sourceField.append(sourcesInput, hint);

  shell.append(grid, sourceField);
  return shell;
}

function createImportExportControls() {
  const stack = document.createElement("div");
  stack.className = "field-stack";

  const note = document.createElement("p");
  note.className = "card-note";
  note.textContent = "Export the full theme settings JSON or import a saved file to restore fonts, colors, and dashboard refresh options.";

  const actions = document.createElement("div");
  actions.className = "inline-actions";

  const exportButton = createButton("ghost-btn", "Export Theme Settings", () => {
    downloadJson("site-settings.json", state.settings);
  });

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json,application/json";
  importInput.className = "hidden";
  importInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const raw = await file.text();
      state.settings = ensureDesignSettings(JSON.parse(raw));
      syncSettingsDraft();
      renderThemeWorkbench();
      flashStatus("Theme settings imported");
    } catch (error) {
      window.alert(`Import failed: ${error.message}`);
    } finally {
      importInput.value = "";
    }
  });

  const importButton = createButton("primary-btn", "Import Theme Settings", () => importInput.click());
  actions.append(exportButton, importButton, importInput);
  stack.append(note, actions);
  return stack;
}

function renderThemeWorkbench() {
  ensureDesignSettings(state.settings);
  refs.themeTree.innerHTML = "";
  refs.themeDetail.innerHTML = "";

  THEME_SECTIONS.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tree-item ${state.themeSelection === section.id ? "active" : ""}`;
    button.textContent = section.label;
    button.addEventListener("click", () => {
      state.themeSelection = section.id;
      renderThemeWorkbench();
    });
    refs.themeTree.appendChild(button);
  });

  const activeSection = THEME_SECTIONS.find((section) => section.id === state.themeSelection) || THEME_SECTIONS[0];
  const pane = createWorkbenchPane(activeSection.label, activeSection.description);

  if (activeSection.id === "typography") {
    const stack = document.createElement("div");
    stack.className = "field-stack";
    stack.append(createFontFamilyControl(), createTypographyControls());
    pane.appendChild(stack);
  } else if (activeSection.id === "lightPalette") {
    pane.appendChild(createPaletteControls("light"));
  } else if (activeSection.id === "darkPalette") {
    pane.appendChild(createPaletteControls("dark"));
  } else if (activeSection.id === "preview") {
    pane.appendChild(createThemePreviewGrid());
  } else if (activeSection.id === "settings") {
    pane.appendChild(createSettingsFields());
  } else if (activeSection.id === "importExport") {
    pane.appendChild(createImportExportControls());
  }

  refs.themeDetail.appendChild(pane);
  syncSettingsDraft();
}
function renderSidebar() {
  refs.sidebarNav.innerHTML = "";

  state.schema.tabs.forEach((tab) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sidebar-tab";
    button.dataset.panel = tab.id;
    button.textContent = tab.label;
    button.addEventListener("click", () => setPanel(tab.id));
    refs.sidebarNav.appendChild(button);
  });

  setPanel(state.activePanel);
}

function setPanel(panelId) {
  const validPanel = state.schema?.tabs.some((tab) => tab.id === panelId) ? panelId : state.schema?.tabs[0]?.id || "overview";
  state.activePanel = validPanel;

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === validPanel);
  });

  document.querySelectorAll(".sidebar-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === validPanel);
  });

  const activeLabel = state.schema?.tabs.find((tab) => tab.id === validPanel)?.label || validPanel;
  refs.panelTitle.textContent = activeLabel;

  if (validPanel === "content") renderContentWorkbench();
  if (validPanel === "theme") renderThemeWorkbench();
  if (validPanel === "assets") renderAssetsWorkbench();
}

function renderOverview() {
  const metrics = state.analytics.metrics;
  refs.metricsGrid.innerHTML = "";

  Object.entries(metrics).forEach(([key, value]) => {
    const card = document.createElement("article");
    card.className = "metric-card";

    const label = document.createElement("span");
    label.textContent = humanizeKey(key);

    const total = document.createElement("strong");
    total.textContent = value;

    card.append(label, total);
    refs.metricsGrid.appendChild(card);
  });

  refs.summaryGrid.innerHTML = "";
  [
    ["Navigation", state.content.site.navigation.length],
    ["Hero Messages", state.content.hero.messages.length],
    ["Project Cards", state.content.pages.projects.items.length],
    ["Traffic Sources", state.settings.analytics.trafficSources.length],
  ].forEach(([labelText, value]) => {
    const card = document.createElement("article");
    card.className = "metric-card";

    const label = document.createElement("span");
    label.textContent = labelText;

    const total = document.createElement("strong");
    total.textContent = value;

    card.append(label, total);
    refs.summaryGrid.appendChild(card);
  });

  refs.activityList.innerHTML = "";
  const events = state.analytics.activity || [];
  if (!events.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No activity recorded yet.";
    refs.activityList.appendChild(empty);
    return;
  }

  events.slice(0, 6).forEach((event) => {
    refs.activityList.appendChild(createHistoryItem(event));
  });
}

function createUsageCard(summary) {
  const card = document.createElement("article");
  card.className = "usage-card";

  const head = document.createElement("div");
  head.className = "usage-head";

  const name = document.createElement("strong");
  name.textContent = summary.user.displayName;

  const role = document.createElement("span");
  role.className = `user-role ${summary.user.role}`;
  role.textContent = humanizeKey(summary.user.role);

  head.append(name, role);

  const meta = document.createElement("small");
  meta.textContent = `${summary.user.username} | Last action: ${formatDate(summary.lastActionAt)}`;

  const metrics = document.createElement("div");
  metrics.className = "usage-metrics";
  [
    ["Logins", summary.metrics.logins],
    ["Views", summary.metrics.dashboardViews],
    ["Content", summary.metrics.contentSaves],
    ["Theme", summary.metrics.themeSaves],
    ["Team", summary.metrics.teamChanges],
    ["Total", summary.metrics.totalActions],
  ].forEach(([label, value]) => {
    const item = document.createElement("span");
    item.textContent = `${label}: ${value}`;
    metrics.appendChild(item);
  });

  card.append(head, meta, metrics);
  return card;
}

function createHistoryItem(entry) {
  const item = document.createElement("article");
  item.className = "history-item";

  const head = document.createElement("div");
  head.className = "history-head";

  const title = document.createElement("strong");
  title.textContent = entry.label;

  const actor = document.createElement("span");
  actor.className = `user-role ${entry.actor?.role || ""}`.trim();
  actor.textContent = entry.actor?.displayName || "System";

  const type = document.createElement("small");
  type.textContent = `${humanizeKey(entry.type)} | ${formatDate(entry.createdAt)}`;

  head.append(title, actor);
  item.append(head, type);
  return item;
}

function openActivityModal(title, entries) {
  if (!refs.activityModal) return;
  refs.activityModalTitle.textContent = title;
  refs.activityModalList.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No activity recorded yet.";
    refs.activityModalList.appendChild(empty);
  } else {
    entries.forEach((entry) => {
      refs.activityModalList.appendChild(createHistoryItem(entry));
    });
  }

  refs.activityModal.classList.remove("hidden");
}

function closeActivityModal() {
  if (!refs.activityModal) return;
  refs.activityModal.classList.add("hidden");
}

function renderAnalytics() {
  const submissions = state.analytics.submissions;
  const max = Math.max(submissions.contactCount, submissions.projectCount, submissions.newsletterCount, 1);

  refs.submissionChart.innerHTML = "";
  [
    ["Contact", submissions.contactCount],
    ["Project", submissions.projectCount],
    ["Newsletter", submissions.newsletterCount],
  ].forEach(([labelText, value]) => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const title = document.createElement("strong");
    title.innerHTML = `${labelText} <span class="muted">(${value})</span>`;

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${(value / max) * 100}%`;
    track.appendChild(fill);

    row.append(title, track);
    refs.submissionChart.appendChild(row);
  });

  refs.sourceList.innerHTML = "";
  state.settings.analytics.trafficSources.forEach((source) => {
    const item = document.createElement("article");
    item.className = "source-item";

    const title = document.createElement("strong");
    title.textContent = source;

    const note = document.createElement("span");
    note.textContent = "Tracked in the dashboard analytics source list.";

    item.append(title, note);
    refs.sourceList.appendChild(item);
  });

  const isAdmin = state.auth.user?.role === "admin";
  refs.adminAnalyticsRow.classList.toggle("hidden", !isAdmin);
  refs.teamUsageGrid.innerHTML = "";
  refs.changeHistoryList.innerHTML = "";

  if (isAdmin) {
    (state.analytics.teamUsage || []).forEach((summary) => {
      refs.teamUsageGrid.appendChild(createUsageCard(summary));
    });

    if (!(state.analytics.changeHistory || []).length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No staff activity yet.";
      refs.changeHistoryList.appendChild(empty);
    } else {
      state.analytics.changeHistory.slice(0, 6).forEach((entry) => {
        refs.changeHistoryList.appendChild(createHistoryItem(entry));
      });
    }
  }
}

function renderTeamPanel() {
  const isAdmin = state.auth.user?.role === "admin";
  refs.teamPanel.classList.toggle("hidden", !isAdmin);

  if (!isAdmin) {
    refs.staffFormError.textContent = "";
    refs.userGrid.innerHTML = "";
    refs.teamHistoryList.innerHTML = "";
    return;
  }

  refs.userGrid.innerHTML = "";
  refs.teamHistoryList.innerHTML = "";

  if (!state.teamOverview) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No team data available.";
    refs.userGrid.appendChild(empty);
    return;
  }

  (state.teamOverview.changeHistory || []).slice(0, 6).forEach((entry) => {
    refs.teamHistoryList.appendChild(createHistoryItem(entry));
  });

  state.teamOverview.users.forEach((summary) => {
    const user = summary.user;
    const card = document.createElement("article");
    card.className = "user-card";

    const head = document.createElement("div");
    head.className = "user-card-head";

    const left = document.createElement("div");
    const name = document.createElement("h4");
    name.textContent = user.displayName;
    const meta = document.createElement("small");
    meta.textContent = `${user.username} | Created ${formatDate(user.createdAt)} | Last login ${formatDate(user.lastLoginAt)}`;
    left.append(name, meta);

    const role = document.createElement("span");
    role.className = `user-role ${user.role}`;
    role.textContent = humanizeKey(user.role);

    head.append(left, role);

    const fields = document.createElement("div");
    fields.className = "field-stack";

    const displayNameField = document.createElement("label");
    displayNameField.className = "field";
    displayNameField.innerHTML = `<span>Display Name</span>`;
    const displayNameInput = document.createElement("input");
    displayNameInput.type = "text";
    displayNameInput.value = user.displayName;
    displayNameField.appendChild(displayNameInput);

    const usernameField = document.createElement("label");
    usernameField.className = "field";
    usernameField.innerHTML = `<span>Username</span>`;
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.value = user.username;
    usernameField.appendChild(usernameInput);

    const passwordField = document.createElement("label");
    passwordField.className = "field";
    passwordField.innerHTML = `<span>New Password</span>`;
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Leave blank to keep current password";
    passwordField.appendChild(passwordInput);

    const activeField = document.createElement("label");
    activeField.className = "field";
    activeField.innerHTML = `<span>Account Enabled</span>`;
    const activeInput = document.createElement("input");
    activeInput.type = "checkbox";
    activeInput.checked = user.active;
    if (user.id === state.auth.user.id) {
      activeInput.disabled = true;
    }
    activeField.appendChild(activeInput);

    const usage = document.createElement("div");
    usage.className = "usage-metrics";
    [
      ["Logins", summary.metrics.logins],
      ["Views", summary.metrics.dashboardViews],
      ["Content", summary.metrics.contentSaves],
      ["Theme", summary.metrics.themeSaves],
      ["Team", summary.metrics.teamChanges],
      ["Total", summary.metrics.totalActions],
    ].forEach(([label, value]) => {
      const item = document.createElement("span");
      item.textContent = `${label}: ${value}`;
      usage.appendChild(item);
    });

    const actions = document.createElement("div");
    actions.className = "inline-actions";

    const saveButton = createButton("primary-btn", "Save User", async () => {
      try {
        await api(`/api/team/users/${user.id}`, {
          method: "PUT",
          body: JSON.stringify({
            displayName: displayNameInput.value.trim(),
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim(),
            active: activeInput.checked,
          }),
        });
        passwordInput.value = "";
        await loadDashboard();
        flashStatus("User credentials updated");
      } catch (error) {
        window.alert(`User update failed: ${error.message}`);
      }
    });

    actions.appendChild(saveButton);

    if (user.role === "staff") {
      const removeButton = createButton("danger-btn", "Remove Staff", async () => {
        if (!window.confirm(`Remove staff account for ${user.displayName}?`)) return;
        try {
          await api(`/api/team/users/${user.id}`, {
            method: "DELETE",
          });
          await loadDashboard();
          flashStatus("Staff account removed");
        } catch (error) {
          window.alert(`Staff removal failed: ${error.message}`);
        }
      });
      actions.appendChild(removeButton);
    }

    fields.append(displayNameField, usernameField, passwordField, activeField, usage, actions);
    card.append(head, fields);
    refs.userGrid.appendChild(card);
  });
}

function renderTable(table, rows, columns) {
  table.innerHTML = "";

  if (!rows.length) {
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = columns.length;
    td.className = "empty-state";
    td.textContent = "No records yet.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    return;
  }

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = humanizeKey(column);
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  rows.slice(0, 12).forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((column) => {
      const td = document.createElement("td");
      td.textContent = getTableValue(row, column);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function getTableValue(row, column) {
  if (column === "createdAt") return formatDate(row.createdAt);
  return row.payload?.[column] || row[column] || "";
}

function renderSubmissions() {
  renderTable(refs.contactTable, state.submissions.contact, ["createdAt", "name", "email", "interest"]);
  renderTable(refs.projectTable, state.submissions.project, ["createdAt", "name", "email", "interest"]);
  renderTable(refs.newsletterTable, state.submissions.newsletter, ["createdAt", "email"]);
}

function applyBasicSettingsFields() {
  state.settings.api.baseUrl = state.settings.api.baseUrl?.trim() || "http://127.0.0.1:8787";
  state.settings.analytics.dashboardRefreshSeconds = Math.max(5, Number(state.settings.analytics.dashboardRefreshSeconds || 30));
  state.settings.analytics.trafficSources = (state.settings.analytics.trafficSources || [])
    .map((line) => String(line).trim())
    .filter(Boolean);
  state.settings.design.fontFamily = state.settings.design.fontFamily || state.settings.design.fontOptions[0];
  state.settings.branding.fontFamily = state.settings.design.fontFamily;
  applyDesignToThemeTokens(state.settings);
  syncSettingsDraft();
}

function parseContentEditor() {
  state.content = ensureContentEditingShape(JSON.parse(refs.contentEditor.value));
  syncContentDraft();
}

function parseSettingsEditor() {
  state.settings = ensureDesignSettings(JSON.parse(refs.settingsEditor.value));
  syncSettingsDraft();
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(href);
}

async function refreshTelemetry() {
  const requests = [api("/api/analytics"), api("/api/forms/submissions")];

  if (state.auth.user?.role === "admin") {
    requests.push(api("/api/team/overview"));
  }

  const [analytics, submissions, teamOverview] = await Promise.all(requests);
  state.analytics = analytics;
  state.submissions = submissions;
  state.teamOverview = teamOverview || null;
  renderOverview();
  renderAnalytics();
  renderTeamPanel();
  renderSubmissions();
}

function startAutoRefresh() {
  clearInterval(state.autoRefreshId);
  const seconds = Math.max(5, Number(state.settings.analytics.dashboardRefreshSeconds || 30));
  state.autoRefreshId = window.setInterval(() => {
    refreshTelemetry().catch(console.error);
  }, seconds * 1000);
  updateAutoRefreshBadge();
}

function updateAutoRefreshBadge() {
  if (!refs.autoRefreshBadge) return;
  const seconds = Math.max(5, Number(state.settings?.analytics?.dashboardRefreshSeconds || 30));
  refs.autoRefreshBadge.textContent = `Auto refresh ${seconds}s`;
}

async function trackDashboardViewOnce() {
  if (state.dashboardViewTracked || !state.auth.token) return;
  state.dashboardViewTracked = true;

  try {
    await api("/api/analytics/event", {
      method: "POST",
      body: JSON.stringify({ type: "dashboard-view", label: "Dashboard opened" }),
    });
    await refreshTelemetry();
  } catch (error) {
    console.error(error);
  }
}

async function refreshAll() {
  const requests = [
    api("/api/dashboard/schema"),
    api("/api/content"),
    api("/api/content/defaults"),
    api("/api/settings"),
    api("/api/settings/defaults"),
    api("/api/analytics"),
    api("/api/forms/submissions"),
  ];

  if (state.auth.user?.role === "admin") {
    requests.push(api("/api/team/overview"));
  }

  const [schema, content, defaultContent, settings, defaultSettings, analytics, submissions, teamOverview] = await Promise.all(
    requests
  );

  state.schema = schema;
  state.auth.user = schema.currentUser;
  state.defaults.content = defaultContent;
  state.defaults.settings = defaultSettings;
  state.content = ensureContentEditingShape(loadDraft("content", content));
  state.settings = ensureDesignSettings(loadDraft("settings", settings));
  state.analytics = analytics;
  state.submissions = submissions;
  state.teamOverview = teamOverview || null;
  updateSessionUI();
  renderSidebar();
  renderOverview();
  renderContentWorkbench();
  renderThemeWorkbench();
  renderAssetsWorkbench();
  renderAnalytics();
  renderTeamPanel();
  renderSubmissions();
  startAutoRefresh();
}

async function saveContent(meta = {}) {
  parseContentEditor();
  await api("/api/content", {
    method: "PUT",
    body: JSON.stringify({
      content: state.content,
      meta,
    }),
  });
  clearDraft("content");
  await refreshAll();
  refreshPreview();
  flashStatus(meta.reason === "reset-defaults" ? "Content reset to default" : "Content saved");
}

async function saveSettings(meta = {}) {
  applyBasicSettingsFields();
  parseSettingsEditor();
  await api("/api/settings", {
    method: "PUT",
    body: JSON.stringify({
      settings: state.settings,
      meta,
    }),
  });
  clearDraft("settings");
  await refreshAll();
  refreshPreview();
  flashStatus(meta.reason === "reset-defaults" ? "Theme reset to default" : "Theme saved");
}

async function resetContentToDefaults() {
  state.content = ensureContentEditingShape(cloneJson(state.defaults.content));
  syncContentDraft();
  await saveContent({ reason: "reset-defaults" });
}

async function resetSettingsToDefaults() {
  state.settings = ensureDesignSettings(cloneJson(state.defaults.settings));
  syncSettingsDraft();
  await saveSettings({ reason: "reset-defaults" });
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  refs.loginError.textContent = "";
  refs.loginSubmitBtn.disabled = true;
  refs.loginSubmitBtn.textContent = "Signing in...";

  try {
    const result = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: refs.loginUsername.value.trim(),
        password: refs.loginPassword.value,
      }),
    });
    persistSession(result.token, result.user);
    state.dashboardViewTracked = false;
    setAuthView("ready");
    await loadDashboard();
    refs.loginPassword.value = "";
  } catch (error) {
    refs.loginError.textContent = error.message.includes("Invalid username or password")
      ? "Invalid username or password."
      : "Login failed. Please try again.";
  } finally {
    refs.loginSubmitBtn.disabled = false;
    refs.loginSubmitBtn.textContent = "Login";
  }
}

async function handleLogout() {
  try {
    if (state.auth.token) {
      await api("/api/auth/logout", { method: "POST" });
    }
  } catch (error) {
    console.error(error);
  } finally {
    clearSession();
    setAuthView("locked");
    refs.loginError.textContent = "";
    refs.loginUsername.focus();
  }
}

async function handleCreateStaff(event) {
  event.preventDefault();
  refs.staffFormError.textContent = "";

  try {
    await api("/api/team/users", {
      method: "POST",
      body: JSON.stringify({
        displayName: refs.staffDisplayName.value.trim(),
        username: refs.staffUsername.value.trim(),
        password: refs.staffPassword.value,
      }),
    });
    refs.createStaffForm.reset();
    await loadDashboard();
    flashStatus("Staff account created");
  } catch (error) {
    refs.staffFormError.textContent = error.message.replaceAll('"', "");
  }
}

function bindEvents() {
  refs.loginForm.addEventListener("submit", handleLoginSubmit);
  refs.logoutBtn.addEventListener("click", handleLogout);
  refs.createStaffForm.addEventListener("submit", handleCreateStaff);
  refs.viewAllActivityBtn.addEventListener("click", () => {
    openActivityModal("All Activity", state.analytics?.activity || []);
  });
  refs.viewAllChangesBtn?.addEventListener("click", () => {
    openActivityModal("All Change History", state.analytics?.changeHistory || []);
  });
  refs.viewAllTeamHistoryBtn?.addEventListener("click", () => {
    openActivityModal("All Team History", state.teamOverview?.changeHistory || []);
  });
  refs.closeActivityModalBtn.addEventListener("click", closeActivityModal);
  refs.activityModal.addEventListener("click", (event) => {
    if (event.target === refs.activityModal) {
      closeActivityModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeActivityModal();
    }
  });

  document.getElementById("refreshAllBtn").addEventListener("click", loadDashboard);
  document.getElementById("refreshAnalyticsBtn").addEventListener("click", async () => {
    try {
      await refreshTelemetry();
      flashStatus("Analytics refreshed");
    } catch (error) {
      window.alert(`Analytics refresh failed: ${error.message}`);
    }
  });

  refs.previewPageSelect.addEventListener("change", (event) => {
    state.previewPath = event.target.value;
    refreshPreview();
  });
  refs.refreshPreviewBtn.addEventListener("click", refreshPreview);

  refs.contentEditor.addEventListener("input", () => {
    try {
      saveDraft("content", JSON.parse(refs.contentEditor.value));
    } catch {
      localStorage.setItem(getDraftKey("content"), refs.contentEditor.value);
    }
  });

  refs.settingsEditor.addEventListener("input", () => {
    try {
      saveDraft("settings", JSON.parse(refs.settingsEditor.value));
    } catch {
      localStorage.setItem(getDraftKey("settings"), refs.settingsEditor.value);
    }
  });

  document.getElementById("applyContentJsonBtn").addEventListener("click", () => {
    try {
      parseContentEditor();
      renderContentWorkbench();
      renderAssetsWorkbench();
      flashStatus("Content JSON applied");
    } catch (error) {
      window.alert(`Content JSON is invalid: ${error.message}`);
    }
  });

  document.getElementById("saveContentBtn").addEventListener("click", async () => {
    try {
      await saveContent({ source: "dashboard" });
    } catch (error) {
      window.alert(`Content save failed: ${error.message}`);
    }
  });

  document.getElementById("resetContentBtn").addEventListener("click", async () => {
    if (!window.confirm("Reset all website content to the default snapshot?")) return;
    try {
      await resetContentToDefaults();
    } catch (error) {
      window.alert(`Content reset failed: ${error.message}`);
    }
  });

  document.getElementById("applySettingsJsonBtn").addEventListener("click", () => {
    try {
      parseSettingsEditor();
      renderThemeWorkbench();
      flashStatus("Theme JSON applied");
    } catch (error) {
      window.alert(`Theme JSON is invalid: ${error.message}`);
    }
  });

  document.getElementById("saveSettingsBtn").addEventListener("click", async () => {
    try {
      await saveSettings({ source: "dashboard" });
    } catch (error) {
      window.alert(`Theme save failed: ${error.message}`);
    }
  });

  document.getElementById("resetSettingsBtn").addEventListener("click", async () => {
    if (!window.confirm("Reset all theme settings to the default snapshot?")) return;
    try {
      await resetSettingsToDefaults();
    } catch (error) {
      window.alert(`Theme reset failed: ${error.message}`);
    }
  });
}

async function loadDashboard() {
  if (!state.auth.token) return;

  try {
    setHealth(false, "Loading...");
    await refreshAll();
    setAuthView("ready");
    setHealth(true, "Backend online");
    refreshPreview();
    await trackDashboardViewOnce();
  } catch (error) {
    console.error(error);
    if (state.auth.token) {
      setHealth(false, "Dashboard load failed");
    }
  }
}

async function bootstrap() {
  bindEvents();
  updateSessionUI();

  const token = localStorage.getItem(AUTH_KEYS.token);
  const rawUser = localStorage.getItem(AUTH_KEYS.user);

  if (!token) {
    setAuthView("locked");
    refs.loginUsername.focus();
    return;
  }

  state.auth.token = token;
  if (rawUser) {
    try {
      state.auth.user = JSON.parse(rawUser);
    } catch {
      state.auth.user = null;
    }
  }

  try {
    const session = await api("/api/auth/session");
    persistSession(token, session.user);
    setAuthView("ready");
    await loadDashboard();
  } catch (error) {
    console.error(error);
    handleUnauthorized("Please sign in to access the dashboard.");
    refs.loginUsername.focus();
  }
}

bootstrap();

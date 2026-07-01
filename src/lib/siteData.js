import siteContent from "../../data/site-content.json";
import siteSettings from "../../data/site-settings.json";

export { siteContent, siteSettings };

export const getPageMeta = (pathname) =>
  siteContent.site.navigation.find((item) => item.path === pathname) ?? siteContent.site.navigation[0];

export const buildHeroUiWindows = (windows) =>
  windows.map(({ start, end }) => ({
    start,
    end: end == null ? Number.POSITIVE_INFINITY : end,
  }));

export const fillTemplate = (template, values) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value ?? ""),
    template
  );

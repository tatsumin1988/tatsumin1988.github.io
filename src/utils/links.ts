const BASE_URL = import.meta.env.BASE_URL;
const NORMALIZED_BASE = BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");

function normalizePath(value: string) {
  if (!value || value === "/") {
    return "/";
  }

  const ensuredLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return ensuredLeadingSlash.endsWith("/")
    ? ensuredLeadingSlash.slice(0, -1)
    : ensuredLeadingSlash;
}

export function withBase(path: string) {
  if (!path) {
    return BASE_URL;
  }

  if (
    /^(?:[a-z]+:)?\/\//i.test(path) ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const normalized = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  if (!NORMALIZED_BASE) {
    return normalized;
  }

  return normalized === "/" ? `${NORMALIZED_BASE}/` : `${NORMALIZED_BASE}${normalized}`;
}

export function stripBase(pathname: string) {
  if (!NORMALIZED_BASE || !pathname.startsWith(NORMALIZED_BASE)) {
    return pathname || "/";
  }

  const stripped = pathname.slice(NORMALIZED_BASE.length);
  return stripped || "/";
}

export function isActivePath(currentPathname: string, href: string) {
  const current = normalizePath(stripBase(currentPathname));
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export function toAbsoluteUrl(path: string, site: URL) {
  return new URL(withBase(path), site).toString();
}
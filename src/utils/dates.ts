const fullDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

const compactDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export function formatDate(date: Date) {
  return fullDateFormatter.format(date);
}

export function formatCompactDate(date: Date) {
  return compactDateFormatter.format(date);
}

export function compareDateDesc(left: Date, right: Date) {
  return right.valueOf() - left.valueOf();
}
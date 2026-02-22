export function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function makeExcerptFromHtml(html: string, len = 30) {
  const text = stripHtml(html).trim().replace(/\s+/g, " ");
  if (!text) return "";
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

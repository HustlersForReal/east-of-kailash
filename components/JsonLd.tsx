/**
 * Renders a JSON-LD block.
 *
 * JSON.stringify output is escaped so that a "<" inside any string value cannot
 * terminate the script element early. Without this, a stray angle bracket in
 * copy would silently break the structured data for that page.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
export function injectContent(template: string, html: string, initialState: unknown): string {
  return template
    .replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
    .replace(
      '</head>',
      `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script></head>`
    );
}
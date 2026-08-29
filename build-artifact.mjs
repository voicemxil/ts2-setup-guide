// One-off: stitch all guide pages into a single self-contained HTML page for artifact preview.
import { marked } from 'marked';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2];

function parseFrontmatter(src) {
  const meta = {};
  if (src.startsWith('---')) {
    const end = src.indexOf('\n---', 3);
    for (const line of src.slice(3, end).trim().split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    src = src.slice(end + 4);
  }
  return { meta, body: src };
}

const renderer = new marked.Renderer();
renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const id = text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9 -]/g, '').trim().replace(/\s+/g, '-');
  return `<h${depth} id="${id}"><a class="anchor" href="#${id}">#</a>${text}</h${depth}>\n`;
};
marked.use({ renderer });

function preprocess(md) {
  return md
    .replace(/^::: *track +(UC|Legacy|Disc)\n([\s\S]*?)^:::$/gm, (_, track, body) => {
      const labels = { UC: 'Ultimate Collection', Legacy: 'Legacy Collection', Disc: 'Discs / Retail' };
      return `<div class="track track-${track.toLowerCase()}"><div class="track-label">${labels[track]}</div>\n\n${body}\n</div>`;
    })
    .replace(/^::: *(note|warn|tip)\n([\s\S]*?)^:::$/gm, (_, kind, body) =>
      `<div class="callout callout-${kind}">\n\n${body}\n</div>`);
}

const pages = [];
for (const file of readdirSync(join(ROOT, 'content')).filter(f => f.endsWith('.md'))) {
  const { meta, body } = parseFrontmatter(readFileSync(join(ROOT, 'content', file), 'utf8'));
  pages.push({ slug: basename(file, '.md'), meta, body });
}
pages.sort((a, b) => Number(a.meta.order ?? 99) - Number(b.meta.order ?? 99));

const sections = pages.map(p => {
  let html = marked.parse(preprocess(p.body));
  // internal links -> in-page anchors
  html = html.replaceAll(/href="(?:\.\.\/)?([a-z-]+)\/#([a-z0-9-]+)"/g, 'href="#$2"');
  html = html.replaceAll(/href="(?:\.\.\/)?([a-z-]+)\/"/g, 'href="#page-$1"');
  return `<section class="page" id="page-${p.slug}">\n${html}\n</section>`;
}).join('\n<hr class="page-break">\n');

const toc = pages.map(p =>
  `<li><a href="#page-${p.slug}"><span class="nav-num">${p.meta.navnum ?? ''}</span>${p.meta.navtitle ?? p.meta.title}</a></li>`).join('\n');

const html = `<title>The Sims 2 Setup Guide</title>
<style>
:root {
  --bg: #0e1420; --bg-raised: #16202f; --bg-sunken: #0a0f18;
  --text: #dce6f2; --text-dim: #8fa1b8;
  --accent: #58d858; --link: #6cc4ff; --border: #24344a;
  --uc: #6cc4ff; --legacy: #ffb454; --disc: #c0a8f0; --warn: #ff7a6c;
  --radius: 10px;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --bg: #f4f7fb; --bg-raised: #ffffff; --bg-sunken: #e8edf4;
    --text: #1c2836; --text-dim: #5b6b7e;
    --accent: #2c9e3f; --link: #0b6fc2; --border: #d5dfeb;
    --uc: #0b6fc2; --legacy: #b26a00; --disc: #6b46a8; --warn: #c0392b;
  }
}
:root[data-theme="light"] {
  --bg: #f4f7fb; --bg-raised: #ffffff; --bg-sunken: #e8edf4;
  --text: #1c2836; --text-dim: #5b6b7e;
  --accent: #2c9e3f; --link: #0b6fc2; --border: #d5dfeb;
  --uc: #0b6fc2; --legacy: #b26a00; --disc: #6b46a8; --warn: #c0392b;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: "Segoe UI", system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
.layout { display: flex; max-width: 78rem; margin: 0 auto; }
.sidebar { width: 250px; flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; padding: 1.25rem 0; border-right: 1px solid var(--border); background: var(--bg-sunken); }
.brand { display: flex; align-items: center; gap: .6rem; padding: 0 1.25rem .9rem; color: var(--text); font-weight: 700; font-size: 1.05rem; line-height: 1.25; border-bottom: 1px solid var(--border); text-decoration: none; }
.brand em { color: var(--accent); font-style: normal; }
.plumbob { color: var(--accent); font-size: 1.6rem; transform: scaleY(1.4); display: inline-block; }
.sidebar ul { list-style: none; margin: .75rem 0 0; padding: 0; }
.sidebar li a { display: flex; align-items: baseline; gap: .55rem; padding: .45rem 1.25rem; color: var(--text-dim); text-decoration: none; font-size: .95rem; }
.sidebar li a:hover { color: var(--text); background: var(--bg-raised); }
.nav-num { font-size: .75rem; color: var(--text-dim); min-width: 1.1rem; font-variant-numeric: tabular-nums; }
.sidebar-footer { padding: .9rem 1.25rem 0; margin-top: .75rem; border-top: 1px solid var(--border); font-size: .8rem; color: var(--text-dim); }
.content { flex: 1; min-width: 0; max-width: 54rem; padding: 2.5rem 3rem 5rem; }
section.page { scroll-margin-top: 1rem; }
.page-break { border: none; border-top: 2px solid var(--border); margin: 3rem 0; }
h1 { font-size: 2rem; margin: 0 0 1rem; line-height: 1.2; text-wrap: balance; }
h2 { font-size: 1.35rem; margin-top: 2.2rem; padding-bottom: .35rem; border-bottom: 1px solid var(--border); }
h3 { font-size: 1.1rem; margin-top: 1.6rem; }
h1, h2, h3 { scroll-margin-top: 1rem; }
a { color: var(--link); }
.anchor { float: left; margin-left: -1.1em; width: 1.1em; opacity: 0; text-decoration: none; color: var(--accent); }
h1:hover .anchor, h2:hover .anchor, h3:hover .anchor { opacity: 1; }
code { background: var(--bg-sunken); border: 1px solid var(--border); border-radius: 4px; padding: .1em .35em; font-size: .88em; font-family: Consolas, "Cascadia Mono", monospace; }
pre { background: var(--bg-sunken); border: 1px solid var(--border); border-radius: var(--radius); padding: .9rem 1.1rem; overflow-x: auto; }
pre code { background: none; border: none; padding: 0; }
table { border-collapse: collapse; width: 100%; display: block; overflow-x: auto; }
th, td { border: 1px solid var(--border); padding: .45rem .7rem; text-align: left; }
th { background: var(--bg-sunken); }
blockquote { margin: 1rem 0; padding: .1rem 1.1rem; border-left: 3px solid var(--text-dim); background: var(--bg-raised); border-radius: 0 var(--radius) var(--radius) 0; color: var(--text-dim); }
.track { border: 1px solid var(--border); border-radius: var(--radius); padding: .4rem 1.2rem .8rem; margin: 1.2rem 0; background: var(--bg-raised); }
.track-label { display: inline-block; font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; padding: .15rem .6rem; border-radius: 999px; margin: .5rem 0 .2rem; }
.track-uc { border-left: 4px solid var(--uc); }
.track-uc .track-label { background: color-mix(in srgb, var(--uc) 18%, transparent); color: var(--uc); }
.track-legacy { border-left: 4px solid var(--legacy); }
.track-legacy .track-label { background: color-mix(in srgb, var(--legacy) 18%, transparent); color: var(--legacy); }
.track-disc { border-left: 4px solid var(--disc); }
.track-disc .track-label { background: color-mix(in srgb, var(--disc) 18%, transparent); color: var(--disc); }
.callout { border: 1px solid var(--border); border-radius: var(--radius); padding: .4rem 1.2rem; margin: 1.2rem 0; background: var(--bg-raised); }
.callout-note { border-left: 4px solid var(--link); }
.callout-tip { border-left: 4px solid var(--accent); }
.callout-warn { border-left: 4px solid var(--warn); }
@media (max-width: 860px) {
  .layout { flex-direction: column; }
  .sidebar { position: static; width: auto; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
  .content { padding: 1.5rem 1.25rem 4rem; }
}
</style>
<div class="layout">
  <aside class="sidebar">
    <a class="brand" href="#page-index"><span class="plumbob">â—†</span><span>The Sims 2<br><em>Setup Guide</em></span></a>
    <nav><ul>
${toc}
    </ul></nav>
    <div class="sidebar-footer">
      <p>by osab Â· not affiliated with EA</p>
      <p>Preview build â€” final site will be multi-page on GitHub Pages</p>
    </div>
  </aside>
  <main class="content">
${sections}
  </main>
</div>
`;

writeFileSync(OUT, html);
console.log('wrote', OUT);



// Static site builder for the TS2 Setup Guide.
// Reads content/*.md (with simple frontmatter), renders through site/template.html into dist/.
import { marked } from 'marked';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(ROOT, 'content');
const DIST = join(ROOT, 'dist');
const TEMPLATE = readFileSync(join(ROOT, 'site', 'template.html'), 'utf8');

function parseFrontmatter(src) {
  const meta = {};
  if (src.startsWith('---')) {
    const end = src.indexOf('\n---', 3);
    const block = src.slice(3, end).trim();
    for (const line of block.split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    src = src.slice(end + 4);
  }
  return { meta, body: src };
}

// Custom renderer: heading anchors for deep links
const renderer = new marked.Renderer();
renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const id = text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9 -]/g, '').trim().replace(/\s+/g, '-');
  return `<h${depth} id="${id}"><a class="anchor" href="#${id}">#</a>${text}</h${depth}>\n`;
};
marked.use({ renderer });

// ::: track UC / ::: track Legacy / ::: note / ::: warn  custom blocks
function preprocess(md) {
  return md
    .replace(/^::: *track +(UC|Legacy|Disc)\n([\s\S]*?)^:::$/gm, (_, track, body) => {
      const labels = { UC: 'Ultimate Collection', Legacy: 'Legacy Collection', Disc: 'Discs / Retail' };
      return `<div class="track track-${track.toLowerCase()}"><div class="track-label">${labels[track]}</div>\n\n${body}\n</div>`;
    })
    .replace(/^::: *(note|warn|tip)\n([\s\S]*?)^:::$/gm, (_, kind, body) =>
      `<div class="callout callout-${kind}">\n\n${body}\n</div>`);
}

if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

const pages = [];
for (const file of readdirSync(CONTENT).filter(f => f.endsWith('.md'))) {
  const { meta, body } = parseFrontmatter(readFileSync(join(CONTENT, file), 'utf8'));
  const slug = basename(file, '.md');
  pages.push({ slug, meta, body, out: slug === 'index' ? 'index.html' : `${slug}/index.html` });
}
pages.sort((a, b) => Number(a.meta.order ?? 99) - Number(b.meta.order ?? 99));

for (const page of pages) {
  const depth = page.out.split('/').length - 1;
  const rel = depth === 0 ? '.' : '..';
  const nav = pages.map(p => {
    const href = p.slug === 'index' ? `${rel}/` : `${rel}/${p.slug}/`;
    const cls = p.slug === page.slug ? ' class="active"' : '';
    return `<li><a href="${href}"${cls}><span class="nav-num">${p.meta.navnum ?? ''}</span>${p.meta.navtitle ?? p.meta.title}</a></li>`;
  }).join('\n');

  const SITE = 'The Sims 2 Setup Guide';
  const titleTag = page.meta.title === SITE ? SITE : `${page.meta.title} — ${SITE}`;
  const html = TEMPLATE
    .replaceAll('{{root}}', rel)
    .replaceAll('{{titletag}}', titleTag)
    .replaceAll('{{title}}', page.meta.title)
    .replaceAll('{{nav}}', nav)
    .replaceAll('{{content}}', marked.parse(preprocess(page.body)));

  const outPath = join(DIST, page.out);
  mkdirSync(join(DIST, page.out, '..'), { recursive: true });
  writeFileSync(outPath, html);
  console.log('built', page.out);
}

cpSync(join(ROOT, 'site', 'style.css'), join(DIST, 'style.css'));
if (existsSync(join(ROOT, 'static'))) cpSync(join(ROOT, 'static'), join(DIST, 'static'), { recursive: true });
console.log(`done: ${pages.length} pages`);

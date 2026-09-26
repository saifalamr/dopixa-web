# Dopixa Design System

## Direction

Warm, modern, premium, and approachable. Generous space, quiet editorial hierarchy, grounded business visuals, and small functional motion. Avoid generic SaaS gradients, dark hacker imagery, fake client dashboards, and decorative animation without a purpose.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#FAF7F2` | Warm page canvas |
| `--surface` | `#FFFFFF` | Cards and content surfaces |
| `--surface-soft` | `#F4F0E9` | Soft backgrounds |
| `--foreground` | `#13201C` | Main text |
| `--muted` | `#66736D` | Supporting text |
| `--border` | `#E6E1DA` | Dividers and outlines |
| `--primary` | `#0F3D32` | Brand anchor and primary actions |
| `--primary-hover` | `#174F41` | Primary action hover |
| `--secondary` | `#2E7D61` | Supporting emphasis |
| `--sage` | `#B7C9BE` | Soft green accents |
| `--accent` | `#FF7F5E` | Small warm highlights and focus |
| `--success` / `--warning` / `--danger` | semantic | Status and feedback |

Text and interactive controls use semantic roles rather than literal palette values wherever practical. Check contrast for every final color/background pairing before release.

## Type

Plus Jakarta Sans shapes Latin display headings; Inter is the Latin body/UI face; Noto Sans Arabic is used for Arabic body and headings. Fonts are loaded through `next/font` and emitted as optimized same-origin assets. Fallbacks include system Arabic-capable fonts. Turkish Latin Extended glyphs are included.

## Layout and components

The shared container is capped near 1200px with responsive 16–32px gutters. Spacing steps use multiples of 4/8, with large section spacing for the editorial feel. Corners use 10–26px radii. Shadows are reserved for floating navigation and small interface overlays. Buttons and form controls have visible focus, clear hover/disabled states, and touch targets larger than 44px.

Reusable elements live in `src/components`: site header/footer, page hero, section heading, buttons/links, solution cards, status badges, work cards, process steps, CTA panel, and contact form fields. CSS design tokens and breakpoint behavior live in `src/app/globals.css` to keep this first version dependency-light.

## RTL and responsive rules

Document direction follows the locale. Layout alignment, spacing, and directional icons use logical properties or explicit RTL adjustments. Navigation order, card content, and page reading order remain natural in Arabic. Layouts have dedicated mobile behavior at 760px and 430px, rather than shrinking the desktop composition. Test at 320px, 375px, 768px, 1024px, 1440px, with keyboard and text zoom before launch.

## Motion

Only short hover/focus transitions and gentle card movement are used. `prefers-reduced-motion` disables smooth scrolling and reduces transitions.

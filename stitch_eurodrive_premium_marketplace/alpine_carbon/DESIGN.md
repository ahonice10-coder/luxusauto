---
name: Alpine Carbon
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#004ced'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#676666'
  on-tertiary-container: '#e7e5e4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 64px
---

## Brand & Style
The design system embodies European automotive excellence—blending the precision of German engineering with the elegance of Italian styling. It is built for a high-end vehicle marketplace where the product is the hero. 

The aesthetic is **Modern Minimalist with a Dynamic Edge**. It utilizes a sophisticated "Dark Mode" foundation to evoke the feeling of a premium showroom at night. The interface relies on high-contrast visuals, generous whitespace (even in dark mode), and subtle glassmorphism to create a sense of depth and engineering quality. The emotional response should be one of absolute trust, high performance, and exclusivity.

## Colors
This design system utilizes a high-contrast palette optimized for luxury and legibility.

- **Primary (Electric Blue):** Used exclusively for high-priority actions, interactive states, and active indicators. It represents power and modern connectivity.
- **Deep Charcoal & Carbon:** The foundation of the UI. #1A1A1A serves as the primary background, while #262626 is used for elevated containers and cards.
- **Pure White:** Reserved for primary typography and essential icons to ensure maximum readability against the dark backdrop.
- **Accent Silver:** Used for secondary metadata and borders to provide a metallic, premium feel without distracting from the content.

## Typography
The typography strategy pairs **Hanken Grotesk** for headlines—providing a sharp, contemporary European feel—with **Inter** for body copy to ensure peak legibility across technical specifications.

- **Display & Headlines:** Use tight letter-spacing and bold weights to convey strength.
- **Labels:** Technical data (HP, 0-60 mph, Torque) should use **JetBrains Mono** to evoke an instrument-cluster aesthetic.
- **Hierarchy:** Maintain a clear distinction between editorial content (Hanken Grotesk) and functional data (Inter/JetBrains Mono).

## Layout & Spacing
The layout follows a **Fluid Grid** model with strict adherence to an 8px base unit. 

- **Desktop:** 12-column grid with wide 48px margins to give the high-resolution vehicle imagery "room to breathe."
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 16px margins.
- **Rhythm:** Use "stack-lg" (64px) between major sections to prevent a cluttered "classifieds" look. High-end sales rely on a curated, editorial flow.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional heavy shadows.

- **Level 1 (Surface):** The base #1A1A1A background.
- **Level 2 (Cards/Modules):** A semi-transparent #262626 with a subtle 1px border (#FFFFFF at 10% opacity) and a background blur of 12px.
- **Level 3 (Overlays/Modals):** Darker semi-transparent surfaces with a refined 20% opacity Electric Blue "glow" shadow (0px 20px 40px rgba(0, 82, 255, 0.15)) to create a focal point.
- **Transitions:** All elevation changes should be swift but smooth (200ms ease-out) to mimic the responsiveness of a modern vehicle's UI.

## Shapes
The shape language uses **Medium Roundedness** (Level 2) to strike a balance between professional rigidity and modern softness.

- **Primary Containers:** 0.5rem (8px) base radius for standard cards.
- **Featured Elements:** Large product cards use 1rem (16px) to appear more inviting and tactile.
- **Interactive Elements:** Buttons and input fields maintain 0.5rem to look precise and "clicky."
- **Iconography:** Use 2px stroke widths with slightly rounded caps to match the font geometry.

## Components
- **Buttons:** Primary buttons are Solid Electric Blue with white text. Secondary buttons are "Ghost" style with a 1px Silver border. Hover states should feature a subtle inner glow.
- **Vehicle Cards:** Feature a glassmorphic footer for specs. The image should occupy the top 70% of the card with no padding, allowing the vehicle silhouette to dominate.
- **Inputs:** Dark backgrounds (#121212) with a 1px border that turns Electric Blue on focus. Labels should use the JetBrains Mono "Label-caps" style.
- **Chips/Badges:** Small, high-contrast pills (e.g., "New Arrival" or "Reserved") using a black background with Electric Blue text.
- **Navigation:** A sticky top bar with 60% background blur to allow vehicle images to scroll underneath smoothly.
- **Data Grids:** For technical specs, use a clean 2-column list with thin #262626 dividers and JetBrains Mono for the values.
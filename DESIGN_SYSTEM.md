# VocabMaster Design System

This document outlines the design system for the VocabMaster platform, ensuring visual consistency and accessibility across the application.

## Typography

### Font Families

- **Primary Font (Latin characters)**: Inter
  - A modern, highly readable sans-serif font optimized for screens
  - Available on Google Fonts with various weights
  
- **Primary Font (Chinese characters)**: Noto Sans SC
  - Excellent readability for Chinese characters
  - Designed to work harmoniously with Inter
  - Available on Google Fonts

### Font Sizes

Using TailwindCSS's default scale:

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)
- **6xl**: 3.75rem (60px)

### Font Weights

Aligned with TailwindCSS defaults:

- **thin**: 100
- **extralight**: 200
- **light**: 300
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700
- **extrabold**: 800
- **black**: 900

### Line Heights

Aligned with TailwindCSS defaults:

- **none**: 1 (tight, for headings)
- **tight**: 1.25
- **snug**: 1.375
- **normal**: 1.5 (body text)
- **relaxed**: 1.625
- **loose**: 2 (for Chinese text blocks)

## Color Palette

### Primary Colors

- **Primary**: `#4F46E5` (Indigo-600 in Tailwind)
  - 50: `#EEF2FF`
  - 100: `#E0E7FF`
  - 200: `#C7D2FE`
  - 300: `#A5B4FC`
  - 400: `#818CF8`
  - 500: `#6366F1`
  - 600: `#4F46E5` (Default)
  - 700: `#4338CA`
  - 800: `#3730A3`
  - 900: `#312E81`
  - 950: `#1E1B4B`

### Secondary Colors

- **Secondary**: `#06B6D4` (Cyan-600 in Tailwind)
  - 50: `#ECFEFF`
  - 100: `#CFFAFE`
  - 200: `#A5F3FC`
  - 300: `#67E8F9`
  - 400: `#22D3EE`
  - 500: `#06B6D4`
  - 600: `#0891B2`
  - 700: `#0E7490`
  - 800: `#155E75`
  - 900: `#164E63`
  - 950: `#083344`

### Neutral Colors

Using Tailwind's Gray scale:

- **Gray-50**: `#F9FAFB`
- **Gray-100**: `#F3F4F6`
- **Gray-200**: `#E5E7EB`
- **Gray-300**: `#D1D5DB`
- **Gray-400**: `#9CA3AF`
- **Gray-500**: `#6B7280`
- **Gray-600**: `#4B5563`
- **Gray-700**: `#374151`
- **Gray-800**: `#1F2937`
- **Gray-900**: `#111827`
- **Gray-950**: `#030712`

### Semantic Colors

Using Tailwind's color palette:

- **Success**: `#10B981` (Emerald-500)
  - Light: `#D1FAE5` (Emerald-100)
- **Warning**: `#F59E0B` (Amber-500)
  - Light: `#FEF3C7` (Amber-100)
- **Error**: `#EF4444` (Red-500)
  - Light: `#FEE2E2` (Red-100)
- **Info**: `#3B82F6` (Blue-500)
  - Light: `#DBEAFE` (Blue-100)

### Accessibility Considerations

- All color combinations meet WCAG 2.1 AA standard (contrast ratio of at least 4.5:1 for normal text and 3:1 for large text)
- Dark mode alternatives maintain these contrast ratios

## Spacing System

Using TailwindCSS's default spacing scale (mobile-first):

- **0**: 0px
- **px**: 1px
- **0.5**: 0.125rem (2px)
- **1**: 0.25rem (4px)
- **1.5**: 0.375rem (6px)
- **2**: 0.5rem (8px)
- **2.5**: 0.625rem (10px)
- **3**: 0.75rem (12px)
- **3.5**: 0.875rem (14px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)
- **32**: 8rem (128px)

## Border Radius

Using TailwindCSS defaults:

- **none**: 0
- **sm**: 0.125rem (2px)
- **DEFAULT**: 0.25rem (4px)
- **md**: 0.375rem (6px)
- **lg**: 0.5rem (8px)
- **xl**: 0.75rem (12px)
- **2xl**: 1rem (16px)
- **3xl**: 1.5rem (24px)
- **full**: 9999px (for pills, badges)

## Shadows

Using TailwindCSS defaults:

- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **DEFAULT**: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- **xl**: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
- **2xl**: `0 25px 50px -12px rgb(0 0 0 / 0.25)`

## Transitions

Using TailwindCSS defaults:

- **DEFAULT**: 150ms
- **fast**: 100ms
- **normal**: 200ms
- **slow**: 300ms
- **slower**: 500ms
- **timing-function**: cubic-bezier(0.4, 0, 0.2, 1)

## Z-Index Scale

Using TailwindCSS defaults:

- **0**: 0
- **10**: 10
- **20**: 20
- **30**: 30
- **40**: 40
- **50**: 50
- **auto**: auto

## Component Styles

### Buttons

#### Primary Button
- Background: Primary-600
- Text: White
- Padding: px-4 py-2
- Border Radius: rounded-md
- Hover: Primary-700
- Active: Primary-800
- Disabled: Gray-300 with Gray-500 text

#### Secondary Button
- Background: White
- Border: 1px solid Primary-600
- Text: Primary-600
- Padding: px-4 py-2
- Border Radius: rounded-md
- Hover: Primary-50 background
- Active: Primary-100
- Disabled: Gray-200 with Gray-400 text and border

#### Text Button
- Background: Transparent
- Text: Primary-600
- Padding: px-3 py-1.5
- Hover: Primary-50 background
- Active: Primary-100
- Disabled: Gray-400 text

### Form Elements

#### Text Input
- Border: 1px solid Gray-300
- Border Radius: rounded-md
- Background: White
- Text: Gray-900
- Padding: px-4 py-2
- Focus: Primary-600 border, ring-2 ring-primary-100
- Disabled: Gray-100 background, Gray-400 text
- Error: Error-500 border, Error-50 background

#### Checkbox & Radio
- Size: h-4 w-4
- Border: 1px solid Gray-300
- Checked Background: Primary-600
- Checked Border: Primary-600
- Focus: ring-2 ring-primary-200

#### Select
- Similar to Text Input
- Custom dropdown indicator using Primary-600

### Cards

- Background: White
- Border: 1px solid Gray-200
- Border Radius: rounded-lg
- Padding: p-4 md:p-6
- Shadow: shadow-sm to shadow-md (contextual)

### Alerts

#### Success Alert
- Background: Success-50
- Border: 1px solid Success-500
- Icon: Success-500
- Text: Success-900

Similar patterns for Warning, Error, and Info alerts.

## Icons

- **Style**: Outlined with 1.5px stroke weight, consistent corner radius
- **Sizes** (aligned with TailwindCSS):
  - sm: 1rem (16px)
  - md: 1.25rem (20px)
  - lg: 1.5rem (24px)
  - xl: 2rem (32px)
- **Color**: Inherited from text color or specifically defined
- **Recommended Library**: [Heroicons](https://heroicons.com/) (already optimized for TailwindCSS)

## Dark Mode

Using Tailwind's dark mode with `class` strategy:

- **Primary Dark**: Primary-400 (brighter to maintain visibility)
- **Background**: Gray-900
- **Surface**: Gray-800
- **Text Primary**: Gray-100
- **Text Secondary**: Gray-300

## Responsive Breakpoints

Using TailwindCSS defaults with mobile-first approach:

- **sm**: 640px (tablet)
- **md**: 768px (small laptop)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large desktop)

This means all base styles are for mobile, and media queries are used to define styles for larger screens.

Example:
```html
<div class="text-sm sm:text-base md:text-lg lg:text-xl">
  This text is small on mobile, and gets progressively larger on bigger screens.
</div>
```

## Accessibility Guidelines

- All interactive elements have focused states
- Color is not the only means of conveying information
- Proper heading hierarchy
- Appropriate alt text for images
- ARIA attributes where necessary
- Keyboard navigation support
- Support for screen readers

## Design System Compliance Rules

To ensure consistent adherence to the design system, all components must follow these rules:

1. **No Custom Values**: Never use arbitrary values for spacing, colors, typography, etc. Always use the predefined values from this design system.

2. **Component Extension**: When extending components, maintain the base styling guidelines. Extensions should be approved by the design team.

3. **Tailwind Classes Only**: Avoid using custom CSS where possible. Use Tailwind's utility classes to implement the design system.

4. **Consistent Naming**: Follow naming conventions for components and variants. Component names should be descriptive and follow PascalCase format.

5. **Responsive Implementation**: Always implement mobile-first, then add responsive variants using Tailwind's breakpoint prefixes.

6. **Documentation**: Document any new components or variants in the design system documentation.

7. **Accessibility Compliance**: New components must meet all accessibility requirements defined in this document.

8. **Visual Regression Testing**: All design system changes should be validated with visual regression tests.

9. **Regular Audits**: The codebase will be audited regularly to ensure compliance with the design system.

10. **Performance Considerations**: Components should be optimized for performance, especially when displayed on mobile devices.

## Internationalization Text Rules

All text in the application must be internationalized using the following guidelines:

1. **No Hardcoded Strings**: Never hardcode text strings directly in components. Always use translation keys.

2. **Text Component**: Use the `T` component for all text in the application:

```tsx
// Example of the T component
import { useTranslation } from 'react-i18next';
import React, { PropsWithChildren } from 'react';

type TProps = PropsWithChildren<{
  keyName: string;
  values?: Record<string, any>;
  ns?: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}>;

export const T = ({ 
  keyName, 
  values, 
  ns = 'common', 
  className = '', 
  tag: Tag = 'span',
  children
}: TProps) => {
  const { t } = useTranslation(ns);
  
  // If children are provided, they serve as fallback
  return (
    <Tag className={className}>
      {t(keyName, values) || children}
    </Tag>
  );
};
```

3. **Translation Key Structure**: Use dot notation for translation keys, with the format `page.section.element`.

4. **Translation File Organization**:
   - Organize translation files by namespace
   - Keep translation keys consistent across languages
   - Use nested objects for better organization

5. **Variables in Translations**: Pass variables to the translation function using the values prop.

6. **Pluralization**: Use i18next's pluralization features for content that changes based on count.

7. **Context-Aware Translations**: Use context when the same phrase might be translated differently in different contexts.

8. **HTML in Translations**: Use React components instead of HTML in translations whenever possible.

9. **Translation Testing**: Include translation testing in your test suite to ensure all text is properly internationalized.

10. **Translation Fallback**: Always provide fallback text (using children prop) for cases where translations might be missing.

### Translation Key Examples

```json
// en/common.json
{
  "nav": {
    "home": "Home",
    "dashboard": "Dashboard",
    "vocabulary": "Vocabulary",
    "tests": "Tests"
  },
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  }
}

// zh/common.json
{
  "nav": {
    "home": "首页",
    "dashboard": "仪表板",
    "vocabulary": "词汇",
    "tests": "测试"
  },
  "buttons": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑"
  }
}
```

### Usage Examples

```jsx
// Button with translated text
<Button>
  <T keyName="buttons.save" />
</Button>

// Heading with fallback
<h1 className="text-2xl font-bold">
  <T keyName="page.title">Vocabulary Test</T>
</h1>

// Text with variables
<p>
  <T 
    keyName="test.score" 
    values={{ score: 85, total: 100 }} 
  >
    You scored 85 out of 100
  </T>
</p>

// Different HTML tag
<T 
  keyName="dashboard.welcome" 
  tag="h2" 
  className="text-xl font-semibold"
>
  Welcome to your dashboard
</T>
```

## TailwindCSS Integration

The design system will be implemented using TailwindCSS with a custom configuration that extends the default theme:

```js
// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable 'class' strategy for dark mode
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.cyan,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
        info: colors.blue,
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

## CSS Custom Properties

For values that need to be accessed in JavaScript or for complex components:

```css
:root {
  --color-primary: #4F46E5;
  --color-primary-hover: #4338CA;
  --color-primary-active: #3730A3;
  --color-primary-light: #E0E7FF;
  
  --transition-fast: 100ms;
  --transition-normal: 200ms;
  --transition-slow: 300ms;
  
  /* Other custom properties... */
}

.dark {
  --color-primary: #818CF8;
  --color-background: #111827;
  --color-surface: #1F2937;
  /* Other dark mode custom properties... */
}
```

## Usage Examples

### Typography Example (Mobile-First)

```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
  <T keyName="home.hero.title">Responsive Heading</T>
</h1>
<p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
  <T keyName="home.hero.description">
    This is body text that scales with screen size.
  </T>
</p>
```

### Button Example

```jsx
<button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 active:bg-primary-800 transition-colors duration-normal">
  <T keyName="buttons.primary">Primary Button</T>
</button>
```

### Card Example

```jsx
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 shadow-sm">
  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
    <T keyName="cards.example.title">Card Title</T>
  </h2>
  <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
    <T keyName="cards.example.content">Card content goes here.</T>
  </p>
</div>
```

---

This design system will be continuously refined as the application evolves. 
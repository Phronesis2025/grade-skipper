# Grade Skipper - Directory Structure

## Application Structure

```
grade-skipper/
├── app/
│   ├── analytics/
│   │   └── page.tsx
│   ├── reading-log/
│   │   └── page.tsx
│   ├── subject/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── results/
│   │       │   └── page.tsx
│   │       └── quiz/
│   │           ├── [grade]/
│   │           │   └── page.tsx
│   │           └── challenge/
│   │               └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   └── CustomLink.tsx
├── lib/
│   ├── questions/
│   │   ├── coding-ai.ts
│   │   ├── english.ts
│   │   ├── history.ts
│   │   ├── logic-puzzles.ts
│   │   ├── mathematics.ts
│   │   ├── reading.ts
│   │   └── science.ts
│   ├── storage.ts
│   ├── types.ts
│   └── utils.ts
├── public/
│   ├── icons/
│   │   ├── coding-ai.svg
│   │   ├── english.svg
│   │   ├── history.svg
│   │   ├── logic-puzzles.svg
│   │   ├── math.svg
│   │   ├── reading.svg
│   │   └── science.svg
│   ├── amelia.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── placeholder.png
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   ├── dist/
│   │   └── generateQuestions.js
│   └── generateQuestions.ts
└── styles/
    └── tailwind.css
```

## Configuration Files

- next.config.js
- package.json
- tailwind.config.ts
- tsconfig.json
- .env.local

## Key Project Updates (April 2025)

1. Added new routes:

   - `/subject/[id]/page.tsx` - Grade selection page
   - `/subject/[id]/quiz/[grade]/page.tsx` - Quiz page
   - `/subject/[id]/results/page.tsx` - Results page

2. Added new components:

   - `CustomLink.tsx` - Custom link component with scroll-to-top functionality

3. Completed core user journey:

   - Subject selection (homepage)
   - Grade level selection
   - Quiz taking
   - Results viewing

4. All pages now have consistent styling:
   - White card UI with subtle shadows
   - Responsive design with no scrollbars on desktop
   - Consistent button styling with #4361ee color
   - Proper navigation between pages

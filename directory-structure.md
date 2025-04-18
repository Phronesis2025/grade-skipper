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
│   │   └── [subject]/
│   │       ├── page.tsx
│   │       └── quiz/
│   │           ├── [topic]/
│   │           │   └── page.tsx
│   │           └── challenge/
│   │               └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── layout/
│       └── Navbar.tsx
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

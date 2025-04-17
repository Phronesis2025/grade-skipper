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
│   ├── storage.ts
│   ├── types.ts
│   └── utils.ts
├── public/
│   ├── icons/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── styles/
    └── tailwind.css
```

## Configuration Files

- next.config.js
- package.json
- tailwind.config.ts
- tsconfig.json

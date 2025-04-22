# Grade Skipper - Directory Structure

## Application Structure

```
grade-skipper/
├── app/
│   ├── analytics/
│   │   └── page.tsx
│   ├── api/
│   │   └── questions/
│   │       └── route.ts
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
│   ├── favicon.svg
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── icons/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── ui/
│   ├── Accordion.tsx
│   ├── CalculatorModal.tsx
│   ├── ConfirmationModal.tsx
│   ├── CustomLink.tsx
│   ├── HintModal.tsx
│   ├── ProgressBar.tsx
│   └── QuizCard.tsx
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
│   ├── subjects.ts
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
│   ├── favicon.svg
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

- next.config.ts
- package.json
- tailwind.config.ts
- tsconfig.json
- postcss.config.mjs
- eslint.config.mjs
- components.json
- .env.local

## Key Project Updates (April 2025)

1. Added new components:

   - `Accordion.tsx` - Collapsible content component with answer status visualization
   - `CalculatorModal.tsx` - Modal for calculator functionality
   - `ConfirmationModal.tsx` - Modal for user confirmations
   - `HintModal.tsx` - Modal for displaying hints
   - `ProgressBar.tsx` - Progress tracking component
   - `QuizCard.tsx` - Card component for quiz display

2. Enhanced core functionality:

   - Added API routes for question generation and management
   - Improved subject management with `subjects.ts`
   - Enhanced storage capabilities with `storage.ts`
   - Added calculator and hint features for quiz assistance
   - Implemented question validation and correction logic

3. UI/UX Improvements:

   - Consistent modal components for various interactions
   - Progress tracking for quizzes
   - Enhanced quiz card design
   - Improved navigation and layout components
   - Added visual feedback for quiz answers (green/red shading)
   - Updated favicon to SVG format

4. Development Tools:
   - Added ESLint configuration
   - Enhanced TypeScript configuration
   - Improved PostCSS setup
   - Added component configuration for UI library integration
   - Implemented proper error handling and logging

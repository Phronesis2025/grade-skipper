# Grade Skipper - Directory Structure

## Application Structure

```
grade-skipper/
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   └── Charts.tsx
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
│   ├── LoadingAnimation.tsx
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
│   ├── supabase.ts
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

- next.config.js - Next.js configuration
- next.config.ts - TypeScript configuration for Next.js
- package.json - Project dependencies and scripts
- package-lock.json - Lock file for dependencies
- tailwind.config.ts - Tailwind CSS configuration
- tsconfig.json - TypeScript configuration
- postcss.config.mjs - PostCSS configuration
- eslint.config.mjs - ESLint configuration
- .eslintrc.json - Additional ESLint rules
- components.json - UI component configuration
- .env.local - Environment variables
- .gitignore - Git ignore rules
- next-env.d.ts - Next.js TypeScript declarations

## Documentation Files

- README.md - Project overview and setup instructions
- directory-structure.md - This file
- PRD.txt - Product Requirements Document
- GradeSkipper Comprehensive PRD.txt - Detailed product requirements
- General Purpose and User Flow.txt - User flow documentation
- Additional Clarifying questions.txt - Project clarification notes
- improvement_ideas.txt - Future improvement suggestions
- supabase-schema.txt - Database schema documentation

## Key Project Updates (April 2024)

1. Enhanced Core Functionality:

   - Improved Supabase integration for data persistence
   - Added unique ID generation for quiz records
   - Enhanced quiz completion tracking
   - Improved error handling and logging
   - Added fallback to local storage for offline support

2. Database and Storage:

   - Added Supabase schema documentation
   - Improved data consistency with unique IDs
   - Enhanced quiz tracking and metrics
   - Added event logging system

3. Development Tools:

   - Added comprehensive ESLint configuration
   - Enhanced TypeScript type definitions
   - Improved build and development configurations
   - Added debugging tools and logging

4. Documentation:
   - Updated directory structure
   - Added comprehensive PRD
   - Enhanced technical documentation
   - Added database schema documentation

## Development Guidelines

1. File Organization:

   - Keep related components in the same directory
   - Use TypeScript for all new files
   - Follow Next.js 13+ app directory structure
   - Maintain consistent naming conventions

2. Code Style:

   - Follow ESLint configuration
   - Use TypeScript for type safety
   - Document complex functions and components
   - Maintain consistent formatting

3. Testing:

   - Add unit tests for new components
   - Test database operations thoroughly
   - Verify offline functionality
   - Test error handling scenarios

4. Documentation:
   - Update documentation with new features
   - Document database schema changes
   - Keep README up to date
   - Document API endpoints

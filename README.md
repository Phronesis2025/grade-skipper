# Grade Skipper

A modern educational platform built with Next.js 14, TypeScript, and Tailwind CSS that helps students accelerate their learning through interactive quizzes and customized learning paths.

## Features

- **Subject-based Learning**: Explore various subjects including Mathematics, Science, Reading, and more
- **Grade-Level Selection**: Choose appropriate grade levels for each subject
- **Interactive Quizzes**: Test your knowledge with topic-specific quizzes
- **Progress Tracking**: Monitor your learning achievements with quiz results
- **Responsive Design**: Optimized for desktop and mobile devices
- **Consistent UI**: Clean, modern interface with intuitive navigation

## Completed User Journey

The application now features a complete core user journey:

1. **Subject Selection** (Homepage): Browse and select from various subjects
2. **Grade-Level Selection**: Choose an appropriate grade level for the selected subject
3. **Quiz Experience**: Answer questions with a clean, distraction-free interface
4. **Results Page**: View your quiz performance with score and percentage

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Local Storage for data persistence (ready to connect to backend)
- Google Fonts (Inter)
- Lucide Icons for visual elements

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/grade-skipper.git
cd grade-skipper
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
grade-skipper/
├── app/
│   ├── analytics/       # Future analytics dashboard
│   ├── reading-log/     # Reading log feature
│   ├── subject/         # Subject-related pages
│   │   └── [id]/        # Dynamic routes for each subject
│   │       ├── page.tsx               # Grade selection page
│   │       ├── results/               # Quiz results page
│   │       │   └── page.tsx
│   │       └── quiz/                  # Quiz pages
│   │           ├── [grade]/           # Grade-specific quizzes
│   │           │   └── page.tsx
│   │           └── challenge/         # Challenge quizzes (future)
│   │               └── page.tsx
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with Navbar
│   └── page.tsx         # Homepage
├── components/          # Reusable components
│   ├── layout/          # Layout components
│   │   └── Navbar.tsx   # Navigation component
│   └── CustomLink.tsx   # Custom navigation component
├── lib/                 # Utility functions and data
│   ├── questions/       # Subject-specific question data
│   ├── storage.ts       # Local storage utilities
│   └── types.ts         # TypeScript type definitions
├── public/              # Static assets
│   └── icons/           # Subject icons
└── styles/              # Additional style files
```

## Current Implementation

- **Homepage**: Displays learning statistics, subject cards, and recommended next steps
- **Subject Pages**: Shows grade selection options with appropriate UI
- **Quiz Pages**: Presents questions with multiple-choice answers
- **Results Pages**: Displays quiz scores with options to retry or return home
- **Navigation**: Smooth scrolling between pages with consistent UI elements

## Next Steps (Roadmap)

1. **Phase 4: Dynamic Data Integration**

   - Replace static quiz data with dynamic content
   - Implement quiz scoring and results storage
   - Update progress tracking on the homepage

2. **Enhanced Quiz Functionality**

   - Multiple question types
   - Difficulty progression
   - Timed quizzes

3. **User Authentication**

   - User profiles and login
   - Progress syncing across devices

4. **Analytics Dashboard**
   - Visualizations of learning progress
   - Performance metrics and insights

## Deployment

The application is ready for deployment on Vercel:

1. Push the project to a GitHub repository.
2. Go to https://vercel.com, sign in, and click "New Project".
3. Import the `grade-skipper` repository.
4. Configure the project with:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Click "Deploy".

## License

This project is licensed under the MIT License - see the LICENSE file for details.

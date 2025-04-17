# Grade Skipper

A modern educational platform built with Next.js 14, TypeScript, and Tailwind CSS that helps students accelerate their learning through interactive quizzes and customized learning paths.

## Features

- **Subject-based Learning**: Explore various subjects and topics
- **Interactive Quizzes**: Test your knowledge with topic-specific quizzes
- **Challenge Quizzes**: Advanced tests for each subject
- **Progress Tracking**: Monitor your learning achievements
- **Reading Log**: Track your educational reading

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Local Storage for data persistence (ready to connect to backend)
- Google Fonts (Inter)
- Ready for ShadCN UI integration

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
├── app/                 # Next.js App Router pages
│   ├── (pages)/         # All page routes
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout component
├── components/          # Reusable components
│   └── layout/          # Layout components
├── lib/                 # Utility functions and hooks
├── public/              # Static assets
│   └── icons/           # Subject icons
└── styles/              # Additional style files
```

## Deployment

To deploy on Vercel:

1. Push the project to a GitHub repository.
2. Go to https://vercel.com, sign in, and click "New Project".
3. Import the `grade-skipper` repository.
4. Configure the project with:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Click "Deploy".

## Future Enhancements

- User authentication system
- Backend API integration
- AI-powered quiz generation
- Personalized learning paths
- Gamification elements
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

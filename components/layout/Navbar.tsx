import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Grade Skipper
            </Link>
          </div>
          <div className="ml-10 flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/analytics"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-cyan-400 transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/reading-log"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-cyan-400 transition-colors"
            >
              Reading Log
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white">

      {/* Background decorative image */}
      <Image
        src="/resume-genius-9si2noVCVH8-unsplash.jpg"
        alt="background pattern"
        fill
        className="object-cover opacity-15 pointer-events-none -z-0"
      />

      {/* Top Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/logo-transparent-png.png" width={300} height={40} alt="Logo" />
        </div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Empower Your Career with AI
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl">
          🚀 Build standout resumes, practice AI-powered mock interviews, and get smart job suggestions tailored to your profile.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 cursor-default">
          <div className="bg-white p-6 rounded-xl shadow-md w-72">
            <h3 className="text-xl font-semibold mb-2">📄 Resume Builder</h3>
            <p className="text-sm text-gray-600">Create professional resumes in minutes with AI-backed formatting and tips.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md w-72">
            <h3 className="text-xl font-semibold mb-2">🎤 Mock Interviews</h3>
            <p className="text-sm text-gray-600">Practice with AI to improve your confidence and get real-time feedback.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md w-72">
            <h3 className="text-xl font-semibold mb-2">💼 Job Suggestions</h3>
            <p className="text-sm text-gray-600">Get personalized job recommendations based on your skills and goals.</p>
          </div>
        </div>

        <Link href="/mockinterview">
          <Button className="text-lg px-6 py-3">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
import { Nav } from "@/components/nav";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Team() {
  return (
    <main>
      <Nav />
      <div className="min-h-screen pt-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4 mt-12">
              Our Team
            </h1>
            <p className="text-lg text-gray-500 font-light">
              Meet the people behind MindMap AI
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <Image
                  src="/images/sarthakjpfp.jpg"
                  alt="Sarthak Jain"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Sarthak Jain
              </h2>
              <p className="text-gray-600 mb-4">
                Backend Developer | AI/ML Engineer
              </p>
              <p className="text-gray-600 mb-6">
                IIT Madras BS in Data Science Programme
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="https://github.com/sarthak-wiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href="https://x.com/sarthxk20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

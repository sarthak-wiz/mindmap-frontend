import { Nav } from "@/components/nav";

export default function About() {
  return (
    <main>
      <Nav />
      <div className="min-h-screen pt-20 px-4 bg-white overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4 mt-12">
              About MindMap AI
            </h1>
            <p className="text-lg text-gray-500 font-light">
              Transforming complex ideas into clear visual representations
            </p>
          </div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MindMap AI was created with a simple but powerful goal: to help
                people visualize and understand complex information more
                effectively. We believe that visual learning is one of the most
                powerful ways to grasp new concepts, and we&apos;re leveraging
                cutting-edge AI technology to make this process seamless and
                intuitive.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                How It Works
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our platform uses advanced artificial intelligence to analyze
                your input and create comprehensive mind maps that highlight key
                concepts and their relationships. Whether you&apos;re studying,
                planning a project, or trying to explain complex ideas, MindMap
                AI helps you create clear, organized visual representations in
                seconds.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Why Choose Us
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    AI-Powered Insights
                  </h3>
                  <p className="text-gray-600">
                    Our AI engine understands context and relationships,
                    creating meaningful connections in your mind maps.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Easy to Use
                  </h3>
                  <p className="text-gray-600">
                    Simply input your topic or paste your content, and let our
                    AI do the heavy lifting.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

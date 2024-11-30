"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export function Hero() {
  const [topic, setTopic] = useState("");
  const [animatedText, setAnimatedText] = useState("your ideas");
  const [addLinks, setAddLinks] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Load settings from local storage on component mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('mindmapSettings');
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setAddLinks(parsedSettings.addLinks);
      console.log("parsedSettings", parsedSettings);
    }
  }, []);

  // Save settings to local storage whenever addLinks changes
  //useEffect(() => {
    //const currentSettings = { addLinks };
    //localStorage.setItem('mindmapSettings', JSON.stringify(currentSettings));
  //}, [addLinks]);

  const texts = useMemo(() => [
    "your ideas",
    "your learning roadmap",
    "difficult concepts",
    "complex problems",
    "project plans",
  ], []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setAnimatedText(texts[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [texts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const encodedTopic = encodeURIComponent(topic);

    if (isSignedIn) {
      router.push(`/dashboard?topic=${encodedTopic}&addLinks=${addLinks}`);
    } else {
      localStorage.setItem("pendingTopic", encodedTopic);
      localStorage.setItem("pendingAddLinks", JSON.stringify(addLinks));
      router.push("/auth/sign-up");
    }
  };

  const handleAddLinksToggle = (checked: boolean) => {
    setAddLinks(checked);
    const currentSettings = { "addLinks":checked };
    localStorage.setItem('mindmapSettings', JSON.stringify(currentSettings));
    console.log("checked", checked)
  };

  const suggestionPrompts = [
    "I want to learn Python programming from scratch, including basic syntax, data types, and control structures",
    "Guide me through modern web development concepts including HTML, CSS, JavaScript, and popular frameworks",
    "Help me understand fundamental data structures and algorithms with practical examples",
    "The heart pumps blood through the pulmonary circulation: right ventricle -> pulmonary artery -> lungs -> pulmonary veins -> left atrium",
    "The nitrogen cycle: atmospheric nitrogen is fixed by bacteria, converted to nitrates, used by plants, and returned to atmosphere",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <Image
        src="/images/bg.png"
        alt="Background"
        quality={100}
        fill
        className="z-0 absolute inset-0 w-full h-full object-cover"
      />
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Main heading section */}
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
            Visualize
            <br />
            <div className="h-[1.2em] relative overflow-hidden inline-block w-full">
              <div className="fade-edges absolute inset-0 z-10 pointer-events-none" />
              <span
                key={animatedText}
                className="absolute inset-0 w-full block animate-slide-up"
                style={{ animationFillMode: "forwards" }}
              >
                {animatedText}
              </span>
            </div>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Transform your thoughts into stunning mind maps with AI
          </p>
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto mt-6 sm:mt-8 outline-none"
        >
          <div className="relative group">
            <Input
              type="text"
              placeholder="Enter a topic or paste content"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-12 bg-white sm:h-14 px-4 sm:px-6 text-xs sm:text-sm md:text-base lg:text-lg rounded-full focus:outline-none focus:ring-0 focus:border-none"
            />
            <Button
              type="submit"
              className="absolute right-2 top-2 h-8 sm:h-10 px-4 sm:px-6 rounded-full 
                       bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
            >
              Generate
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <Switch
              className="data-[state=unchecked]:bg-gray-400"
              id="add-links"
              checked={addLinks}
              onCheckedChange={handleAddLinksToggle}
            />
            <label htmlFor="add-links" className="ml-2 text-sm text-gray-600">
              Have links in mindmap
            </label>
          </div>
        </form>

        {/* Suggestion chips in Mac Pro-like hexagonal shape */}
        <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Try these examples
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {suggestionPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setTopic(prompt)}
                className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 bg-white
                           rounded-full border border-gray-200 hover:border-gray-300 
                           hover:bg-gray-50 transition-all flex items-center gap-2 
                           font-light"
              >
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  {prompt}
                </span>
                <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useSearchParams } from "next/navigation";
import { MindmapGenerator } from "@/components/dashboard/mindmap-generator";

interface MindmapGeneratorClientProps {
  initialToken: string;
}

export function MindmapGeneratorClient({ initialToken }: MindmapGeneratorClientProps) {
  const searchParams = useSearchParams();
  const addLinks = searchParams.get("addLinks") === "true";

  return <MindmapGenerator initialToken={initialToken} addLinks={addLinks} />;
}
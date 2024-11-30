"use client";

import { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Download } from "lucide-react";

const transformer = new Transformer();

export function Markmapper({ content }: { content: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap>();

  useEffect(() => {
    if (svgRef.current && content) {
      const { root } = transformer.transform(content);

      if (!mmRef.current) {
        mmRef.current = Markmap.create(svgRef.current);
      }

      mmRef.current.setData(root);
      mmRef.current.fit();
    }
  }, [content]);

  const handleDownload = () => {
    const svgElement = svgRef.current;

    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "mindmap.svg"; // Set the file name for download
      link.click();

      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={handleDownload}
        className="absolute top-2 right-2 p-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center"
        title="Download Mindmap SVG"
      >
        <Download className="h-4 w-4" />
        <span className="hidden md:inline"></span>
      </button>
      <svg ref={svgRef} className="w-full h-[500px]" />
    </div>
  );
}

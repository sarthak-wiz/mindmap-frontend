"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { fetchGraphQL, queries } from "@/lib/graphql";
import { Markmapper } from "@/components/mindmap/markmapper";
import { Paperclip, Loader2, X } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface MindmapGeneratorProps {
  initialToken: string;
  addLinks: boolean;
}

export function MindmapGenerator({ initialToken }: MindmapGeneratorProps) {
  const [userPrompt, setUserPrompt] = useState("");
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mindmapContent, setMindmapContent] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [addLinks, setAddLinks] = useState(false);
  const searchParams = useSearchParams();

  // Load settings from local storage
  useEffect(() => {
    const storedSettings = localStorage.getItem("mindmapSettings");
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setAddLinks(parsedSettings.addLinks);
    }
  }, []);

  const handleGenerateMindmap = useCallback(async () => {
    if (!initialToken) return;

    // Combine PDF text (if exists) with user prompt
    const combinedText = pdfText
      ? `PDF Content: ${pdfText}\n\nUser Prompt: ${userPrompt}`
      : userPrompt;

    if (!combinedText.trim()) return;

    setLoading(true);
    try {
      const finalPrompt = addLinks
        ? `${combinedText} make subnodes hyperlink with docs/free books/blogs/wikipedia`
        : combinedText;

      const result = await fetchGraphQL(
        queries.GENERATE_MINDMAP,
        {
          userAsk: finalPrompt,
        },
        initialToken
      );

      if (result.data?.generateMindmap?.content) {
        setMindmapContent(result.data.generateMindmap.content);
      }
    } catch (error) {
      console.error("Error generating mindmap:", error);
    } finally {
      setLoading(false);
    }
  }, [initialToken, addLinks, pdfText, userPrompt]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 2 * 1024 * 1024
    ) {
      try {
        const text = await extractTextFromPDF(file);
        setPdfText(text);
        setUploadedFileName(file.name);
      } catch (error) {
        console.error("Error extracting PDF text:", error);
        alert("Error processing PDF file.");
      }
    } else {
      alert("Please upload a valid PDF file (max 2MB).");
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;
  };

  const removePdfFile = () => {
    setPdfText(null);
    setUploadedFileName(null);
  };

  useEffect(() => {
    const topicParam = searchParams.get("topic");
    if (topicParam) {
      setUserPrompt(decodeURIComponent(topicParam));
      handleGenerateMindmap();
    }
  }, [searchParams, handleGenerateMindmap]);

  //const handleSettingsChange = (settings: { addLinks: boolean }) => {
  // setAddLinks(settings.addLinks);
  //};

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Generate Mind Map</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="relative">
          <Textarea
            placeholder="Enter additional context or prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full pr-24 py-3 pl-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            rows={3}
          />
          <label
            htmlFor="file-upload"
            className="absolute right-4 top-3 flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700"
            title="Attach PDF, max 1 file, 2MB"
          >
            <Paperclip className="h-4 w-4" />
            <span className="text-sm">Attach PDF</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {uploadedFileName && (
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <span className="text-sm truncate max-w-[80%]">
              {uploadedFileName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removePdfFile}
              className="hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button
          onClick={handleGenerateMindmap}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-md"
          disabled={loading || (!userPrompt.trim() && !pdfText)}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </div>
          ) : (
            "Generate Mind Map"
          )}
        </Button>
      </div>

      {mindmapContent && (
        <div className="mt-8 border rounded-lg p-4 bg-white min-h-[500px]">
          <Markmapper content={mindmapContent} />
        </div>
      )}
    </div>
  );
}

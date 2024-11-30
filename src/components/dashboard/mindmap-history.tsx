"use client";

import { useState, useEffect } from "react";
import { fetchGraphQL, queries } from "@/lib/graphql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Markmapper } from "@/components/mindmap/markmapper";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface MindmapHistoryProps {
  initialToken: string;
}

interface Mindmap {
  id: string;
  content: string;
  created_at: number;
  clerk_user_id: string;
}

export function MindmapHistory({ initialToken }: MindmapHistoryProps) {
  const [mindmaps, setMindmaps] = useState<Mindmap[]>([]);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMindmaps = async () => {
      if (!initialToken) return;
      try {
        const result = await fetchGraphQL(
          queries.GET_MY_MINDMAPS,
          {},
          initialToken
        );
        if (result.data?.myMindmaps) {
          setMindmaps(result.data.myMindmaps);
        }
      } catch (error) {
        console.error("Error fetching mindmaps:", error);
      }
    };

    fetchMindmaps();
  }, [initialToken]);

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFirstHeading = (content: string) => {
    const match = content.match(/^# (.*?)$/m);
    return match ? match[1] : "Untitled Mindmap";
  };

  return (
    <div className="grid gap-6">
      {mindmaps.map((mindmap) => (
        <Card key={mindmap.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">
                  {getFirstHeading(mindmap.content)}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {format(new Date(mindmap.created_at), "PPpp")}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(mindmap.id)}
                className="ml-2"
              >
                {expandedMap[mindmap.id] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent
            className={cn(
              "transition-all duration-300 ease-in-out",
              expandedMap[mindmap.id]
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            )}
          >
            <div className="pt-4">
              <Markmapper content={mindmap.content} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

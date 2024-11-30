"use client";

import { useState, useEffect } from "react";
import { fetchGraphQL, queries } from "@/lib/graphql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface MindmapSettingsProps {
  initialToken: string;
  onSettingsChange?: (settings: Settings) => void;
}

interface Settings {
  addLinks: boolean;
}

export function MindmapSettings({ 
  initialToken, 
  onSettingsChange 
}: MindmapSettingsProps) {
  const [settings, setSettings] = useState<Settings>({ addLinks: false });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch settings from local storage or backend when the component loads
  useEffect(() => {
    const fetchSettings = async () => {
      if (!initialToken) return;
      setLoading(true);
      try {
        // First, check local storage
        const storedSettings = localStorage.getItem('mindmapSettings');
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          setSettings(parsedSettings);
          onSettingsChange?.(parsedSettings);
          return;
        }

        // If no local storage, fetch from backend
        const result = await fetchGraphQL(
          queries.GET_MINDMAP_SETTINGS,
          {},
          initialToken
        );

        const fetchedSettings = result.data?.mindmapSettings || { addLinks: false };
        
        // Save to local storage and update state
        localStorage.setItem('mindmapSettings', JSON.stringify(fetchedSettings));
        setSettings(fetchedSettings);
        onSettingsChange?.(fetchedSettings);
      } catch (error) {
        console.error("Error fetching mindmap settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [initialToken, onSettingsChange]);

  // Save the current settings to backend and local storage
  const handleSaveSettings = async () => {
    if (!initialToken) return;
    setLoading(true);
    try {
      // Save to backend
      await fetchGraphQL(
        queries.UPDATE_MINDMAP_SETTINGS,
        { settings },
        initialToken
      );

      // Save to local storage
      localStorage.setItem('mindmapSettings', JSON.stringify(settings));

      // Trigger settings change callback
      onSettingsChange?.(settings);

      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle the `addLinks` setting
  const handleToggleAddLinks = () => {
    const updatedSettings = { ...settings, addLinks: !settings.addLinks };
    setSettings(updatedSettings);
  };

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl">Mindmap Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading settings...</p>
          ) : (
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Switch
                    id="add-links"
                    checked={settings.addLinks}
                    onCheckedChange={handleToggleAddLinks}
                  />
                  <label
                    htmlFor="add-links"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Enable links in mindmap
                  </label>
                </div>
              </div>
              <Button
                onClick={handleSaveSettings}
                className="mt-4 bg-gray-900 hover:bg-gray-800 text-white"
                disabled={loading}
              >
                Save Settings
              </Button>
              {successMessage && (
                <p className="mt-2 text-green-600">{successMessage}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
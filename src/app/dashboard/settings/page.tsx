import { auth } from "@clerk/nextjs/server";
import { MindmapSettings } from "@/components/dashboard/mindmap-settings";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-8">
      <MindmapSettings initialToken={token || ""} />
    </div>
  );
}
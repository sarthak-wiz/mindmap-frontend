import { auth } from "@clerk/nextjs/server";
import { MindmapHistory } from "@/components/dashboard/mindmap-history";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <MindmapHistory initialToken={token || ""} />
    </div>
  );
}

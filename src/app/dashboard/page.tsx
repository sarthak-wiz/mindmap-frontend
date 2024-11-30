import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MindmapGeneratorClient } from "./client";

export default async function DashboardPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-8">
      <MindmapGeneratorClient initialToken={token} />
    </div>
  );
}

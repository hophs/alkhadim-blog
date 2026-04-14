import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/AdminSidebar";
import { SessionProvider } from "@/components/SessionProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if setup is needed
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    redirect("/admin/setup");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto min-w-0">
          <div className="p-4 pt-16 sm:p-6 md:p-8 md:pt-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}

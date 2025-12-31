"use client";
import { useRouter } from "next/navigation";


export default function Sidebar() {
  const router = useRouter();

  function goHome() {
    router.push("/");
  }
  return (
    <aside className="hidden h-screen w-48 border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
      <div className="px-4 py-6">
        <h2 className="text-sm font-semibold text-gray-900">Analytics</h2>
      </div>

      <nav className="px-2">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
        >
<button
  onClick={goHome}
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
>
  <span className="h-2 w-2 rounded-full bg-gray-400" />
  Overview
</button>
        </a>
      </nav>
    </aside>
  );
}

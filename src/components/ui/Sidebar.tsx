"use client";
import { useRouter } from "next/navigation";


export default function Sidebar() {
  const router = useRouter();

  function goHome() {
    router.push("/");
  }
  return (
    <aside className="hidden h-screen w-48 border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:flex-col justify-between">
      <div>
        <div className="px-4 py-6">
          <h2 className="text-sm font-semibold text-gray-900">Analytics</h2>
        </div>

        <nav className="px-2">
          <button
            onClick={goHome}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            Home
          </button>
        </nav>
      </div>

      <div className="px-2 py-4 space-y-1">
        <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </div>
        <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          User
        </div>
      </div>
    </aside>
  );
}

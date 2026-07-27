import React from "react";

interface SkeletonProps {
  className?: string;
  darkMode?: boolean;
}

export function SkeletonCard({ darkMode: dm }: SkeletonProps) {
  const cardBg = dm ? "#161B2E" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#F0F0F0";
  const shimmer = dm ? "bg-slate-800" : "bg-slate-200";

  return (
    <div
      className="rounded-2xl p-5 border flex flex-col justify-between animate-pulse"
      style={{ backgroundColor: cardBg, borderColor: border }}
    >
      <div>
        <div className={`h-40 rounded-xl mb-4 ${shimmer}`} />
        <div className={`h-4 rounded w-1/4 mb-3 ${shimmer}`} />
        <div className={`h-5 rounded w-3/4 mb-2 ${shimmer}`} />
        <div className={`h-4 rounded w-1/2 mb-4 ${shimmer}`} />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/10">
        <div className={`h-4 rounded w-1/3 ${shimmer}`} />
        <div className={`h-8 rounded-lg w-24 ${shimmer}`} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, darkMode: dm }: { count?: number; darkMode?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} darkMode={dm} />
      ))}
    </div>
  );
}

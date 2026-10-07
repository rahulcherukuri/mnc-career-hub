"use client";

import {
  ExternalLink,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Company } from "@/data/companies";
import { useEffect, useState } from "react";

type Props = {
  company: Company;
};

export default function CareerCard({ company }: Props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favoriteCompanies") || "[]"
    );

    setFavorite(saved.includes(company.id));
  }, [company.id]);

  function toggleFavorite() {
    const saved = JSON.parse(
      localStorage.getItem("favoriteCompanies") || "[]"
    );

    let updated: string[];

    if (saved.includes(company.id)) {
      updated = saved.filter((id: string) => id !== company.id);
    } else {
      updated = [...saved, company.id];
    }

    localStorage.setItem(
      "favoriteCompanies",
      JSON.stringify(updated)
    );

    setFavorite(!favorite);
  }

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={toggleFavorite}
        className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800"
        aria-label="Favorite company"
      >
        <Heart
          size={19}
          fill={favorite ? "currentColor" : "none"}
          className={favorite ? "text-red-500" : ""}
        />
      </button>

      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {company.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="pr-8">
          <h2 className="font-bold text-slate-900 dark:text-white">
            {company.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {company.category}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {company.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
        <MapPin size={17} className="mt-0.5 shrink-0" />

        <span>
          {company.locations.slice(0, 3).join(" • ")}
        </span>
      </div>

      {company.priority === "Top" && (
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={15} />
          Strong match for AI/ML profiles
        </div>
      )}

      <div className="mt-auto">
        <a
          href={company.careersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Visit Career Portal
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}

"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
};

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
}: Props) {
  return (
    <div className="mb-8 grid gap-3 md:grid-cols-[1fr_200px_200px]">
      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, AI, GenAI, Azure..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      >
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Consulting">Consulting</option>
        <option value="IT Services">IT Services</option>
        <option value="Engineering">Engineering</option>
        <option value="Healthcare Technology">
          Healthcare Technology
        </option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      >
        <option value="All">All Locations</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Pune">Pune</option>
        <option value="Chennai">Chennai</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Gurugram">Gurugram</option>
        <option value="Noida">Noida</option>
      </select>
    </div>
  );
}

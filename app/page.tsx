"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Heart,
  MapPin,
  Moon,
  Search,
  Sparkles,
  Sun,
  Target,
} from "lucide-react";
import { companies as rawCompanies } from "@/data/companies";

type CompanyLike = Record<string, any>;

const companies = rawCompanies as CompanyLike[];

function value(company: CompanyLike, ...keys: string[]) {
  for (const key of keys) {
    if (company[key] !== undefined && company[key] !== null) {
      return company[key];
    }
  }
  return undefined;
}

function stringArray(input: any): string[] {
  if (Array.isArray(input)) return input.map(String);
  if (typeof input === "string") {
    return input
      .split(/[|,•]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
}

function getName(company: CompanyLike) {
  return String(value(company, "name", "company", "title") || "Company");
}

function getCategory(company: CompanyLike) {
  return String(value(company, "category", "industry", "type") || "Technology");
}

function getLocations(company: CompanyLike) {
  return stringArray(
    value(company, "locations", "location", "cities", "preferredLocations")
  );
}

function getTags(company: CompanyLike) {
  return stringArray(
    value(company, "tags", "skills", "technologies", "tech")
  );
}

function getUrl(company: CompanyLike) {
  return String(
    value(company, "careerUrl", "careersUrl", "url", "career", "link") || "#"
  );
}

function isAiCompany(company: CompanyLike) {
  const text = [
    getName(company),
    getCategory(company),
    ...getTags(company),
  ]
    .join(" ")
    .toLowerCase();

  return [
    "ai",
    "artificial intelligence",
    "machine learning",
    "genai",
    "cloud",
    "data",
    "software",
    "technology",
  ].some((x) => text.includes(x));
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("mnc-favorites");
    const savedTheme = localStorage.getItem("mnc-theme");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mnc-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mnc-theme", "light");
    }
  }

  function toggleFavorite(name: string) {
    const next = favorites.includes(name)
      ? favorites.filter((x) => x !== name)
      : [...favorites, name];

    setFavorites(next);
    localStorage.setItem("mnc-favorites", JSON.stringify(next));
  }

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(companies.map(getCategory))).sort(),
    ];
  }, []);

  const locations = useMemo(() => {
    const all = companies.flatMap(getLocations);
    return ["All", ...Array.from(new Set(all)).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return companies.filter((company) => {
      const name = getName(company);
      const cat = getCategory(company);
      const locs = getLocations(company);
      const tags = getTags(company);

      const searchable = [
        name,
        cat,
        ...locs,
        ...tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !q || searchable.includes(q);
      const matchesCategory = category === "All" || cat === category;
      const matchesLocation =
        location === "All" ||
        locs.some((x) => x.toLowerCase().includes(location.toLowerCase()));

      return matchesQuery && matchesCategory && matchesLocation;
    });
  }, [query, category, location]);

  const aiCount = companies.filter(isAiCompany).length;

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">
              <BriefcaseBusiness />
            </div>

            <div>
              <div className="brand-name">MNC Career Hub</div>
              <div className="brand-subtitle">
                Official career portals
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Built for ambitious tech professionals
              </div>

              <h1>
                Find your next
                <br />
                <span className="gradient-text">career opportunity.</span>
              </h1>

              <p className="hero-description">
                Discover official career portals from leading MNCs.
                Search companies, explore AI and technology opportunities,
                and apply directly through the official company website.
              </p>

              <div className="hero-search">
                <Search className="hero-search-icon" size={20} />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search companies, AI, GenAI, Python, Azure..."
                />

                <button
                  onClick={() =>
                    document
                      .getElementById("career-portals")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore
                </button>
              </div>
            </div>

            <div className="stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Building2 size={18} />
                </div>
                <div className="stat-value">{companies.length}+</div>
                <div className="stat-label">MNCs listed</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Sparkles size={18} />
                </div>
                <div className="stat-value">{aiCount}</div>
                <div className="stat-label">AI & Tech targets</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <MapPin size={18} />
                </div>
                <div className="stat-value">
                  {companies.filter((c) =>
                    getLocations(c)
                      .join(" ")
                      .toLowerCase()
                      .includes("hyderabad")
                  ).length}
                </div>
                <div className="stat-label">Hyderabad opportunities</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Target size={18} />
                </div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Official portals</div>
              </div>
            </div>
          </div>
        </section>

        <section className="content" id="career-portals">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2 className="section-title">Career portals</h2>
                <p className="section-description">
                  Apply directly through official company career websites.
                </p>
              </div>

              <div className="result-count">
                Showing <strong>{filtered.length}</strong> companies
              </div>
            </div>

            <div className="filter-panel">
              <div className="filters">
                <div className="filter-search">
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search company or technology"
                  />
                </div>

                <div className="select-wrapper">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item === "All" ? "All categories" : item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select-wrapper">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {locations.map((item) => (
                      <option key={item} value={item}>
                        {item === "All" ? "All locations" : item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="category-row">
                {categories.slice(0, 8).map((item) => (
                  <button
                    key={item}
                    className={`category-chip ${
                      category === item ? "active" : ""
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="company-grid">
                {filtered.map((company, index) => {
                  const name = getName(company);
                  const categoryName = getCategory(company);
                  const tags = getTags(company).slice(0, 5);
                  const locs = getLocations(company).slice(0, 4);
                  const url = getUrl(company);
                  const favorite = favorites.includes(name);

                  return (
                    <article className="company-card" key={`${name}-${index}`}>
                      <div className="card-top">
                        <div className="company-identity">
                          <div className="company-logo">
                            {initials(name)}
                          </div>

                          <div>
                            <h3 className="company-name">{name}</h3>
                            <div className="company-category">
                              {categoryName}
                            </div>
                          </div>
                        </div>

                        <button
                          className={`favorite ${
                            favorite ? "active" : ""
                          }`}
                          onClick={() => toggleFavorite(name)}
                          aria-label="Favorite company"
                        >
                          <Heart
                            size={17}
                            fill={favorite ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <p className="company-description">
                        Explore open positions, technology roles and career
                        opportunities at {name}.
                      </p>

                      <div className="tags">
                        {tags.length > 0 ? (
                          tags.map((tag) => (
                            <span className="tag" key={tag}>
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="tag">Technology</span>
                        )}
                      </div>

                      <div className="card-bottom">
                        <div className="locations">
                          <MapPin size={13} />

                          <span>
                            {locs.length > 0
                              ? locs.join(" • ")
                              : "India"}
                          </span>
                        </div>

                        <a
                          className="career-button"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View official careers
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <Search size={22} />
                </div>

                <h3>No companies found</h3>

                <p>
                  Try a different company, technology or location.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © 2026 MNC Career Hub
          </span>

          <span>
            Official career portals • Built for job seekers
          </span>
        </div>
      </footer>
    </div>
  );
}

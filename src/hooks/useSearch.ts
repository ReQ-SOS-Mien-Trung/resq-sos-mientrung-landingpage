import { useState, useEffect, useCallback } from "react";
import {
  searchData,
  groupSearchResults,
  type SearchItem,
} from "@/constants/searchData";

export interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  groupedResults: ReturnType<typeof groupSearchResults>;
  isLoading: boolean;
  hasResults: boolean;
  clearSearch: () => void;
}

// Normalize Vietnamese text for better search matching
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

// Fuzzy search scoring function
const getSearchScore = (item: SearchItem, query: string): number => {
  const normalizedQuery = normalizeText(query);
  const normalizedTitle = normalizeText(item.title);
  const normalizedDescription = normalizeText(item.description);
  const normalizedKeywords = item.keywords.map(normalizeText);

  let score = 0;

  // Exact match in title (highest priority)
  if (normalizedTitle.includes(normalizedQuery)) {
    score += 100;
    // Bonus for starting with query
    if (normalizedTitle.startsWith(normalizedQuery)) {
      score += 50;
    }
  }

  // Match in description
  if (normalizedDescription.includes(normalizedQuery)) {
    score += 50;
  }

  // Match in keywords
  for (const keyword of normalizedKeywords) {
    if (keyword.includes(normalizedQuery)) {
      score += 30;
    }
    if (keyword === normalizedQuery) {
      score += 20; // Exact keyword match bonus
    }
  }

  // Priority boost by type
  if (item.type === "page") score += 10;
  if (item.type === "feature") score += 5;

  return score;
};

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate slight delay for UX (debounce effect)
    const timeoutId = setTimeout(() => {
      const scoredResults = searchData
        .map((item) => ({
          item,
          score: getSearchScore(item, query.trim()),
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);

      setResults(scoredResults);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  const groupedResults = groupSearchResults(results);
  const hasResults = results.length > 0;

  return {
    query,
    setQuery,
    results,
    groupedResults,
    isLoading,
    hasResults,
    clearSearch,
  };
}

export default useSearch;

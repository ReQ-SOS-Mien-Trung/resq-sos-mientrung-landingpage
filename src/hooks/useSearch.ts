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

// Check if all query words are found in the text
const matchAllWords = (text: string, queryWords: string[]): boolean => {
  const normalizedText = normalizeText(text);
  return queryWords.every(word => normalizedText.includes(word));
};

// Improved search scoring function - requires all words to match
const getSearchScore = (item: SearchItem, query: string): number => {
  const normalizedQuery = normalizeText(query.trim());
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
  
  // If query is too short (less than 2 chars), don't search
  if (normalizedQuery.length < 2) return 0;
  
  const normalizedTitle = normalizeText(item.title);
  const normalizedKeywords = item.keywords.map(normalizeText);

  let score = 0;
  
  // Check if title matches all query words
  const titleMatchesAll = matchAllWords(item.title, queryWords);
  
  // Check if any keyword matches the full query
  const keywordExactMatch = normalizedKeywords.some(kw => 
    kw.includes(normalizedQuery) || normalizedQuery.includes(kw)
  );
  
  // Check if description matches all query words
  const descMatchesAll = matchAllWords(item.description, queryWords);

  // Title contains the exact query phrase (highest priority)
  if (normalizedTitle.includes(normalizedQuery)) {
    score += 150;
    if (normalizedTitle.startsWith(normalizedQuery)) {
      score += 50;
    }
  } 
  // Title matches all individual words
  else if (titleMatchesAll) {
    score += 100;
  }

  // Exact keyword match
  if (keywordExactMatch) {
    score += 80;
  }

  // Description matches (lower priority)
  if (descMatchesAll && score === 0) {
    score += 30;
  }

  // Priority boost by type
  if (score > 0) {
    if (item.type === "page") score += 10;
    if (item.type === "feature") score += 5;
  }

  return score;
};

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Simulate slight delay for UX (debounce effect)
    const timeoutId = setTimeout(() => {
      // Don't search if query is too short
      if (trimmedQuery.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      const scoredResults = searchData
        .map((item) => ({
          item,
          score: getSearchScore(item, trimmedQuery),
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8) // Limit to top 8 results
        .map(({ item }) => item);

      setResults(scoredResults);
      setIsLoading(false);
    }, 200);

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

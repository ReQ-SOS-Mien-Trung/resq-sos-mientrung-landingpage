import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { typeLabels, type SearchItem } from "@/constants/searchData";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const prevPathnameRef = useRef(location.pathname);

  const {
    query,
    setQuery,
    results,
    groupedResults,
    isLoading,
    hasResults,
    clearSearch,
  } = useSearch();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset selected index when query changes
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(-1);
  }, [setQuery]);

  // Close on route change
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      onClose();
      clearSearch();
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, onClose, clearSearch]);

  // Handle navigation to search result
  const handleNavigate = useCallback(
    (item: SearchItem) => {
      if (item.path) {
        if (item.sectionId) {
          // Navigate to page first, then scroll to section
          if (location.pathname !== item.path) {
            navigate(item.path);
            setTimeout(() => {
              const element = document.getElementById(item.sectionId!);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 300);
          } else {
            const element = document.getElementById(item.sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        } else {
          navigate(item.path);
        }
      }
      clearSearch();
      onClose();
    },
    [navigate, location.pathname, onClose, clearSearch],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        clearSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      } else if (
        e.key === "Enter" &&
        selectedIndex >= 0 &&
        results[selectedIndex]
      ) {
        e.preventDefault();
        handleNavigate(results[selectedIndex]);
      }
    },
    [onClose, clearSearch, results, selectedIndex, handleNavigate],
  );

  // Render a group of results
  const renderResultGroup = (
    title: string,
    items: SearchItem[],
    startIndex: number,
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-3 px-4">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((item, idx) => {
            const globalIndex = startIndex + idx;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => handleNavigate(item)}
                onMouseEnter={() => setSelectedIndex(globalIndex)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors group ${
                  selectedIndex === globalIndex
                    ? "bg-black text-white"
                    : "hover:bg-black/5"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedIndex === globalIndex
                      ? "bg-white/20"
                      : "bg-black/5 group-hover:bg-black/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      selectedIndex === globalIndex
                        ? "text-white"
                        : "text-black/60"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-semibold truncate ${
                      selectedIndex === globalIndex
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {item.title}
                  </div>
                  <div
                    className={`text-xs truncate ${
                      selectedIndex === globalIndex
                        ? "text-white/70"
                        : "text-black/50"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
                <div
                  className={`text-[10px] font-medium uppercase px-2 py-1 rounded ${
                    selectedIndex === globalIndex
                      ? "bg-white/20 text-white"
                      : "bg-black/5 text-black/40"
                  }`}
                >
                  {typeLabels[item.type]}
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    selectedIndex === globalIndex
                      ? "text-white translate-x-0"
                      : "text-black/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  // Calculate start indices for each group
  let currentIndex = 0;
  const groupIndices = {
    pages: currentIndex,
    sections: (currentIndex += groupedResults.pages.length),
    features: (currentIndex += groupedResults.sections.length),
    faqs: (currentIndex += groupedResults.features.length),
    news: (currentIndex += groupedResults.faqs.length),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={() => {
              onClose();
              clearSearch();
            }}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 lg:left-16 right-0 z-[60] bg-white shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Search Header */}
            <div className="border-b border-black/10 px-4 lg:px-8">
              <div className="flex items-center gap-4 h-16 lg:h-20">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-black/40 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 text-black/40" />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tìm kiếm trang, tính năng, câu hỏi..."
                  className="flex-1 text-base lg:text-lg font-medium text-black placeholder:text-black/30 outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="p-2 text-black/40 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    onClose();
                    clearSearch();
                  }}
                  className="p-2 text-black/40 hover:text-black transition-colors lg:ml-4"
                >
                  <span className="text-xs font-medium uppercase tracking-wider hidden sm:block">
                    ESC
                  </span>
                  <X className="w-5 h-5 sm:hidden" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto py-4">
              {!query.trim() ? (
                // Empty state - suggestions
                <div className="px-4 lg:px-8 py-8">
                  <p className="text-sm text-black/40 mb-6">Tìm kiếm nhanh</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tải ứng dụng",
                      "Đăng ký cứu hộ",
                      "SOS",
                      "Tình nguyện viên",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="px-4 py-2 text-sm font-medium text-black/70 bg-black/5 rounded-full hover:bg-black hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : hasResults ? (
                // Results
                <div className="lg:px-4">
                  {renderResultGroup(
                    "Trang",
                    groupedResults.pages,
                    groupIndices.pages,
                  )}
                  {renderResultGroup(
                    "Mục",
                    groupedResults.sections,
                    groupIndices.sections,
                  )}
                  {renderResultGroup(
                    "Tính năng",
                    groupedResults.features,
                    groupIndices.features,
                  )}
                  {renderResultGroup(
                    "Câu hỏi thường gặp",
                    groupedResults.faqs,
                    groupIndices.faqs,
                  )}
                  {renderResultGroup(
                    "Tin tức",
                    groupedResults.news,
                    groupIndices.news,
                  )}
                </div>
              ) : (
                // No results
                <div className="px-4 lg:px-8 py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
                    <Search className="w-8 h-8 text-black/30" />
                  </div>
                  <p className="text-lg font-semibold text-black/70 mb-2">
                    Không tìm thấy kết quả
                  </p>
                  <p className="text-sm text-black/40">
                    Thử tìm kiếm với từ khóa khác như "ứng dụng", "cứu hộ",
                    "đăng ký"
                  </p>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-black/10 px-4 lg:px-8 py-3 hidden lg:flex items-center gap-6 text-xs text-black/40">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-black/5 rounded text-[10px] font-mono">
                  ↑↓
                </kbd>
                <span>Di chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-black/5 rounded text-[10px] font-mono">
                  Enter
                </kbd>
                <span>Chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-black/5 rounded text-[10px] font-mono">
                  Esc
                </kbd>
                <span>Đóng</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;

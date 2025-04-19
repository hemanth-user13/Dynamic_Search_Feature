import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import ContentDisplay from "./ContentDisplay";
import { useContent } from "../context/ContentContext";

const SearchableContent: React.FC = () => {
  const { content } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const [totalMatches, setTotalMatches] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  console.log("content is", content);

  // Reset match index when search term changes
  useEffect(() => {
    if (searchTerm.length > 0) {
      setCurrentMatchIndex(0);
    } else {
      setCurrentMatchIndex(-1);
    }
  }, [searchTerm]);

  // Handle search term changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Update total matches count
  const handleMatchesCount = (count: number) => {
    setTotalMatches(count);
    if (count === 0) {
      setCurrentMatchIndex(-1);
    } else if (currentMatchIndex >= count) {
      setCurrentMatchIndex(0);
    } else if (currentMatchIndex < 0 && count > 0) {
      setCurrentMatchIndex(0);
    }
  };

  // Navigate to next match
  const handleNextMatch = () => {
    if (totalMatches > 0) {
      setCurrentMatchIndex((prevIndex) =>
        prevIndex + 1 >= totalMatches ? 0 : prevIndex + 1
      );
    }
  };

  // Navigate to previous match
  const handlePrevMatch = () => {
    if (totalMatches > 0) {
      setCurrentMatchIndex((prevIndex) =>
        prevIndex - 1 < 0 ? totalMatches - 1 : prevIndex - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchTerm && (e.key === "Enter" || e.key === "ArrowDown")) {
        if (e.shiftKey) {
          handlePrevMatch();
        } else {
          handleNextMatch();
        }
        e.preventDefault();
      } else if (searchTerm && e.key === "ArrowUp") {
        handlePrevMatch();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchTerm, totalMatches]);

  return (
    <div className="relative">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onNextMatch={handleNextMatch}
        onPrevMatch={handlePrevMatch}
        currentMatch={currentMatchIndex + 1}
        totalMatches={totalMatches}
      />

      <div ref={contentRef} className="mt-6">
        <ContentDisplay
          content={content}
          searchTerm={searchTerm}
          currentMatchIndex={currentMatchIndex}
          onMatchesCount={handleMatchesCount}
        />
      </div>
    </div>
  );
};

export default SearchableContent;

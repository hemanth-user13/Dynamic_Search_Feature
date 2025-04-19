import React, { useEffect, useRef } from 'react';
import { highlightContent } from '../utils/highlightUtils';

interface ContentDisplayProps {
  content: {
    title: string;
    description: string;
  };
  searchTerm: string;
  currentMatchIndex: number;
  onMatchesCount: (count: number) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  content,
  searchTerm,
  currentMatchIndex,
  onMatchesCount
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const matchesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (contentRef.current && searchTerm) {
      // Clear previous matches
      matchesRef.current = [];

      // Process content
      const { matchCount } = highlightContent(
        contentRef.current,
        searchTerm,
        currentMatchIndex
      );
      
      // Collect all match elements
      matchesRef.current = Array.from(
        contentRef.current.querySelectorAll('.search-match')
      ) as HTMLElement[];
      
      // Update match count
      onMatchesCount(matchCount);
    } else if (contentRef.current && !searchTerm) {
      // Reset highlighting when search term is empty
      contentRef.current.querySelectorAll('.search-match, .search-current').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });
      
      // Reset match count
      onMatchesCount(0);
    }
  }, [searchTerm, content, currentMatchIndex]);

  // Scroll to current match
  useEffect(() => {
    if (currentMatchIndex >= 0 && matchesRef.current.length > 0) {
      const currentElement = contentRef.current?.querySelector('.search-current');
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentMatchIndex]);

  return (
    <div ref={contentRef} className="bg-white rounded-lg shadow-md p-6 min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {content.title}
      </h2>
      <div 
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: content.description }}
      />
    </div>
  );
};

export default ContentDisplay;
/**
 * Safely escapes a string for use in a regular expression
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Highlights content based on search term
 * Returns the number of matches found
 */
export function highlightContent(
  container: HTMLElement,
  searchTerm: string,
  currentMatchIndex: number
): { matchCount: number } {
  // Reset any existing highlights first
  container.querySelectorAll('.search-match, .search-current').forEach(el => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ''), el);
      parent.normalize();
    }
  });

  if (!searchTerm) {
    return { matchCount: 0 };
  }

  // Create a case-insensitive regular expression for the search term
  const searchRegex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const textNodes: Text[] = [];
  let matchCount = 0;

  // Recursive function to find all text nodes
  function findTextNodes(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Skip empty text nodes
      if (node.textContent && node.textContent.trim() !== '') {
        textNodes.push(node as Text);
      }
    } else {
      // Skip script and style tags
      const nodeName = node.nodeName.toLowerCase();
      if (nodeName !== 'script' && nodeName !== 'style') {
        // Process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          findTextNodes(node.childNodes[i]);
        }
      }
    }
  }

  // Find all text nodes in the container
  findTextNodes(container);

  // Process each text node to highlight matches
  textNodes.forEach(textNode => {
    const parent = textNode.parentNode;
    if (!parent) return;

    const text = textNode.textContent || '';
    const matches = Array.from(text.matchAll(searchRegex));

    if (matches.length > 0) {
      // Create a document fragment to hold the highlighted content
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      matches.forEach((match, index) => {
        const matchIndex = match.index || 0;
        
        // Add text before the match
        if (matchIndex > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, matchIndex))
          );
        }
        
        // Create the highlighted span for the match
        const matchSpan = document.createElement('span');
        
        // Check if this is the current match
        const isCurrentMatch = matchCount === currentMatchIndex;
        
        if (isCurrentMatch) {
          matchSpan.className = 'search-current bg-indigo-500 text-white px-0.5 rounded';
        } else {
          matchSpan.className = 'search-match bg-blue-200 px-0.5 rounded';
        }
        
        matchSpan.textContent = match[0];
        fragment.appendChild(matchSpan);
        
        lastIndex = matchIndex + match[0].length;
        matchCount++;
      });

      // Add any remaining text after the last match
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex))
        );
      }

      // Replace the original text node with the fragment containing highlights
      parent.replaceChild(fragment, textNode);
    }
  });

  return { matchCount };
}
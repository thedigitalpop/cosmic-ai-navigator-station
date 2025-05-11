
import React from 'react';

// Function to format date (YYYY-MM-DD -> Month DD, YYYY)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

// Function to decode HTML entities
export const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Function to decode HTML entities and convert URLs to clickable links
export const formatDescription = (description: string): React.ReactNode => {
  if (!description) return "";
  
  // Decode HTML entities (like &apos; to apostrophe)
  const decodedText = decodeHtmlEntities(description);
  
  // This regex matches URLs in text
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Process the content by sections
  // We'll identify list items with patterns like "- " or "• " at the beginning of lines
  const listItemRegex = /^(?:\s*)(?:-|\*|•|\d+\.)\s+/;
  
  // Split the description by double line breaks to get paragraphs
  const sections = decodedText.split(/\n\n+/);
  
  return (
    <>
      {sections.map((section, sectionIndex) => {
        // Skip empty sections
        if (!section.trim()) return null;
        
        // Check if this section consists of list items
        const lines = section.split(/\n/);
        const isListSection = lines.length > 1 && 
          lines.filter(line => line.trim() && listItemRegex.test(line)).length > 0;
        
        if (isListSection) {
          // Process as a list
          return (
            <ul key={sectionIndex} className="list-disc pl-6 mb-4 space-y-2">
              {lines.map((line, lineIndex) => {
                if (!line.trim()) return null;
                
                // Clean up the list item by removing the bullet or number
                let listItemContent = line.replace(listItemRegex, '').trim();
                
                // Process URLs in list item
                const parts = listItemContent.split(urlRegex);
                const formattedContent = parts.map((part, partIndex) => {
                  if (part.match(urlRegex)) {
                    return (
                      <a 
                        key={partIndex}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bright-orange hover:underline"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                });
                
                return line.trim() ? (
                  <li key={lineIndex} className="text-white/80">
                    {formattedContent}
                  </li>
                ) : null;
              })}
            </ul>
          );
        } else {
          // Process as a regular paragraph
          // Create links for URLs inside paragraphs
          const parts = section.split(urlRegex);
          const formatted = parts.map((part, j) => {
            // If the part matches a URL pattern
            if (part.match(urlRegex)) {
              return (
                <a 
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bright-orange hover:underline"
                >
                  {part}
                </a>
              );
            }
            return part;
          });
          
          // Handle single line breaks within paragraphs
          const processedLines = formatted.map((item) => {
            if (typeof item === 'string') {
              return item.split('\n').map((line, k, array) => (
                <React.Fragment key={k}>
                  {line}
                  {k < array.length - 1 && <br />}
                </React.Fragment>
              ));
            }
            return item;
          });
          
          return <p key={sectionIndex} className="mb-4 text-white/80">{processedLines}</p>;
        }
      })}
    </>
  );
};

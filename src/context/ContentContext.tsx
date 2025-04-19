import React, { createContext, useContext, ReactNode } from 'react';

interface Content {
  title: string;
  description: string;
}

interface ContentContextType {
  content: Content;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Sample content with HTML
const sampleContent: Content = {
  title: "Understanding Web Accessibility",
  description: `
    <p>Web accessibility refers to the inclusive practice of making websites usable by people of all abilities and disabilities. When sites are correctly designed, developed, and edited, all users have equal access to information and functionality.</p>
    
    <h3>Key Principles of Web Accessibility</h3>
    
    <p>The Web Content Accessibility Guidelines (WCAG) are organized around four principles, sometimes called POUR:</p>
    
    <ul>
      <li><strong>Perceivable</strong> - Information and user interface components must be presentable to users in ways they can perceive. This means users must be able to perceive the information being presented.</li>
      <li><strong>Operable</strong> - User interface components and navigation must be operable. This means users must be able to operate the interface.</li>
      <li><strong>Understandable</strong> - Information and the operation of the user interface must be understandable. This means users must be able to understand the information and the operation of the user interface.</li>
      <li><strong>Robust</strong> - Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. This means users must be able to access the content as technologies advance.</li>
    </ul>
    
    <h3>Benefits of Web Accessibility</h3>
    
    <p>Implementing accessibility best practices benefits everyone, not just users with disabilities:</p>
    
    <ul>
      <li>Improved user experience for all users, including those with limitations due to age, temporary disabilities, or situational limitations</li>
      <li>Better SEO performance, as many accessibility practices align with search engine optimization</li>
      <li>Increased audience reach and market share by making content available to more people</li>
      <li>Reduced legal risk, as many jurisdictions have laws requiring digital accessibility</li>
      <li>Enhanced brand reputation by demonstrating corporate social responsibility</li>
    </ul>
    
    <h3>Common Accessibility Features</h3>
    
    <p>Some of the most important accessibility features include:</p>
    
    <ul>
      <li>Alternative text for images to help screen reader users understand visual content</li>
      <li>Proper heading structure to facilitate navigation and comprehension</li>
      <li>Keyboard navigation support for users who cannot use a mouse</li>
      <li>Sufficient color contrast to ensure text is readable for users with visual impairments</li>
      <li>Descriptive link text that makes sense out of context</li>
      <li>Accessible forms with properly associated labels</li>
      <li>Error messages that are easy to identify and understand</li>
    </ul>
    
    <p>Implementing these features not only makes your website more accessible but often improves the user experience for everyone. Remember that accessibility is not just about compliance with guidelines—it's about creating inclusive experiences that work for all users regardless of their abilities.</p>
  `
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ContentContext.Provider value={{ content: sampleContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
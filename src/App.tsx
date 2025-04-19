import React from 'react';
import SearchableContent from './components/SearchableContent';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentProvider>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Document Search</h1>
            <p className="text-lg text-gray-600">
              Search through content with real-time highlighting and easy navigation
            </p>
          </header>
          <SearchableContent />
        </div>
      </ContentProvider>
    </div>
  );
}

export default App;
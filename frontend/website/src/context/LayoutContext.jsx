// src/context/LayoutContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState('classic'); // default to classic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await axios.get("http://26.41.72.16:5000/api/layout");
        const fetchedLayout = response.data.layout || 'classic';
        console.log('✅ Layout fetched from backend:', fetchedLayout);
        setLayout(fetchedLayout);
      } catch (error) {
        console.error('❌ Error fetching layout, using default:', error);
        setLayout('classic');
      } finally {
        setLoading(false);
      }
    };

    fetchLayout();
  }, []);

  // Apply layout class to body
  useEffect(() => {
    console.log('🎨 Applying layout class:', layout);
    document.body.className = layout;
    
    // Also add to root div for better scoping
    const root = document.getElementById('root');
    if (root) {
      root.className = layout;
    }
  }, [layout]);

  return (
    <LayoutContext.Provider value={{ layout, loading }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Export the hook in a way that's compatible with Fast Refresh
export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context.layout;
}
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Scroll to top first if no hash
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Wait for page to render then scroll to element
    const timer = setTimeout(() => {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      
      if (element) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash, pathname]);
};

export default useScrollToHash;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useSelfLocation = () => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState<string>('');
  useEffect(() => {
    setLocationPath(location.pathname.replace('/', ''));
  }, [location]);

  return { locationPath, setLocationPath };
};

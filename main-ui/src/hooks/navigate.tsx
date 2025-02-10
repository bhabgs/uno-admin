// NavigationContext.js
import { createContext, useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const NavigationContext = createContext<{ navigate: NavigateFunction } | null>(
  null,
);

export const NavigationProvider = (opt: any) => {
  const navigate = useNavigate();
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {opt.children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);

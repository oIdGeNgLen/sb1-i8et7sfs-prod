import React, { createContext, useContext, useState } from 'react';

interface NavigationState {
  page: number;
  scrollPosition: number;
}

interface NavigationContextType {
  state: NavigationState;
  setState: (state: NavigationState) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<NavigationState>({ page: 1, scrollPosition: 0 });

  return (
    <NavigationContext.Provider value={{ state, setState }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
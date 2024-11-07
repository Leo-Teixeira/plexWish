import React, {createContext, useState, useContext, ReactNode} from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode doit être utilisé dans un DarkModeProvider');
  }
  return context;
};

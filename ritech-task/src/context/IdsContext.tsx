import { createContext, FC, ReactNode, useContext, useState } from "react";

interface IdsContextType {
  selectedId: number;
  setSelectedId: (id: number) => void;
  handleClick: (id: number) => void;
}

const IdsContext = createContext<IdsContextType | undefined>(undefined);

interface IdsContextProviderType {
  children: ReactNode;
}

export const IdsProvider: FC<IdsContextProviderType> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<number>(0);

  const handleClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <IdsContext.Provider
      value={{
        selectedId,
        setSelectedId,
        handleClick,
      }}
    >
      {children}
    </IdsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIds = (): IdsContextType => {
  const context = useContext(IdsContext);
  if (!context) {
    throw new Error("useIds must be used within a IdsProvider");
  }
  return context;
};

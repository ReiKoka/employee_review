import { createContext, useContext, useState, ReactNode, FC } from "react";

export type ModalType = "createAdmin" | "create" | "edit" | "delete" | "createReview" | "editReview" | "deleteReview" | "createFeedback" | "editFeedback" | "deleteFeedback" | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  function openModal(modal: ModalType) {
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <ModalContext.Provider value={{ activeModal, closeModal, openModal}}>
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

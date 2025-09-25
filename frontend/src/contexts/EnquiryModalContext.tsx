import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface EnquiryModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (context === undefined) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};

interface EnquiryModalProviderProps {
  children: ReactNode;
}

export const EnquiryModalProvider: React.FC<EnquiryModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  }, []);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  const value = {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
    </EnquiryModalContext.Provider>
  );
};
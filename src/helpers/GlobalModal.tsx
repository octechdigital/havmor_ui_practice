import React, { useState, createContext, useContext } from "react";
import popups from "../components/Popups";

export const MODAL_TYPES = {
  CONTACT_US: "CONTACT_US",
  TERMS: "TERMS",
  PROFILE: "PROFILE",
  PRIVACY_POLICY: "PRIVACY_POLICY",
};


const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CONTACT_US]: popups.ContactUsPopups,
  [MODAL_TYPES.TERMS]: popups.TermsPopups,
  [MODAL_TYPES.PROFILE]: popups.ProfilePopups,
  [MODAL_TYPES.PRIVACY_POLICY]: popups.PrivacyPolicyPopups,
};

type ContextType = {
  showModal: (
    modalType: string,
    modalProps?: any,
    onClose?: () => void
  ) => void;
  hideModal: (blockOnClose?: boolean) => void;
  store: any;
};

const initalState: ContextType = {
  showModal: () => {},
  hideModal: (blockOnClose?: boolean) => {},
  store: {},
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

interface GlobalModalStore {
  modalType: string;
  modalProps: any; //TODO: add conditional props for each modal
  onClose: () => void;
}
export const GlobalModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState<GlobalModalStore>({
    modalType: "",
    modalProps: {},
    onClose: () => {},
  });
  const { modalType, modalProps } = store || {};

  const showModal = (
    modalType: string,
    modalProps: any = {},
    onClose: () => void = () => {}
  ) => {
    setStore({
      ...store,
      modalType,
      modalProps,
      onClose,
    });
  };

  const hideModal = (blockOnClose?: boolean) => {
    setStore({
      ...store,
      modalType: "",
      modalProps: {},
      onClose: () => {},
    });
    if (blockOnClose !== true) {
      store.onClose();
    }
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    console.log(modalProps)
    return (
      <ModalComponent id="global-modal" hideModal={hideModal} {...modalProps} />
    );
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

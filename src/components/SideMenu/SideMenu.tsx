import React, { useMemo } from "react";
import "./SideMenu.scss";
import { useNavigate } from "react-router-dom";
import store from "../../store/store";
import { ROUTES } from "../../lib/consts";
import { MODAL_TYPES, useGlobalModalContext } from "../../helpers/GlobalModal";
// @import images
import popupLogo from "../../assets/images/popupLogo.png";
import cancelImage from "../../assets/images/cancelIcon.png";
import BurgerMenu from "../../assets/images/burgerMenu.png";
import footerImage from "../../assets/images/footerImages.png";

const SideMenu = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const state = store.getState();
  const { showModal } = useGlobalModalContext();

  const menuOptions = useMemo(
    () => [
      {
        name: "PROFILE",
        route: ROUTES.HOME,
        onClick: () => {
          showModal(MODAL_TYPES.PROFILE);
          onClose();
        },
      },
      {
        name: "TERMS AND CONDITIONS",
        route: ROUTES.HOME,
        onClick: () => {
          showModal(MODAL_TYPES.TERMS);
          onClose();
        },
      },
      {
        name: "PRIVACY AND POLICY",
        route: ROUTES.HOME,
        onClick: () => {
          showModal(MODAL_TYPES.PRIVACY_POLICY);
          onClose();
        },
      },
      {
        name: "CONTACT US",
        route: ROUTES.HOME,
        onClick: () => {
          showModal(MODAL_TYPES.CONTACT_US);
          onClose();
        },
      },
    ],
    []
  );
  return( 
  <div className={`side-menu ${open ? "opened" : "closed"}`}>
    <div className="bg" onClick={onClose}></div>
    <div className="model">
        <div className="menu-cross">
        <img
            src={BurgerMenu}
            onClick={onClose}
            alt="menu"
            className="menu-icon"
          />
        </div>
        <div className="options">
          {menuOptions.map((item) => (
            <div
              className="option"
              onClick={() => item.onClick && item.onClick()}
              key={item.name}
            >
              {item.name}
            </div>
          ))}
        </div>
        <footer>
          <div className="footerContent">
            <img src={footerImage} alt="menu" className='FooterImages'/>
          </div>
        </footer>
    </div>
  </div>
  );
};

export default SideMenu;

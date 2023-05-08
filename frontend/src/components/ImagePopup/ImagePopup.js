import React from "react";
import Popup from "../Popup/Popup";

const ImagePopup = ({
  isOpen,
  onClose,
  popupType,
  ...props
}) => {

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      popupType={popupType}
    >
      <img
        className="popup__image"
        src={props.card ? props.card.link : ''}
        alt={props.card ? props.card.name : ''}
      />
      <p className="popup__signature">{props.card ? props.card.name : ''}</p>
    </Popup>
  );
}

export default ImagePopup;

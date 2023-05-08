import React from "react";
import Popup from "../Popup/Popup";

const PopupWithForm = ({
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
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className={`popup__submit ${!props.inputsValid && props.additionalClass}`}>
          {props.isLoading ? props.buttonLoadingText : props.buttonText}
        </button>
      </form>
    </Popup>
  );
}


export default PopupWithForm;

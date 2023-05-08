import React from "react";
import succesPath from '../../images/succes-icon.svg';
import failPath from '../../images/fail-icon.svg';
import Popup from "../Popup/Popup";

const InfoTooltip = ({
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
      <div className="popup__form">
        <img
          className="popup__status-icon"
          src={props.isRegisterSucces ? succesPath : failPath}
          alt="istatus register"
        />
        <p className="popup__status-text">
          {props.isRegisterSucces ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}


export default InfoTooltip;

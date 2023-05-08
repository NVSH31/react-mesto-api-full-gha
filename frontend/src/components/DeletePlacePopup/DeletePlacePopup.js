import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function DeletePlacePopup({
  isOpen,
  onClose,
  onDeletePlace,
  card,
  isLoading
}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onDeletePlace(card);
  }

  return (
    <PopupWithForm
      popupType={'popup_delete'}
      name={'delete-card'}
      title={'Вы уверены?'}
      additionalClass={'popup__submit_delete'}
      buttonText={'Да'}
      buttonLoadingText={'Удаление...'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

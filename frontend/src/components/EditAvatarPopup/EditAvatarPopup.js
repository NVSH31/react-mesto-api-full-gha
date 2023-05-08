import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  onClose,
  isOpen,
  onUpdateAvatar,
  isLoading,
}) {
  const [emptyInput, setEmptyInput] = React.useState(true);

  const urlAvatarRef = React.useRef('');

  const [inputsValid, setInputsValid] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: urlAvatarRef.current.value });
  }

  React.useEffect(() => {
    urlAvatarRef.current.value = '';
    setInputsValid(false);
  }, [isOpen]);

  //только для валидации, альтернатива не найдена
  const handleChangeAvatar = (evt) => {
    setInputsValid(urlAvatarRef.current.validity.valid);
    if (urlAvatarRef.current.value) {
      setEmptyInput(false);
    } else {
      setEmptyInput(true);
    }
  }

  return (
    <PopupWithForm
      popupType={'popup_avatar'}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      additionalClass={'popup__submit_disabled'}
      buttonText={'Сохранить'}
      buttonLoadingText={'Сохранение...'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      inputsValid={inputsValid}
      isLoading={isLoading}
    >
      <input
        id="avatar-url-input"
        name="url"
        className="popup__field popup__field_url"
        type="url"
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeAvatar}
        ref={urlAvatarRef}
      />
      <span id="avatar-url-input-error" className="popup__span popup__input-error">
        {!emptyInput && urlAvatarRef.current.validationMessage}
      </span>
    </PopupWithForm>
  );
}

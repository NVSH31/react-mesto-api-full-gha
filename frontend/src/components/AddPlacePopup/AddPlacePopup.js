import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { validUrl } from "../../utils/validators";


export default function AddPlacePopup({
  onClose, isOpen, onAddPlace, isLoading
}) {

  const [inputsValid, setInputsValid] = React.useState(false);

  const validators = {
    titleInput: {
      required: (value) => { return value === ''; },
      minLength: (value) => { return (value !== undefined ? value.length < 2 : true); },
      maxLength: (value) => { return (value !== undefined ? value.length > 30 : true); },
    },
    linkInput: {
      required: (value) => { return value === ''; },
      typeUrl: (value) => { return (validUrl(value)); }
    }
  }

  const [errors, setErrors] = React.useState({
    titleInput: {
      required: false,
      minLength: false,
      maxLength: false,
    },
    linkInput: {
      required: false,
      typeUrl: false,
    }
  });

  const [inputValues, setInputValues] = React.useState({
    title: '',
    link: '',
  });

  const handleChangeInputs = (evt) => {
    const { name, value } = evt.target;
    setInputValues(prevState => ({ ...prevState, [name]: value }));
  }

  React.useEffect(() => {

    const inputTitleValid = Object.keys(validators.titleInput).map(errorKey => {
      const errorResult = validators.titleInput[errorKey](inputValues.title);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), {});

    const inputLinkValid = Object.keys(validators.linkInput).map(errorKey => {
      const errorResult = validators.linkInput[errorKey](inputValues.link);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), {});

    setInputsValid(
      !(Object.values(inputTitleValid).some(value => value === true))
      && !(Object.values(inputLinkValid).some(value => value === true))
    );

    if (!inputValues.title && !inputValues.link) {
      setErrors({
        ...errors,
        titleInput: {
          ...errors.titleInput,
          required: false,
          minLength: false,
          maxLength: false,
        },
        linkInput: {
          ...errors.linkInput,
          required: false,
          typeUrl: false,
        }
      });

    } else {
      setErrors({
        titleInput: inputTitleValid,
        linkInput: inputLinkValid,
      });
    }

  }, [inputValues]);


  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: inputValues.title,
      link: inputValues.link
    });
  }

  React.useEffect(() => {
    setInputValues({
      title: '',
      link: '',
    });

  }, [isOpen]);

  return (
    <PopupWithForm
      popupType={'popup_card'}
      name={'add-card'}
      title={'Новое место'}
      additionalClass={'popup__submit_disabled'}
      buttonText={'Создать'}
      buttonLoadingText={'Создание...'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      inputsValid={inputsValid}
      isLoading={isLoading}
    >
      <input
        id="title-input"
        name="title"
        className="popup__field popup__field_title"
        type="text"
        placeholder='Название'
        onChange={handleChangeInputs}
        value={inputValues.title || ''}
      />
      <span id="title-input-error" className="popup__span popup__input-error">
        {errors.titleInput.required && 'Вы пропустили это поле. '}
        {errors.titleInput.minLength && 'Должно быти не менее 2 символов. '}
        {errors.titleInput.maxLength && 'Должно быти не более 30 символов. '}
      </span>
      <input
        id="url-input"
        name="link"
        className="popup__field popup__field_url"
        type="url"
        placeholder='Ссылка на картинку'
        onChange={handleChangeInputs}
        value={inputValues.link || ''}
      />
      <span id="url-input-error" className="popup__span popup__input-error">
        {errors.linkInput.required && 'Вы пропустили это поле. '}
        {errors.linkInput.typeUrl && 'Должна быть ссылка. '}
      </span>
    </PopupWithForm>
  );
}

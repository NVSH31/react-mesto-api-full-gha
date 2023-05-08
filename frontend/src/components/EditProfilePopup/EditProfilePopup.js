import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


export default function EditProfilePopup({
  isOpen, onClose, onUpdateUser, isLoading
}) {

  const [inputsValid, setInputsValid] = React.useState(false);

  const validators = {
    nameInput: {
      required: (value) => { return value === ''; },
      minLength: (value) => { return (value !== undefined ? value.length < 2 : true); },
      maxLength: (value) => { return (value !== undefined ? value.length > 40 : true); },
    },
    jobInput: {
      required: (value) => { return value === ''; },
      minLength: (value) => { return (value !== undefined ? value.length < 2 : true); },
      maxLength: (value) => { return (value !== undefined ? value.length > 200 : true); },
    }
  }

  const [errors, setErrors] = React.useState({
    nameInput: {
      required: true,
      minLength: true,
      maxLength: true,
    },
    jobInput: {
      required: true,
      minLength: true,
      maxLength: true,
    }
  });

  const currentUser = React.useContext(CurrentUserContext);

  const [inputValues, setInputValues] = React.useState({
    name: '',
    description: '',
  });

  const handleChangeInputs = (evt) => {
    const { name, value } = evt.target;
    setInputValues(prevState => ({...prevState, [name]: value}));
  }

  React.useEffect(() => {
    setInputValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  React.useEffect(() => {

    const inputNameValid = Object.keys(validators.nameInput).map(errorKey => {
      const errorResult = validators.nameInput[errorKey](inputValues.name);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    const inputJobValid = Object.keys(validators.jobInput).map(errorKey => {
      const errorResult = validators.jobInput[errorKey](inputValues.description);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({...acc, ...el}), {});

    setInputsValid(
      !(Object.values(inputNameValid).some(value => value === true)) &&
      !(Object.values(inputJobValid).some(value => value === true))
    );

    setErrors({
      nameInput: inputNameValid,
      jobInput: inputJobValid,
    });

  }, [inputValues, setErrors]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: inputValues.name,
      about: inputValues.description,
    });
  };

  return (
    <PopupWithForm
      popupType={'popup_profile'}
      name={'edit-profile'}
      title={'Редактировать профиль'}
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
        id="name-input"
        name="name"
        className="popup__field popup__field_name"
        type="text"
        onChange={handleChangeInputs}
        value={inputValues.name || ''}
      />
      <span id="name-input-error" className="popup__span popup__input-error">
        { errors.nameInput.required && 'Вы пропустили это поле. ' }
        { errors.nameInput.minLength && 'Должно быти не менее 2 символов. ' }
        { errors.nameInput.maxLength && 'Должно быти не более 40 символов. ' }
      </span>
      <input
        id="job-input"
        name="description"
        className="popup__field popup__field_job"
        type="text"
        onChange={handleChangeInputs}
        value={inputValues.description || ''}
      />
      <span id="job-input-error" className="popup__span popup__input-error">
        { errors.jobInput.required && 'Вы пропустили это поле. ' }
        { errors.jobInput.minLength && 'Должно быти не менее 2 символов. ' }
        { errors.jobInput.maxLength && 'Должно быти не более 200 символов. ' }
      </span>
    </PopupWithForm>
  );
}


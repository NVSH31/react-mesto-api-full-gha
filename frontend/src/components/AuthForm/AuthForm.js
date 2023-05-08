import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({
  formType,
  handleSubmit,
  handleChangeInputs,
  formValues,
  isLoading
}) => {

  const buttonText = () => {
    if (formType === 'register') {
      return (isLoading ? 'Регистрация...' : 'Зарегистрироваться');
    } else if (formType === 'login') {
      return (isLoading ? 'Вход...' : 'Войти');
    }
  }

  return (
    <div className="login-register">
      <h1 className="login-register__title">
        {(formType === 'register' && 'Регистрация') ||
          (formType === 'login' && 'Вход')
        }
      </h1>
      <form
        className="login-register__form"
        name="register"
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          className="login-register__input"
          onChange={handleChangeInputs}
          value={formValues.email || ''}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required={true}
          className="login-register__input"
          onChange={handleChangeInputs}
          minLength={6}
          value={formValues.password || ''}
        />
        <button
          type="submit"
          className="login-register__submit"
        >
          {buttonText()}
        </button>
      </form>
      {formType === 'register' &&
        <p className="login-register__login-text">
        Уже зарегистрированы?
        <Link to="/signin" className="login-register__login-link"> Войти</Link>
      </p>
      }
    </div>
  );
}

export default AuthForm;

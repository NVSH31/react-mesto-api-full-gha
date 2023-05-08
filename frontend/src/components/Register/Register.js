import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

const Register = ({ handleRegister, isLoading }) => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    handleRegister({ email, password });
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      handleChangeInputs={handleChangeInputs}
      formValues={formValues}
      isLoading={isLoading}
      formType={'register'}
    />
  );
}

export default Register;

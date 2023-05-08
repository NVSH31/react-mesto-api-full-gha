import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";


const Login = ({handleLogIn, isLoading}) => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formValues;
    handleLogIn({email, password});
  }

  const handleChangeInputs = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }


  return (
    <AuthForm
      handleSubmit={handleSubmit}
      handleChangeInputs={handleChangeInputs}
      formValues={formValues}
      isLoading={isLoading}
      formType={'login'}
    />
  );
}

export default Login;

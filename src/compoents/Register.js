import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header'

const Register = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
        navigate('/add');
    }
  }, []);

  const signUp = async (e) => {
    e.preventDefault();   

    let item = { name, email, password };

    setName("");
    setEmail("");
    setPassword("");
    let result = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate('/add');
  };

  return (
    <>
    <Header />
    <div className="col-sm-6 offset-sm-3">
      <h1>Register Page</h1>
      <form onSubmit={(e) => {
            signUp(e);
          }} className="mt-4">
        <input
          type="text"
          placeholder="Name"
          className="form-control mt-2" required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mt-2" required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mt-2" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary mt-4"
         type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
    </>
    
  );
};

export default Register;

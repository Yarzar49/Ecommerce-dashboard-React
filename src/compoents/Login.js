import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    let item = {email, password};
    let result = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/add");
   

  }

  return (
    <div>
      <Header />
      <h1>Login Page</h1>
      <form className="col-sm-6 offset-sm-3 mt-4" onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mt-2" value={email} onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mt-2" value={password} onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary mt-3" >Login</button>
      </form>
    </div>
  );
};

export default Login;

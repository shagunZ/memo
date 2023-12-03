import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { server } from "../main";
import toast from "react-hot-toast"
import { Context } from '../main';
const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(name, email, password)
    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.message)
      setIsAuthenticated(true); //setting
      setLoading(false)
    } catch (error) {

      console.log(error)
      toast.error("someerror")
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false)
    }

  }

  if (isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="Register login">
      <section>
        <form onSubmit={submitHandler}>
          <input required
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)} placeholder='Name' />
          <input required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email' />
          <input required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password' />
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register
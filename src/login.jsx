import { useState } from "react"
import API from "../services/api"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {

    try {

      const response = await API.post(
        "/login",
        {
          username,
          password
        }
      )

      console.log("FULL RESPONSE:", response)
      console.log("LOGIN DATA:", response.data)

      // Login failed
      if (!response.data.success) {

        setMessage(
          response.data.error ||
          "Login failed"
        )

        return
      }

      const token = response.data.token

      console.log(
        "TOKEN:",
        token
      )

      if (!token) {

        setMessage(
          "Backend did not return a token"
        )

        return
      }

      localStorage.setItem(
        "token",
        token
      )

      console.log(
        "STORED TOKEN:",
        localStorage.getItem("token")
      )

      setMessage(
        "Login successful"
      )

      window.location.href =
        "/dashboard"

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      )

      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {

        setMessage(
          error.response.data.error
        )

      } else {

        setMessage(
          "Server connection failed"
        )

      }

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-2xl w-96">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">

          Pepper Login

        </h1>

        <input
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full

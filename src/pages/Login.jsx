import { useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "../services/api"

function Login() {

  const navigate = useNavigate()

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

      const token = response.data.token

      localStorage.setItem(
        "token",
        token
      )

      navigate("/dashboard")

    }

    catch (error) {

      console.error(error)

      setMessage(
        "Invalid username or password"
      )

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
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded mb-4 bg-slate-800 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 p-3 rounded font-bold"
        >

          Login

        </button>

        {message && (

          <p className="mt-4 text-red-400">

            {message}

          </p>

        )}

      </div>

    </div>

  )

}

export default Login

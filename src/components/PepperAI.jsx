import { useState } from "react"
import API from "../services/api"

function PepperAI({ wallet }) {

const [message, setMessage] = useState("")
const [response, setResponse] = useState("")

const askPepper = async () => {

try {

  const token = localStorage.getItem("token")

  const result = await API.post(

    "/ai",

    {
      message,
      wallet
    },

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

  )

  setResponse(result.data)

}

catch (error) {

  console.error(error)

  setResponse(
    "Pepper failed to respond."
  )

}

}

return (

<div className="bg-slate-900 p-6 rounded-2xl mt-8">

  <h2 className="text-2xl text-cyan-400 mb-4">

    Ask Pepper

  </h2>

  <div className="flex gap-4">

    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Ask Pepper..."
      className="bg-slate-800 p-3 rounded flex-1"
    />

    <button
      onClick={askPepper}
      className="bg-cyan-500 px-6 rounded font-bold"
    >
      Ask
    </button>

  </div>

  <div className="bg-slate-800 p-4 rounded mt-4 min-h-[80px]">

    {response}

  </div>

</div>

)

}

export default PepperAI

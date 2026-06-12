import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

import WalletCards from "../components/WalletCards"
import WalletActions from "../components/WalletActions"
import TransactionHistory from "../components/TransactionHistory"
import PepperAI from "../components/PepperAI"


function Dashboard() {
  
  const navigate = useNavigate()
  const [wallet, setWallet] = useState(null)
  const [amount, setAmount] = useState("")
  const [history, setHistory] = useState([])

  useEffect(() => {

    loadWallet()
    loadHistory()

  }, [])

  const loadWallet = async () => {

    try {

      const token = localStorage.getItem("token")

      console.log("Dashboard Token:", token)

      if (!token) {
        console.log("NO TOKEN FOUND")
        navigate("/")
        return
      }
      
      const response = await API.get(

        "/wallet",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setWallet(response.data.wallet)

    }

    catch (error) {

      console.error(error)

    }

  }

  const loadHistory = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await API.get(

        "/history",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setHistory(response.data.history)

    }

    catch (error) {

      console.error(error)

    }

  }

  const depositMoney = async () => {

    try {

      const token = localStorage.getItem("token")

      await API.post(

        "/deposit",

        {
          amount: Number(amount)
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setAmount("")

      loadWallet()
      loadHistory()

    }

    catch (error) {

      console.error(error)

    }

  }

  const lockMoney = async () => {

    try {

      const token = localStorage.getItem("token")

      await API.post(

        "/lock",

        {
          amount: Number(amount)
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setAmount("")

      loadWallet()
      loadHistory()

    }

    catch (error) {

      console.error(error)

    }

  }

  const unlockMoney = async () => {

    try {

      const token = localStorage.getItem("token")

      await API.post(

        "/unlock",

        {
          amount: Number(amount)
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setAmount("")

      loadWallet()
      loadHistory()

    }

    catch (error) {

      console.error(error)

    }

  }

  const logout = () => {

    localStorage.removeItem("token")

    window.location.reload()

  }

  if (!wallet) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

        Loading Pepper Wallet...

      </div>

    )

  }
  
  const payWithRazorpay = async () => {

    if (!amount || Number(amount) <= 0) {

      alert(
        "Enter a valid amount"
      )

      return

    }
    
    const order = await API.post(
      "/api/create-order",
      {
        amount: Number(amount)
      }
    )

    console.log("ORDER DATA:", order.data)
    
    console.log(
      "Frontend Razorpay Key:",
      import.meta.env.VITE_RAZORPAY_KEY_ID
    )
    
    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.data.amount,

      currency: order.data.currency,

      name: "Pepper Wallet",

      description: "Wallet Deposit",

      order_id: order.data.order_id

    }

    console.log("RAZORPAY OPTIONS:", options)

    const razorpay = new window.Razorpay({

      ...options,

      handler: async function(response) {

        console.log(
          "Payment Success",
          response
        )

        await API.post(
          "/payment-success",
          {
            amount: Number(amount)
          }
        )

        alert(
          "Money Added Successfully"
        )

        setAmount("")

        loadWallet()
        loadHistory()

      }

    })

    razorpay.open()

}

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold text-cyan-400">
          Pepper Wallet
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/goals")}
            className="bg-purple-500 px-4 py-2 rounded"
          >
            Goals
          </button>
          
          <button
            onClick={() => navigate("/analytics")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Analytics
          </button>
          
          <button
            onClick={() => navigate("/qr")}
            className="bg-green-500 px-4 py-2 rounded"
          >
            QR Pay
          </button>
          
          <button
            onClick={payWithRazorpay}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Deposit via Razorpay
          </button>
          
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>

      <WalletActions
        amount={amount}
        setAmount={setAmount}
        depositMoney={depositMoney}
        lockMoney={lockMoney}
        unlockMoney={unlockMoney}
      />

      <WalletCards wallet={wallet} />

      <TransactionHistory history={history} />

      <PepperAI wallet={wallet} />

    </div>

  )

}

export default Dashboard

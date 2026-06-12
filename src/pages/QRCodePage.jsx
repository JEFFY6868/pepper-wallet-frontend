import { useState } from "react"
import API from "../services/api"
import { QRCode } from "react-qr-code"

function QRCodePage() {

  const [amount, setAmount] = useState("")
  const [qrValue, setQrValue] = useState("")
  const [loading, setLoading] = useState(false)

  const generateQR = async () => {

    try {

      setLoading(true)

      const response = await API.post(
        "/qr/generate",
        {
          amount: Number(amount)
        }
      )

      console.log(
        "QR RESPONSE:",
        response.data
      )

      setQrValue(
        response.data.upi_link
      )

    } catch (error) {

      console.error(error)

      alert(
        "Failed to generate QR"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold text-green-400 mb-8">

        Pepper QR Payments

      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl max-w-md">

        <h2 className="text-xl mb-4">

          Generate UPI QR

        </h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800 mb-4"
        />

        <button
          onClick={generateQR}
          disabled={loading}
          className="w-full bg-green-500 text-black font-bold p-3 rounded"
        >

          {loading
            ? "Generating..."
            : "Generate QR"}

        </button>

      </div>

      {qrValue && (

        <div className="mt-8">

          <div className="bg-white p-6 rounded-xl inline-block">

            <QRCode
              value={qrValue}
              size={256}
            />

          </div>

          <p className="mt-4 text-green-400">

            Scan with GPay / PhonePe / Paytm

          </p>

          <p className="mt-2 text-sm text-slate-400 break-all">

            {qrValue}

          </p>

        </div>

      )}

    </div>

  )

}

export default QRCodePage

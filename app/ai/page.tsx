"use client"

import { useState } from "react"

import BottomNav from "@/components/BottomNav"

export default function AIPage() {

  // =========================
  // STATES
  // =========================

  const [message, setMessage] = useState("")

  const [chat, setChat] = useState<any[]>([

    {

      role: "assistant",

      content:

        "Hello. I am Pepper AI. How can I help you manage your finances today?"

    }

  ])

  const [loading, setLoading] = useState(false)

  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage = async () => {

    if (!message || loading) return

    const updatedChat = [

      ...chat,

      {

        role: "user",

        content: message

      }

    ]

    setChat(updatedChat)

    const userMessage = message

    setMessage("")

    setLoading(true)

    try {

      const response = await fetch(

        "http://100.122.95.52:8000/ai",

        {

          method: "POST",

          headers: {

            "Content-Type":

            "application/json"

          },

          body: JSON.stringify({

            message: userMessage

          })

        }

      )

      if (!response.body) {

        setLoading(false)

        return

      }

      const reader = response.body.getReader()

      const decoder = new TextDecoder()

      let aiResponse = "Thinking..."

      // =========================
      // ADD AI MESSAGE
      // =========================

      setChat([

        ...updatedChat,

        {

          role: "assistant",

          content: aiResponse

        }

      ])

      // =========================
      // STREAM LOOP
      // =========================

      while (true) {

        const {

          done,
          value

        } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value)

        // =========================
        // REMOVE THINKING TEXT
        // =========================

        if (

          aiResponse === "Thinking..."

        ) {

          aiResponse = ""

        }

        aiResponse += chunk

        setChat((prev) => {

          const updated = [...prev]

          updated[updated.length - 1] = {

            role: "assistant",

            content: aiResponse

          }

          return updated

        })

      }

    } catch (error) {

      console.error(error)

    }

    setLoading(false)

  }

  // =========================
  // ENTER KEY SUPPORT
  // =========================

  const handleKeyDown = (

    e: any

  ) => {

    if (

      e.key === "Enter"

    ) {

      sendMessage()

    }

  }

  // =========================
  // UI
  // =========================

  return (

    <main className="min-h-screen bg-black text-white p-6 pb-36">

      {/* =========================
          HEADER
      ========================= */}

      <h1 className="text-4xl font-bold mb-8">

        Pepper AI Chat

      </h1>

      {/* =========================
          CHAT AREA
      ========================= */}

      <div className="space-y-4 mb-6">

        {chat.map((item, index) => (

          <div

            key={index}

            className={`

              p-4 rounded-2xl max-w-[85%]

              whitespace-pre-wrap

              ${item.role === "user"

                ? "bg-green-500 text-black ml-auto"

                : "bg-zinc-900 text-white"}

            `}

          >

            <p className="text-sm mb-2 font-bold">

              {item.role === "user"

                ? "You"

                : "Pepper AI"}

            </p>

            <p>

              {item.content}

            </p>

          </div>

        ))}

      </div>

      {/* =========================
          INPUT AREA
      ========================= */}

      <div className="fixed bottom-20 left-0 w-full p-4 bg-black">

        <div className="flex gap-3">

          <input

            type="text"

            placeholder="Ask Pepper AI..."

            value={message}

            onChange={(e) =>

              setMessage(e.target.value)

            }

            onKeyDown={handleKeyDown}

            className="flex-1 p-4 rounded-2xl bg-zinc-900 border border-zinc-700"

          />

          <button

            onClick={sendMessage}

            disabled={loading}

            className="bg-green-500 text-black px-6 rounded-2xl font-bold disabled:opacity-50"

          >

            Send

          </button>

        </div>

      </div>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <BottomNav />

    </main>

  )

}

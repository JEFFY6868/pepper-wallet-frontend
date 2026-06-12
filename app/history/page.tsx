"use client"

import { useEffect, useState } from "react"

import BottomNav from "@/components/BottomNav"

import {

  fetchHistory

} from "@/services/api"

export default function HistoryPage() {

  // =========================
  // STATE
  // =========================

  const [history, setHistory] = useState<any[]>([])

  // =========================
  // LOAD HISTORY
  // =========================

  const loadHistory = async () => {

    try {

      const data = await fetchHistory()

      setHistory(

        data.history || []

      )

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadHistory()

  }, [])

  // =========================
  // UI
  // =========================

  return (

    <main className="min-h-screen bg-black text-white p-6 pb-28">

      {/* =========================
          HEADER
      ========================= */}

      <h1 className="text-4xl font-bold mb-8">

        Transaction History

      </h1>

      {/* =========================
          HISTORY LIST
      ========================= */}

      <div className="space-y-4">

        {history
          .slice()
          .reverse()
          .map((item, index) => (

            <div

              key={index}

              className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"

            >

              <div className="flex justify-between items-center mb-2">

                <span className="text-lg font-bold capitalize">

                  {item.type}

                </span>

                <span className="text-lg font-bold">

                  ₹{item.amount}

                </span>

              </div>

              <p className="text-zinc-400 text-sm">

                {item.description}

              </p>

              <p className="text-zinc-500 text-xs mt-3">

                {item.timestamp}

              </p>

            </div>

          ))}

      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {history.length === 0 && (

        <div className="bg-zinc-900 p-6 rounded-2xl text-center text-zinc-500">

          No transactions yet

        </div>

      )}

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <BottomNav />

    </main>

  )

}

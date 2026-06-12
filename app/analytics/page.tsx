"use client"

import { useEffect, useState } from "react"

import BottomNav from "@/components/BottomNav"

import {

  fetchWallet

} from "@/services/api"

export default function AnalyticsPage() {

  // =========================
  // STATE
  // =========================

  const [analytics, setAnalytics] = useState<any>(null)

  // =========================
  // LOAD ANALYTICS
  // =========================

  const loadAnalytics = async () => {

    try {

      const data = await fetchWallet()

      setAnalytics(

        data.analytics

      )

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadAnalytics()

  }, [])

  // =========================
  // LOADING
  // =========================

  if (!analytics) {

    return (

      <main className="min-h-screen bg-black text-white p-6">

        Loading Analytics...

      </main>

    )

  }

  // =========================
  // UI
  // =========================

  return (

    <main className="min-h-screen bg-black text-white p-6 space-y-6 pb-28">

      {/* =========================
          HEADER
      ========================= */}

      <h1 className="text-4xl font-bold">

        Analytics

      </h1>

      {/* =========================
          FINANCIAL SCORE
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-xl mb-2">

          Financial Score

        </h2>

        <p className="text-5xl font-bold text-green-400">

          {analytics.financial_score}

        </p>

      </div>

      {/* =========================
          SAVINGS RATIO
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-xl mb-2">

          Savings Ratio

        </h2>

        <p className="text-5xl font-bold text-yellow-400">

          {analytics.savings_ratio}%

        </p>

      </div>

      {/* =========================
          TOTAL DEPOSITED
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-xl mb-2">

          Total Deposited

        </h2>

        <p className="text-4xl font-bold text-blue-400">

          ₹{analytics.total_deposited}

        </p>

      </div>

      {/* =========================
          TOTAL LOCKED
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-xl mb-2">

          Total Locked

        </h2>

        <p className="text-4xl font-bold text-yellow-300">

          ₹{analytics.total_locked}

        </p>

      </div>

      {/* =========================
          TOTAL UNLOCKED
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-xl mb-2">

          Total Unlocked

        </h2>

        <p className="text-4xl font-bold text-red-400">

          ₹{analytics.total_unlocked}

        </p>

      </div>

      {/* =========================
          TRANSACTION COUNTS
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Activity Stats

        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>Lock Count</span>

            <span>{analytics.lock_count}</span>

          </div>

          <div className="flex justify-between">

            <span>Unlock Count</span>

            <span>{analytics.unlock_count}</span>

          </div>

        </div>

      </div>

      {/* =========================
          RAW ANALYTICS
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Raw Analytics

        </h2>

        <pre className="text-sm overflow-auto">

          {JSON.stringify(

            analytics,
            null,
            2

          )}

        </pre>

      </div>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <BottomNav />

    </main>

  )

}

"use client"

import { useState } from "react"

import BottomNav from "@/components/BottomNav"

import {

  depositMoneyApi,
  lockMoneyApi,
  unlockMoneyApi

} from "@/services/api"

export default function DepositPage() {

  // =========================
  // STATES
  // =========================

  const [depositAmount, setDepositAmount] = useState("")

  const [lockAmount, setLockAmount] = useState("")

  const [unlockAmount, setUnlockAmount] = useState("")

  const [message, setMessage] = useState("")

  // =========================
  // DEPOSIT
  // =========================

  const handleDeposit = async () => {

    if (!depositAmount) return

    try {

      await depositMoneyApi(

        Number(depositAmount)

      )

      setMessage(

        `₹${depositAmount} deposited successfully`

      )

      setDepositAmount("")

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // LOCK
  // =========================

  const handleLock = async () => {

    if (!lockAmount) return

    try {

      await lockMoneyApi(

        Number(lockAmount)

      )

      setMessage(

        `₹${lockAmount} locked successfully`

      )

      setLockAmount("")

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // UNLOCK
  // =========================

  const handleUnlock = async () => {

    if (!unlockAmount) return

    try {

      await unlockMoneyApi(

        Number(unlockAmount)

      )

      setMessage(

        `₹${unlockAmount} unlocked successfully`

      )

      setUnlockAmount("")

    } catch (error) {

      console.error(error)

    }

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

        Wallet Controls

      </h1>

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {message && (

        <div className="bg-green-500 text-black p-4 rounded-2xl font-bold">

          {message}

        </div>

      )}

      {/* =========================
          DEPOSIT
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Deposit Money

        </h2>

        <input

          type="number"

          placeholder="Enter amount"

          value={depositAmount}

          onChange={(e) =>

            setDepositAmount(e.target.value)

          }

          className="w-full p-4 rounded-xl bg-black border border-zinc-700 mb-4"

        />

        <button

          onClick={handleDeposit}

          className="w-full bg-green-500 text-black font-bold p-4 rounded-xl"

        >

          Deposit

        </button>

      </div>

      {/* =========================
          LOCK
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Lock Money

        </h2>

        <input

          type="number"

          placeholder="Amount to lock"

          value={lockAmount}

          onChange={(e) =>

            setLockAmount(e.target.value)

          }

          className="w-full p-4 rounded-xl bg-black border border-zinc-700 mb-4"

        />

        <button

          onClick={handleLock}

          className="w-full bg-yellow-400 text-black font-bold p-4 rounded-xl"

        >

          Lock Money

        </button>

      </div>

      {/* =========================
          UNLOCK
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Unlock Money

        </h2>

        <input

          type="number"

          placeholder="Amount to unlock"

          value={unlockAmount}

          onChange={(e) =>

            setUnlockAmount(e.target.value)

          }

          className="w-full p-4 rounded-xl bg-black border border-zinc-700 mb-4"

        />

        <button

          onClick={handleUnlock}

          className="w-full bg-blue-500 text-white font-bold p-4 rounded-xl"

        >

          Unlock Money

        </button>

      </div>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <BottomNav />

    </main>

  )

}

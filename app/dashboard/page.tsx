"use client"

import { useEffect, useState } from "react"

import BottomNav from "@/components/BottomNav"

import {

  fetchWallet,
  fetchHistory,
  depositMoneyApi,
  lockMoneyApi,
  unlockMoneyApi

} from "@/services/api"

export default function Home() {

  // =========================
  // STATES
  // =========================

  const [walletData, setWalletData] = useState<any>(null)

  const [history, setHistory] = useState<any[]>([])

  const [amount, setAmount] = useState("")

  const [lockAmount, setLockAmount] = useState("")

  const [unlockAmount, setUnlockAmount] = useState("")

  // =========================
  // LOAD WALLET
  // =========================

  const loadWallet = async () => {

    try {

      const data = await fetchWallet()

      setWalletData(data)

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // LOAD HISTORY
  // =========================

  const loadHistory = async () => {

    try {

      const data = await fetchHistory()

      setHistory(data.history || [])

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // LOAD EVERYTHING
  // =========================

  const refreshData = async () => {

    await loadWallet()

    await loadHistory()

  }

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    refreshData()

  }, [])

  // =========================
  // DEPOSIT
  // =========================

  const handleDeposit = async () => {

    if (!amount) return

    try {

      await depositMoneyApi(

        Number(amount)

      )

      setAmount("")

      refreshData()

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

      setLockAmount("")

      refreshData()

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

      setUnlockAmount("")

      refreshData()

    } catch (error) {

      console.error(error)

    }

  }

  // =========================
  // LOADING
  // =========================

  if (!walletData) {

    return (

      <main className="min-h-screen bg-black text-white p-10">

        Loading Pepper Wallet...

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

        Pepper Wallet

      </h1>

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

          value={amount}

          onChange={(e) =>

            setAmount(e.target.value)

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
          BALANCES
      ========================= */}

      <div className="grid gap-4">

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">

            Total Balance

          </h2>

          <p className="text-3xl font-bold text-green-400">

            ₹{walletData.wallet.total_balance}

          </p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">

            Locked Balance

          </h2>

          <p className="text-3xl font-bold text-yellow-400">

            ₹{walletData.wallet.locked_balance}

          </p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">

            Available Balance

          </h2>

          <p className="text-3xl font-bold text-blue-400">

            ₹{walletData.wallet.available_balance}

          </p>

        </div>

      </div>

      {/* =========================
          ANALYTICS
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Analytics

        </h2>

        <pre className="text-sm overflow-auto">

          {JSON.stringify(

            walletData.analytics,
            null,
            2

          )}

        </pre>

      </div>

      {/* =========================
          HISTORY
      ========================= */}

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Transaction History

        </h2>

        <div className="space-y-4">

          {history
            .slice()
            .reverse()
            .map((item, index) => (

              <div

                key={index}

                className="bg-black p-4 rounded-xl border border-zinc-800"

              >

                <div className="flex justify-between mb-2">

                  <span className="font-bold capitalize">

                    {item.type}

                  </span>

                  <span>

                    ₹{item.amount}

                  </span>

                </div>

                <p className="text-sm text-zinc-400">

                  {item.description}

                </p>

                <p className="text-xs text-zinc-500 mt-2">

                  {item.timestamp}

                </p>

              </div>

            ))}

        </div>

      </div>

      {/* =========================
          BOTTOM NAVIGATION
      ========================= */}

      <BottomNav />

    </main>

  )

}

function WalletActions({

  amount,
  setAmount,
  depositMoney,
  lockMoney,
  unlockMoney

}) {

  return (

    <div className="flex gap-4 mb-8">

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-slate-800 p-3 rounded flex-1"
      />

      <button
        onClick={depositMoney}
        className="bg-green-500 px-6 rounded font-bold"
      >
        Deposit
      </button>

      <button
        onClick={lockMoney}
        className="bg-cyan-500 px-6 rounded font-bold"
      >
        Lock
      </button>

      <button
        onClick={unlockMoney}
        className="bg-yellow-500 px-6 rounded font-bold"
      >
        Unlock
      </button>

    </div>

  )

}

export default WalletActions

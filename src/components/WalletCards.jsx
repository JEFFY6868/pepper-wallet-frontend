function WalletCards({ wallet }) {

  return (

    <div className="grid grid-cols-3 gap-6">

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2>Total Balance</h2>
        <p className="text-4xl mt-3">
          ₹{wallet.total_balance}
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2>Available Balance</h2>
        <p className="text-4xl mt-3 text-green-400">
          ₹{wallet.available_balance}
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2>Locked Balance</h2>
        <p className="text-4xl mt-3 text-cyan-400">
          ₹{wallet.locked_balance}
        </p>
      </div>

    </div>

  )

}

export default WalletCards

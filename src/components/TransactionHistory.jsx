function TransactionHistory({ history }) {

  return (

    <div className="bg-slate-900 p-6 rounded-2xl mt-8">

      <h2 className="text-2xl mb-4">
        Transaction History
      </h2>

      {history.map((item, index) => (

        <div
          key={index}
          className="border-b border-slate-700 py-2"
        >

          <p>
            {item.type} - ₹{item.amount}
          </p>

          <p className="text-slate-400 text-sm">
            {item.description}
          </p>

        </div>

      ))}

    </div>

  )

}

export default TransactionHistory

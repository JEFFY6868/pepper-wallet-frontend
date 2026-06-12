const API_URL =

  "http://100.122.95.52:8000"


// =========================
// FETCH WALLET
// =========================

export const fetchWallet = async () => {

  const response = await fetch(

    `${API_URL}/wallet`

  )

  return response.json()

}


// =========================
// FETCH HISTORY
// =========================

export const fetchHistory = async () => {

  const response = await fetch(

    `${API_URL}/history`

  )

  return response.json()

}


// =========================
// DEPOSIT MONEY
// =========================

export const depositMoneyApi = async (

  amount: number

) => {

  const response = await fetch(

    `${API_URL}/deposit`,

    {

      method: "POST",

      headers: {

        "Content-Type":

        "application/json"

      },

      body: JSON.stringify({

        amount

      })

    }

  )

  return response.json()

}


// =========================
// LOCK MONEY
// =========================

export const lockMoneyApi = async (

  amount: number

) => {

  const response = await fetch(

    `${API_URL}/lock`,

    {

      method: "POST",

      headers: {

        "Content-Type":

        "application/json"

      },

      body: JSON.stringify({

        amount

      })

    }

  )

  return response.json()

}


// =========================
// UNLOCK MONEY
// =========================

export const unlockMoneyApi = async (

  amount: number

) => {

  const response = await fetch(

    `${API_URL}/unlock`,

    {

      method: "POST",

      headers: {

        "Content-Type":

        "application/json"

      },

      body: JSON.stringify({

        amount

      })

    }

  )

  return response.json()

}

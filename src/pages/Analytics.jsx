import { useEffect, useState } from "react"
import API from "../services/api"

function Analytics() {

  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {

    loadAnalytics()

  }, [])

  const loadAnalytics = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await API.get(

        "/wallet",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setAnalytics(
        response.data.analytics
      )

    }

    catch (error) {

      console.error(error)

    }

  }

  if (!analytics) {

    return <div>Loading...</div>

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold text-cyan-400 mb-8">

        Analytics

      </h1>

      <pre>

        {JSON.stringify(analytics, null, 2)}

      </pre>

    </div>

  )

}

export default Analytics

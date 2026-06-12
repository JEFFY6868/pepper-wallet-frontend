import { useEffect, useState } from "react"
import API from "../services/api"

function Goals() {

  const [goalName, setGoalName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [goals, setGoals] = useState([])
  const [goalAmount, setGoalAmount] = useState("")

  useEffect(() => {

    loadGoals()

  }, [])

  const loadGoals = async () => {

    try {

      const response = await API.get(

        "/goals"

      )

      setGoals(

        response.data.goals

      )

    }

    catch (error) {

      console.error(error)

    }

  }

  const createGoal = async () => {

    try {

      await API.post(

        "/goals",

        {
          name: goalName,
          target: Number(targetAmount)
        }

      )

      setGoalName("")
      setTargetAmount("")

      loadGoals()

    }

    catch (error) {

      console.error(error)

    }

  }

  const addToGoal = async (

    index,
    amount

  ) => {

    try {

      await API.post(

        "/goals/add",

        {
          index,
          amount
        }

      )

      loadGoals()

    }

    catch (error) {

      console.error(error)

    }

  }
  
  const addMoneyToGoal = async (index) => {

    try {

      const token = localStorage.getItem("token")

      await API.post(

        "/goals/add",

        {
          index,
          amount: Number(goalAmount)
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setGoalAmount("")

      loadGoals()

    }

    catch (error) {

      console.error(error)

    }

  }
  
  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold text-cyan-400 mb-8">

        Savings Goals

      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl mb-8">

        <h2 className="text-2xl mb-4">

          Create Goal

        </h2>

        <input
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="bg-slate-800 p-3 rounded w-full mb-4"
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="bg-slate-800 p-3 rounded w-full mb-4"
        />

        <button
          onClick={createGoal}
          className="bg-purple-500 px-6 py-3 rounded font-bold"
        >
          Create Goal
        </button>

      </div>

      <div className="grid gap-6">

        {goals.map((goal, index) => (

          <div
            key={index}
            className="bg-slate-900 p-6 rounded-2xl"
          >

            <h2 className="text-2xl font-bold">

              {goal.name}

            </h2>

            <p className="mt-2">

              ₹{goal.saved} / ₹{goal.target}

            </p>

            <p className="mt-2 text-purple-400">

              {Math.round(

                (goal.saved / goal.target) * 100

              )}% Complete

            </p>

            <div className="w-full bg-slate-700 h-4 rounded mt-4">

              <div
                className="bg-purple-500 h-4 rounded"
                style={{
                  width: `${(goal.saved / goal.target) * 100}%`
                }}
              />

            </div>

            <button
              onClick={() => addToGoal(index, 500)}
              className="bg-green-500 px-4 py-2 rounded mt-4"
            >
              Add ₹500
            </button>
            
            <div className="flex gap-2 mt-4">

              <input
                type="number"
                placeholder="Amount"
                value={goalAmount}
                onChange={(e) =>
                  setGoalAmount(e.target.value)
                }
                className="bg-slate-800 p-2 rounded flex-1"
              />

              <button
                onClick={() =>
                  addMoneyToGoal(index)
                }
                className="bg-green-500 px-4 rounded"
              >
                Add
              </button>

            </div>
            
          </div>

        ))}

      </div>

    </div>

  )

}

export default Goals

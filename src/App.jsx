import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Goals from "./pages/Goals"
import Analytics from "./pages/Analytics"
import QRCodePage from "./pages/QRCodePage"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        <Route
          path="/goals"
          element={<Goals />}
        />
        
        <Route
          path="/analytics"
          element={<Analytics />}
        />
        
        <Route
          path="/qr"
          element={<QRCodePage />}
        />
        
      </Routes>
     
    </BrowserRouter>

  )

}

export default App

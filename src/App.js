import Dashboard from "./pages/Dashboard";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Registerpage/>} />
          <Route path="/" exact element={<Registerpage/>} />
          <Route path="/login" exact element={<Loginpage/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

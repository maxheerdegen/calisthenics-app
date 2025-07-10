import { Outlet } from "react-router-dom"
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {

  const [user, setUser] = useState(null);

  return (
    <>
      <Header user = {user} setUser={setUser}/>
      <Outlet context = {{user, setUser}}/>
      <Footer />
    </>
  )
}

export default App;

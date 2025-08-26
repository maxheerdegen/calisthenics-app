import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include"
    })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((response) => setUser(response.username))
    .catch(() => setUser(null))
    .finally(() => setLoading(false))
  })

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Header user = {user} setUser={setUser}/>
      <Outlet context = {{user, setUser}}/>
      <Footer />
    </>
  )
}

export default App;

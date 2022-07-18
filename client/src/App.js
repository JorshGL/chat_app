import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./app/auth/Auth";
import Home from "./app/Main/app/Home";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={ <Auth/> } />
          <Route path="/" element={ <Home/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

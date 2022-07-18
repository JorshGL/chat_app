import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./app/auth/Auth";
import Register from "./app/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={ <Auth/> } />
          <Route path="/register" element={ <Register/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

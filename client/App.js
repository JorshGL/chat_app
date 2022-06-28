import { NativeRouter, Route, Routes } from "react-router-native";
import Auth from "./src//app/main/auth/Auth";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </NativeRouter>
  );
}

import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/protected-route";

import AboutPage from "@/pages/dashboard";
import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />

      <Route element={<ProtectedRoute />}>
        <Route element={<AboutPage />} path="/dashboard" />
      </Route>
    </Routes>
  );
}

export default App;

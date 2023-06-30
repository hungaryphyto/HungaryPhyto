import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/redirects/PersistLogin.tsx";
import RedirectIfAuth from "./components/redirects/RedirectIfAuth.tsx";
import RequireAuth from "./components/redirects/RequireAuth.tsx";
import Layout from "./components/Layout.tsx";
import Home from "./routes/Home.tsx";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth />}>
            {/* Abaixo rotas protegidas, apenas logado pode acessar */}

          </Route>
        </Route>
        <Route element={<RedirectIfAuth />}>
          {/* Abaixo redirecionar caso esteja logado */}

          </Route>
        </Route>
    </Routes>
  );
}

export default App;

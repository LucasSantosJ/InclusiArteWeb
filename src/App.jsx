import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/index.jsx';
import GerenciarArtesaos from './pages/GerenciarArtesaos/index.jsx'; 
import GerenciarPecas from './pages/GerenciarPecas/index.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './Layout/AdminLayout/AdminLayout.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<GerenciarArtesaos />} />
            <Route path="pecas" element={<GerenciarPecas />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
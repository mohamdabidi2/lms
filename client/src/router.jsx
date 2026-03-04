import { Navigate, Routes, Route } from "react-router-dom"
import Login from "./components/login"
import Register from "./components/register"
import Dashboard from "./components/dashboard"
function ProtectedRouter({ children }) {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/login" />
    }
    return children;
}
const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
           
                <Route path="/dashboard" element={
                    
                         <ProtectedRouter>
                          <Dashboard />
                          </ProtectedRouter>
                   } />
      

            </Routes>
        </div>
    );
}

export default Router;
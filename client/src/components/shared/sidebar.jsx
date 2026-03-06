import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
        const [user, setUser] = useState({});
    
        const navigate = useNavigate();
        const location = useLocation();
        const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;
    return (  <aside className="dashboard-sidebar">
                <div className="brand">
                    <span>LMS PRO</span>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/dashboard" className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}>
                                <span>🏠</span> Overview
                            </Link>
                        </li>
                        {user.role === 'admin' && (
                            <li>
                                <Link to="/dashboard/users" className={`sidebar-link ${isActive('/dashboard/users') ? 'active' : ''}`}>
                                    <span>👥</span> User Management
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/course" className="sidebar-link">
                                <span>📚</span> My Courses
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="sidebar-link">
                                <span>⚙️</span> Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div style={{ padding: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        className="btn-ghost"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside> );
}
 
export default Sidebar;
import { useEffect, useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
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
            </aside>
            <div className="content-area">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <input type="text" placeholder="Search resources..." style={{ width: '300px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '600', color: '#fff' }}>{user.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</div>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--accent-gradient)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>
                            {user.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                </header>
                <main>
                    {location.pathname === '/dashboard' ? (
                        <>
                            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Welcome back, {user.name}!</h1>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Here's what's happening in your account today.</p>

                            <div className="stats-grid">
                                <div className="stats-card">
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Active Courses</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>12</p>
                                </div>
                                <div className="stats-card">
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Pending Tasks</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>4</p>
                                </div>
                                <div className="stats-card">
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Students</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>1,284</p>
                                </div>
                            </div>
                        </>
                    ) : <Outlet />}
                </main>
            </div >
        </div >
    );
};

export default Dashboard;

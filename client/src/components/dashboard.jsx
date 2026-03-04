import { Children, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Dashboard = ({ Children }) => {
    const [user, setuser] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        console.log(storedUser)
        if (storedUser) {
            setuser(JSON.parse(storedUser))
        }
        else {
            navigate("/login")
        }
    }, [])
    const handlelogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }
    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <div className="brand">
                    <span>LMS</span>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/dashboard" className="sidebar-link" >Overview</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users" className="sidebar-link">User Management</Link>

                        </li>
                        <li>
                            <Link to="/course" className="sidebar-link">My Courses</Link>

                        </li>
                        <li>
                            <Link to="/settings" className="sidebar-link">Settings</Link>

                        </li>
                    </ul>
                </nav>
                <div>
                    <button style={{padding:"1rem",borderTop:"1px solid white" , color:"black",width:"100%"}} onClick={handlelogout} className="sidebar-link">Logout</button>
                </div>
            </aside>
            <div>
                <header>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="user-profile">
                        <div className="user-info">
                            <div className="avatar">{user.name}</div>
                            <div>{user.role}</div>

                        </div>
                    </div>
                </header>
                <main className="content-wrapper">
                    {Children ? Children : (
                        <>
                            <h1>welcome back,{user.name}!</h1>
                            <div className="stats-grid">
                                <div className="stats-card">
                                    <h3>Total courses</h3>
                                    <p>12</p>
                                </div>
                                <div className="stats-card">
                                    <h3>Assignments</h3>
                                    <p>4</p>
                                </div>
                                <div className="stats-card">
                                    <h3>System users</h3>
                                    <p>5000</p>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
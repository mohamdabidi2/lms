import { useEffect, useState } from "react"
import axios from "axios"
const UserManagement = () => {
    const [Users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [form, setform] = useState({ name: "", email: '', password: "", role: "student" })

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get("http://localhost:5000/api/users", { headers: { authorization: `Bearer ${token}` } })
            setUsers(res.data)
        }
        catch (error) {
            console.error("error fetching users", error)
        }
    }
    useEffect(() => {
        fetchUsers()


    }, [])
    const handelSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (editingUser) {
                await axios.put("http://localhost:5000/api/users/" + editingUser._id, form, { headers: { authorization: `Bearer ${token}` } })
            }
            else {
                await axios.post("http://localhost:5000/api/users", form, { headers: { authorization: `Bearer ${token}` } })
            }
            fetchUsers();
            setShowModal(false)
            setEditingUser(null)
            setform({ name: "", email: '', password: "", role: "student" })
        }
        catch (error) {
            console.error("error saving user", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handelDelete = async (id) => {
        if (window.confirm("are you sure you want to delete this user ?")) {
            try {

                const token = localStorage.getItem('token')
                await axios.delete("http://localhost:5000/api/users/" + id, { headers: { authorization: `Bearer ${token}` } })
                fetchUsers()
            }
            catch (error) {
                console.error("error deleting user", error)
            }
        }
    }

    return (
        <div className="user-management">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>User Management</h2>
                    <button className="btn-primary" onClick={()=>{setShowModal(true)}}>Add New User</button>

                </div>
                <div>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>

                                    <td>
                                        <span style={{
                                            padding: "4px 12px", borderRadius: "20px",
                                            fontSize: "0.75rem",
                                            fontWeight: "600",
                                            background: user.role === "admin" ? 'rgba(239,68,68,0.1)' : user.role === "teacher" ? 'rgba(59,130,246,0.1)' : "rgba(34,197,94,0.1)",
                                            color: user.role === "admin" ? '#fca5a5' : user.role === "teacher" ? '#93c5fd' : "#86efac",
                                            border: `1px solid ${user.role === "admin" ? 'rgba(239,68,68,0.2)' : user.role === "teacher" ? 'rgba(59,130,246,0.2)' : "rgba(34,197,94,0.2)"}`
                                        }}>{user.role}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button className="btn-ghost" onClick={()=>{
                                                console.log(user)
                                                setEditingUser(user)
                                                setShowModal(true) 
                                                setform(user)
                                            }}>Edit</button>
                                            <button className="btn-ghost" style={{ color: '#fca5a5' }} onClick={()=>{handelDelete(user._id)}}>Delete</button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={showModal==true?{display:"flex"}:{display:"none"}} className="modal-overlay">
                    <div className="modal-content">
                        <h3 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>{editingUser ? "Edit User" : "Add User"}</h3>
                        <form action="" style={{ display: "flex", flexDirection: "column", gap: '1rem' }} onSubmit={handelSubmit}>
                            <div className="field-group">
                                <label htmlFor="">name</label>
                                <input value={form.name} type="text" required onChange={(e) => { setform({ ...form, name: e.target.value }) }} />
                            </div>
                            <div className="field-group">
                                <label htmlFor="">email</label>
                                <input value={form.email} type="email" onChange={(e) => { setform({ ...form, email: e.target.value }) }} required />
                            </div>
                            <div className="field-group">
                                <label htmlFor="">password</label>
                                <input value={form.password || ''} type="password" onChange={(e) => { setform({ ...form, password: e.target.value }) }} required={!editingUser} />
                            </div>
                            <div className="field-group">
                                <label htmlFor="">Role</label>
                                <select value={form.role || 'student'} onChange={(e) => { setform({ ...form, role: e.target.value }) }} name="" id="">
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div style={{ display: "flex", gap: '1rem', marginTop: "1rem" }}>
                                <button className="btn-primary">{loading ? "processing" : editingUser ? "Update User" : "Create User"}</button>
                                <button onClick={()=>{setShowModal(false)
                                    setform({ name: "", email: '', password: "", role: "student" })
                                    setEditingUser(null)
                                }} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
    );
}

export default UserManagement;
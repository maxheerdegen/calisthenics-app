import { Outlet, Link } from "react-router-dom";

function DashbaordLayout () {
    return (
        <div>
            <aside>Sidebar
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="exercises">Exercises</Link></li>
                </ul>
            </aside>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashbaordLayout;
import { Outlet, Link } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

function DashbaordLayout () {
    return (
        <div className={styles.dashboard}>
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
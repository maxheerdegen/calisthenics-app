import { Outlet, Link } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

function DashbaordLayout () {
    return (
        <div className={styles.dashboard}>
            <aside>
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="exercises">Exercises</Link></li>
                </ul>
            </aside>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default DashbaordLayout;
import { Link } from "react-router-dom";
import styles from "./Hompage.module.css";
import addWorkout from "../../assets/add-workout.svg";
import startWorkout from "../../assets/start-workout.svg"
import history from "../../assets/history.svg";
import trackProgress from "../../assets/track-progress.svg"

function Homepage () {
    return (
        <div className={styles.content}>
            <div className={styles.contentTop}>
                <div className={styles.wrapper}>
                    <div className={styles.catchPhrase}>Your fitness journey starts here!</div>
                </div>
                <div className={styles.wrapperLinks}>
                    <Link to="sign-up" className={`${styles.buttonLink} ${styles.signUp}`}>Sign-Up!</Link>
                    <Link to="login" className={`${styles.buttonLink} ${styles.login}`}>Already have an account?</Link>
                </div>
            </div>
            <div className={styles.features}>
                <div className={styles.card}>
                    <img src={addWorkout} alt="" />
                    <div className={styles.cardTitle}>Add workouts.</div>
                    <div className={styles.cardText}>Choose from several exercises and create your own workouts.</div>
                </div>
                <div className={styles.card}>
                    <img src={startWorkout} alt="" />
                    <div className={styles.cardTitle}>Start workouts.</div>
                    <div className={styles.cardText}>Start your workouts and track them with a build-in timer.</div>
                </div>
                <div className={styles.card}>
                    <img src={trackProgress} alt="" />
                    <div className={styles.cardTitle}>Track progress.</div>
                    <div className={styles.cardText}>Track your workouts and see your progress over time.</div>
                </div>
                <div className={styles.card}>
                    <img src={history} alt="" />
                    <div className={styles.cardTitle}>See history.</div>
                    <div className={styles.cardText}>See your completed workouts in a calender view.</div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
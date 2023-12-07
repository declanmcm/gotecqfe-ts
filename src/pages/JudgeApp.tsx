import { useNavigate } from "react-router-dom";
import styles from '../styles';

function JudgeApp() { 

    const navigate = useNavigate();
  
    return (
        <div>
            <div>
                <h1 style={styles.headingStyleApp}>
                    Welcome
                </h1>
                <div style={styles.buttonContainerStyle}>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/user')}>See users</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem')}>See problems</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/auth')}>Logout</button>
                </div>
            </div>
        </div>
    );
}
  
export default JudgeApp;
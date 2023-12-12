import { useNavigate } from "react-router-dom";
import styles from '../styles';
import styled from 'styled-components';

const Heading = styled.h1`
    text-align: center;
    font-family: Helvetica, sans-serif;
    color: white;
    padding-top: 400px;
    font-size: 76px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-left: 810px;
    padding-right: 810px;
`;

function JudgeApp() { 

    const navigate = useNavigate();
  
    return (
        <div>
            <div>
                <Heading>
                    Welcome
                </Heading>
                <ButtonContainer>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/user')}>See users</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem/all')}>See problems</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/auth')}>Logout</button>
                </ButtonContainer>
            </div>
        </div>
    );
}
  
export default JudgeApp;
import { useNavigate } from "react-router-dom";
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

const Button = styled.button`
    font-size: var(--text-6x);
    background-color: var(--Button-colour);
    color: var(--text-dark);
    font-family: Helvetica, sans-serif;
    border-radius: 8px;
    padding: 8px;
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
                    <Button onClick={() => navigate('/judge-manager/app/user')}>See users</Button>
                    <Button onClick={() => navigate('/judge-manager/app/problem/all')}>See problems</Button>
                    <Button onClick={() => navigate('/judge-manager/auth')}>Logout</Button>
                </ButtonContainer>
            </div>
        </div>
    );
}
  
export default JudgeApp;
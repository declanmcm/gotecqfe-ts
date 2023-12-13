import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Button = styled.button`
    font-size: 30px;
    background-color: var(--button-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 4px;
    padding: 8px;
`;

const HeaderTag = styled.header`
    display: flex;
    justify-content: space-between;
`;

export default function Header( { text } : {text : string} ) {
    const navigate = useNavigate();

    function handleChange() {
        console.log(text);
        if (text === "User") navigate('/judge-manager/app/user');
        else navigate('/judge-manager/app/problem/all');
    }
    
    return (
        <div>
            <HeaderTag>
                <div style={{margin: 15}}>
                    <Button onClick={() => navigate('/judge-manager/app')}>Home</Button>
                    <Button onClick={handleChange}>{text}</Button>
                </div>
                <div style={{margin: 15}}>
                    <Button onClick={() => navigate('/judge-manager/auth')}>Logout</Button>
                </div>
            </HeaderTag>
        </div>
    );

}
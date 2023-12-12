import { useEffect} from "react";
import { User, Problem } from '../models';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Button = styled.button`
    font-size: 30px;
    background-color: var(--button-colour);
    color: var(--text-dark);
    font-family: Helvetica, sans-serif;
    border-radius: 8px;
    padding: 8px;
`;

const Container = styled.div`
    font-size: 30px;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: stretch;
`;

const InfoContainer = styled.div`
    margin: 5px;
    flex: 1;
`;

type UserDataProps = {
    currentUser : User,
    items: Array<User>,
    setFilteredItems: React.Dispatch<React.SetStateAction<Array<User> | Array<Problem> | null>>,
    hidden: boolean,
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
}
function UserData( { currentUser, hidden, setHidden, items, setFilteredItems } : UserDataProps ) {
    function toggleHidden() {
        if (hidden) window.localStorage.setItem('hidden', 'true');
        else window.localStorage.setItem('hidden', 'false');
        setHidden(!hidden);
    }

    useEffect(() => {
        let storedHidden = window.localStorage.getItem('hidden');
        console.log(storedHidden);
        setHidden(storedHidden !== "true");
    });

    function findSimilar() {
        let newList = [] as Array<User>;
        items.forEach(item => {if (item.solved_problem.length >= currentUser.solved_problem.length) newList.push(item);});
        setFilteredItems(newList);
    }

    return (
    <div>
        <h1>{currentUser.username}</h1>
        <ButtonContainer>
            <Button onClick={findSimilar} > Find similar</Button>
            <Button onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </Button>
        </ButtonContainer>
        <Container>
            <FlexContainer>
                <InfoContainer>
                    <p>
                        Username: {currentUser.username} <br/><br/>
                        Full name: {currentUser.first_name && currentUser.last_name ? currentUser.first_name + currentUser.last_name : "None"} <br/><br/>
                        ID: {currentUser.id} <br/><br/>
                        Superuser: {currentUser.is_superuser ? "Yes" : "No"}
                    </p>
                </InfoContainer>
                <InfoContainer>
                    <p>
                        Verified: {currentUser.is_verified ? "Yes" : "No"} <br/><br/>
                        Email: {currentUser.email} <br/><br/>
                        Password: {currentUser.password} <br/><br/>
                        Create time: {currentUser.create_time} <br/><br/>
                        Update time: {currentUser.update_time} <br/><br/>
                        Profile picture: {currentUser.profile_pic} <br/><br/>
                    </p>
                </InfoContainer>
                <InfoContainer>
                    <p>
                        Last login: {currentUser.last_login == null ? "Never" : currentUser.last_login}<br/><br/>
                        Admin type: {currentUser.admin_type} <br/><br/>
                        Problem permission: {currentUser.problem_permission} <br/><br/>
                        Active: {currentUser.is_active ? "Yes" : "No"} <br/><br/>
                        Staff: {currentUser.is_staff ? "Yes" : "No"}
                    </p>
                </InfoContainer>
            </FlexContainer>
            <p>
                Groups: <br/>{currentUser.groups.length === 0 ? "None" : currentUser.groups.toString()}<br/><br/>
            </p>
            <p>
                Problems: <br/> {currentUser.solved_problem.length === 0 ? "None" : currentUser.solved_problem.toString()} <br/><br/>
                User permissions: <br/> {currentUser.user_permissions.length == 0 ? "None" : currentUser.user_permissions.toString()}
            </p>
        </Container>
    </div>);
}

export default UserData;
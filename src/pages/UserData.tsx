import { useEffect} from "react";
import { User, Problem } from '../models';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Button = styled.button`
    font-size: 24px;
    background-color: var(--button-colour);
    color: var(--text-light);
    font-family: Helvetica, sans-serif;
    border-radius: 4px;
    padding: 8px;
`;

const Container = styled.div`
    font-size: 30px;
`;

const GridContainer = styled.div`
    display: grid;
    align-items: stretch;
    grid-template-columns: repeat(auto-fill, 300px);
`;


const Text = styled.p`
    font-size: 25px;
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
            <GridContainer>
                <Text>Username: {currentUser.username}</Text>
                <Text>Full name: {currentUser.first_name && currentUser.last_name ? currentUser.first_name + currentUser.last_name : "None"} </Text>
                <Text>ID: {currentUser.id} </Text>
                <Text>Superuser: {currentUser.is_superuser ? "Yes" : "No"}</Text>
                <Text> Verified: {currentUser.is_verified ? "Yes" : "No"} </Text>
                <Text>Email: {currentUser.email} </Text>
                <Text>Password: {currentUser.password} </Text>
                <Text>Create time: {currentUser.create_time}</Text>
                <Text>Update time: {currentUser.update_time} </Text>
                <Text>Profile picture: {currentUser.profile_pic} </Text>
                <Text>Last login: {currentUser.last_login == null ? "Never" : currentUser.last_login}</Text>
                <Text>Admin type: {currentUser.admin_type} </Text>
                <Text>Problem permission: {currentUser.problem_permission} </Text>
                <Text>Active: {currentUser.is_active ? "Yes" : "No"} </Text>
                <Text>Staff: {currentUser.is_staff ? "Yes" : "No"}</Text>
            </GridContainer>
            <Text>
                Groups: <br/>{currentUser.groups.length === 0 ? "None" : currentUser.groups.toString()}<br/><br/>
            </Text>
            <Text>
                Problems: <br/> {currentUser.solved_problem.length === 0 ? "None" : currentUser.solved_problem.toString()} <br/><br/>
                User permissions: <br/> {currentUser.user_permissions.length == 0 ? "None" : currentUser.user_permissions.toString()}
            </Text>
        </Container>
    </div>);
}

export default UserData;
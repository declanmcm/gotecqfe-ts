import { useEffect} from "react";
import styles from '../styles';
import { User, Problem } from '../models';

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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <button style={styles.buttonStyleApp} onClick={findSimilar} > Find similar</button>
            <button style={styles.buttonStyleApp} onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </button>
        </div>
        {hidden === false ? <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Username: {currentUser.username} <br/><br/>
                        Full name: {currentUser.first_name && currentUser.last_name ? currentUser.first_name + currentUser.last_name : "None"} <br/><br/>
                        ID: {currentUser.id} <br/><br/>
                        Superuser: {currentUser.is_superuser ? "Yes" : "No"}
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Verified: {currentUser.is_verified ? "Yes" : "No"} <br/><br/>
                        Email: {currentUser.email} <br/><br/>
                        Password: {currentUser.password} <br/><br/>
                        Create time: {currentUser.create_time} <br/><br/>
                        Update time: {currentUser.update_time} <br/><br/>
                        Profile picture: {currentUser.profile_pic} <br/><br/>
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Last login: {currentUser.last_login == null ? "Never" : currentUser.last_login}<br/><br/>
                        Admin type: {currentUser.admin_type} <br/><br/>
                        Problem permission: {currentUser.problem_permission} <br/><br/>
                        Active: {currentUser.is_active ? "Yes" : "No"} <br/><br/>
                        Staff: {currentUser.is_staff ? "Yes" : "No"}
                    </p>
                </div>
            </div>
            <p>
                Groups: <br/>{currentUser.groups.length === 0 ? "None" : currentUser.groups.toString()}<br/><br/>
            </p>
            <p>
                Problems: <br/> {currentUser.solved_problem.length === 0 ? "None" : currentUser.solved_problem.toString()} <br/><br/>
                User permissions: <br/> {currentUser.user_permissions.length == 0 ? "None" : currentUser.user_permissions.toString()}
            </p>
        </div> : null }
    </div>);
}

export default UserData;
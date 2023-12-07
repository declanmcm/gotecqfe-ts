import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles';
import List from "./List.js";
import { User, Problem } from '../models';

const url = 'https://34.124.232.186:5000/admin/users/';
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
        setHidden(storedHidden != "true");
    }, []);

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
        {hidden == false ? <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Username: {currentUser.username} <br/>
                        Full name: {currentUser.first_name && currentUser.last_name ? currentUser.first_name + currentUser.last_name : "None"}
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Verified: {currentUser.is_verified ? "Yes" : "No"} <br/>
                        Email: {currentUser.email}
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Last login: {currentUser.last_login == null ? "Never" : currentUser.last_login}<br/>
                    </p>
                </div>
            </div>
            <p>
                Groups: <br/>{currentUser.groups.length == 0 ? "None" : currentUser.groups.toString()}
            </p>
            <p>
                Problems: <br/> {currentUser.solved_problem.length == 0 ? "None" : currentUser.solved_problem.toString()}
            </p>
        </div> : null }
    </div>);
}

export default UserData;
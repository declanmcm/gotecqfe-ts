import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from '../styles';
import { Problem } from '../models';

type ProblemDataProps = {
    problem: Problem,
    hidden: boolean,
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
}
function ProblemData( { problem, hidden, setHidden } : ProblemDataProps) {
    const navigate = useNavigate();

    function toggleHidden() {
        if (hidden) window.localStorage.setItem('hidden', 'true');
        else window.localStorage.setItem('hidden', 'false');
        setHidden(!hidden);
    }

    useEffect(() => {
        let storedHidden = window.localStorage.getItem('hidden');
        setHidden(storedHidden != "true");
    }, []);

    return (
    <div>
        <h1>{problem.title}</h1>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <button style={styles.buttonStyleApp} onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`) }> Edit problem</button>
            <button style={styles.buttonStyleApp} onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </button>
        </div>
        {hidden == false ? <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Author ID: {problem.author_id} <br/>
                        Author Name: {problem.author_name}
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Created: {problem.created} <br/>
                        Difficulty: {problem.difficulty}
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Time limit: {problem.time_limit}<br/>
                    </p>
                </div>
            </div>
            <p>
                Question: <br/>{problem.statement}
            </p>
        </div> : null}
    </div>);
}

export default ProblemData;
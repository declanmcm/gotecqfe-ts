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
        setHidden(storedHidden !== "true");
    });

    return (
    <div>
        <h1>{problem.title}</h1>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <button style={styles.buttonStyleApp} onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`) }> Edit problem</button>
            <button style={styles.buttonStyleApp} onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </button>
        </div>
        {hidden === false ? <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        ID: {problem.id} <br/><br/>
                        Display ID: {problem.display_id} <br/><br/>
                        Author ID: {problem.author_id} <br/><br/>
                        Author Name: {problem.author_name}<br/><br/>
                        Time limit: {problem.time_limit} <br/><br/>
                        Memory limit: {problem.memory_limit} <br/><br/>
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Created: {problem.created} <br/><br/>
                        Difficulty: {problem.difficulty} <br/><br/>
                        Visible: {problem.is_visible ? "Yes" : "No"} <br/><br/>
                        Total submissions: {problem.total_submission} <br/><br/>
                        Correct submissions: {problem.correct_submission} <br/><br/>
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Time limit: {problem.time_limit}<br/><br/>
                        Tags: {problem.tags.toString()}<br/><br/>
                        Source: {problem.source}<br/><br/>
                        Sample test: {problem.sample_test.toString()}<br/><br/>
                        Test zip: {problem.test_zip ? problem.test_zip : "None"}
                    </p>
                </div>
            </div>
            <p>
                Question: <br/>{problem.statement}<br/><br/>
                Statistic info: {problem.statistic_info.toString()}
            </p>
        </div> : null}
    </div>);
}

export default ProblemData;
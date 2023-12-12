import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from '../styles';
import { Problem } from '../models';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Button = styled.button`
    font-size: 30px;
    background-color: var(--button-colour);
    color: black;
    font-family: Helvetica, sans-serif;
    border-radius: 8;
    padding: 8;
`;

const TextContainer = styled.div`
    font-size: 30px;
`;

const Container = styled.div`
    display: flex;
    align-items: stretch;
`;

const FlexContainer = styled.div`
    margin: 5px;
    flex: 1;
`;

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
        <ButtonContainer>
            <Button onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`) }> Edit problem</Button>
            <Button onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </Button>
        </ButtonContainer>
        <TextContainer>
            <Container>
                <FlexContainer>
                    <p>
                        ID: {problem.id} <br/><br/>
                        Display ID: {problem.display_id} <br/><br/>
                        Author ID: {problem.author_id} <br/><br/>
                        Author Name: {problem.author_name}<br/><br/>
                        Time limit: {problem.time_limit} <br/><br/>
                        Memory limit: {problem.memory_limit} <br/><br/>
                    </p>
                </FlexContainer>
                <FlexContainer>
                    <p>
                        Created: {problem.created} <br/><br/>
                        Difficulty: {problem.difficulty} <br/><br/>
                        Visible: {problem.is_visible ? "Yes" : "No"} <br/><br/>
                        Total submissions: {problem.total_submission} <br/><br/>
                        Correct submissions: {problem.correct_submission} <br/><br/>
                    </p>
                </FlexContainer>
                <FlexContainer>
                    <p>
                        Time limit: {problem.time_limit}<br/><br/>
                        Tags: {problem.tags.toString()}<br/><br/>
                        Source: {problem.source}<br/><br/>
                        Sample test: {problem.sample_test.toString()}<br/><br/>
                        Test zip: {problem.test_zip ? problem.test_zip : "None"}
                    </p>
                </FlexContainer>
            </Container>
            <p>
                Question: <br/>{problem.statement}<br/><br/>
                Statistic info: {problem.statistic_info.toString()}
            </p>
        </TextContainer>
    </div>);
}

export default ProblemData;
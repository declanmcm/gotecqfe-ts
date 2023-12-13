import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Problem } from '../models';
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

const TextContainer = styled.div`
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
            <GridContainer>
                <Text>ID: {problem.id} </Text>
                <Text>Display ID: {problem.display_id} </Text>
                <Text>Author ID: {problem.author_id}</Text>
                <Text>Author Name: {problem.author_name}</Text>
                <Text>Time limit: {problem.time_limit} </Text>
                <Text>Memory limit: {problem.memory_limit} </Text>
                <Text>Created: {problem.created} </Text>
                <Text>Difficulty: {problem.difficulty} </Text>
                <Text>Visible: {problem.is_visible ? "Yes" : "No"} </Text>
                <Text>Total submissions: {problem.total_submission} </Text>
                <Text>Correct submissions: {problem.correct_submission} </Text>
                <Text>Time limit: {problem.time_limit}</Text>
                <Text>Tags: {problem.tags.toString()}</Text>
                <Text>Source: {problem.source}</Text>
                <Text>Sample test: {problem.sample_test.toString()}</Text>
                <Text>Test zip: {problem.test_zip ? problem.test_zip : "None"} </Text>
            </GridContainer>
            <Text>
                Question: <br/>{problem.statement}<br/><br/>
                Statistic info: {problem.statistic_info.toString()}
            </Text>
        </TextContainer>
    </div>);
}

export default ProblemData;
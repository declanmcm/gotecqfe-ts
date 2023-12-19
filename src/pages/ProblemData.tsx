import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Problem } from "../models";
import styled from "styled-components";
import { BaseButton } from "../components/styled";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled(BaseButton)`
  font-size: var(--text-3x);
`;

const TextContainer = styled.div`
  font-size: var(--text-xl);
`;

const GridContainer = styled.div`
  margin: 20px;
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
`;

const Text = styled.p`
  font-size: var(--text-3x);
`;

const LeftText = styled.p`
  font-size: var(--text-3x);
  text-align: left;
  margin: 20px;
`;

const Wrapper = styled.div`
  margin: 15px;
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-left: 150px;
  margin-right: 40px;
  justify-content: space-between;
  gap: 10px;
`;

type ProblemDataProps = {
  problem: Problem;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};
function ProblemData({ problem, hidden, setHidden }: ProblemDataProps) {
  const navigate = useNavigate();

  function toggleHidden() {
    if (hidden) window.localStorage.setItem("hidden", "true");
    else window.localStorage.setItem("hidden", "false");
    setHidden(!hidden);
  }

  useEffect(() => {
    let storedHidden = window.localStorage.getItem("hidden");
    setHidden(storedHidden !== "true");
  });

  return (
    <div>
      <TitleContainer>
        <h1>{problem.title}</h1>
        <ButtonContainer>
          <Wrapper>
          <Button
            onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`)}
          >
            {" "}
            Edit problem
          </Button>
          </Wrapper>
          <Wrapper>
          <Button onClick={toggleHidden}>
            {" "}
            {hidden ? "Show" : "Hide"} submission{" "}
          </Button>
          </Wrapper>
        </ButtonContainer>
      </TitleContainer>
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
        <LeftText>
          Question: <br />
          {problem.statement}
          <br />
          <br />
          Statistic info: {problem.statistic_info.toString()}
        </LeftText>
      </TextContainer>
    </div>
  );
}

export default ProblemData;

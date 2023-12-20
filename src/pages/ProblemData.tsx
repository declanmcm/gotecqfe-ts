import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Problem } from "../models";
import styled from "styled-components";
import { BaseButton, GridContainer, TitleContainer, Text } from "../components/styled";
import { Formatter } from "../components/Formatter";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
`;

const Button = styled(BaseButton)`
  font-size: var(--text-3x);
`;

const TextContainer = styled.div`
  font-size: var(--text-xl);
`;

type ProblemDataProps = {
  problem: Problem;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};
function ProblemData({ problem, hidden, setHidden }: ProblemDataProps) {
  const [, setSearchParams] = useSearchParams();

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
          <Button
            onClick={() => setSearchParams({ mode: 'edit' })}
          >
            {" "}
            Edit problem
          </Button>
          <Button onClick={toggleHidden}>
            {" "}
            {hidden ? "Show" : "Hide"} submission{" "}
          </Button>
        </ButtonContainer>
      </TitleContainer>
      <TextContainer>
        <GridContainer>
          <Text><label>ID</label><div>{problem.id}</div></Text>
          <Text><label>Display ID</label><div>{problem.display_id}</div></Text>
          <Text><label>Author ID</label><div>{problem.author_id}</div></Text>
          <Text><label>Author Name</label><div>{problem.author_name}</div></Text>
          <Text><label>Time limit</label><div>{problem.time_limit}</div></Text>
          <Text><label>Memory limit</label><div>{problem.memory_limit}</div></Text>
          <Text><label>Created</label><div>{problem.created}</div></Text>
          <Text><label>Difficulty</label><div>{problem.difficulty}</div></Text>
          <Text><label>Visible</label><div>{problem.is_visible ? "Yes" : "No"}</div></Text>
          <Text><label>Total submissions</label><div>{problem.total_submission}</div></Text>
          <Text><label>Correct submissions</label><div>{problem.correct_submission}</div></Text>
          <Text><label>Time limit</label><div>{problem.time_limit}</div></Text>
          <Text><label>Tags</label><div>{<Formatter data={problem.tags} />}</div></Text>
          <Text><label>Source</label><div>{problem.source}</div></Text>
          <Text><label>Sample test</label><div>{<Formatter data={problem.sample_test} />}</div></Text>
          <Text><label>Test zip</label><div>{problem.test_zip ? problem.test_zip : "None"}</div></Text>
          <Text className="span-all">
            <label>Question</label>
            {problem.statement}
            <br />
            <br />
            <label>Statistic info</label>
            {<Formatter data={problem.statistic_info} />}
          </Text>
        </GridContainer>
      </TextContainer>
    </div>
  );
}

export default ProblemData;

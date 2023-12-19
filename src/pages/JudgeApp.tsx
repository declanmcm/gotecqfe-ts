import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BaseButton } from "../components/styled";

const Heading = styled.h1`
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: var(--text-dark);
  font-size: 76px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-self: center;
`;

const Button = styled(BaseButton)`
  font-size: var(--text-6x);
  border-radius: 8px;
`;

const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

const JudgeAppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function JudgeApp() {
  const navigate = useNavigate();

  return (
    <JudgeAppContainer>
      <Heading>Welcome</Heading>
      <ButtonContainer>
        <Wrapper>
          <Button onClick={() => navigate("/judge-manager/app/user")}>
            See users
          </Button>
        </Wrapper>
        <Wrapper>
          <Button onClick={() => navigate("/judge-manager/app/problem")}>
            See problems
          </Button>
        </Wrapper>
        <Wrapper>
          <Button onClick={() => navigate("/judge-manager/auth")}>
            Logout
          </Button>
        </Wrapper>
      </ButtonContainer>
    </JudgeAppContainer>
  );
}

export default JudgeApp;

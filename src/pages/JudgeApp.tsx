import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: var(--text-dark);
  padding-top: 400px;
  font-size: 76px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding-left: 810px;
  padding-right: 810px;
`;

const Button = styled.button`
  font-size: var(--text-6x);
  background-color: var(--button-colour);
  color: var(--text-light);
  font-family: Helvetica, sans-serif;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

function JudgeApp() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}

export default JudgeApp;

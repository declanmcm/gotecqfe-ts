import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  font-size: 30px;
  background-color: var(--button-colour);
  color: var(--text-light);
  font-family: Helvetica;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;

const HeaderTag = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--header-color);
  position: fixed;
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 15px;
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

export default function Header({ text }: { text: string }) {
  const navigate = useNavigate();

  function handleChange() {
    console.log(text);
    if (text === "User") navigate("/judge-manager/app/user");
    else navigate("/judge-manager/app/problem/all");
  }

  return (
    <div>
      <HeaderTag>
        <div style={{display: 'flex'}}>
        <Wrapper>
          <Button onClick={() => navigate("/judge-manager/app")}>Home</Button>
        </Wrapper>
        <Wrapper>
          <Button onClick={handleChange}>{text}</Button>
        </Wrapper>
        </div>
        <Wrapper>
          <Button onClick={() => navigate("/judge-manager/auth")}>
            Logout
          </Button>
        </Wrapper>
      </HeaderTag>
      <div style = {{padding: 40}}>

      </div>
    </div>
  );
}

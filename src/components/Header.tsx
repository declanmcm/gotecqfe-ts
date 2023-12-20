import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BaseButton } from "./styled";

const Button = styled(BaseButton)`
  font-size: var(--text-xl);
  border-radius: 4px;
`;

const HeaderTag = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  background-color: var(--header-color);
  border-bottom: 1px solid var(--border-colour);
  box-shadow: 0 1px 2px 0px #777;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  &.pull-right {
    margin-left: auto;
  }
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

export default function Header({ text }: { text: string }) {
  const navigate = useNavigate();

  function handleChange() {
    console.log(text);
    if (text === "User") navigate("/judge-manager/app/user");
    else navigate("/judge-manager/app/problem");
  }

  return (
    <HeaderTag>
      <Wrapper>
        <Button onClick={() => navigate("/judge-manager/app")}>Home</Button>
      </Wrapper>
      <Wrapper>
        <Button onClick={handleChange}>{text}</Button>
      </Wrapper>
      <Wrapper className="pull-right">
        <Button onClick={() => navigate("/judge-manager/auth")}>
          Logout
        </Button>
      </Wrapper>
    </HeaderTag>
  );
}

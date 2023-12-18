import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthResponse } from "../models";
import styled from "styled-components";

const url = "https://34.124.232.186:5000/login/";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 20%;
  height: 500px;
  background-color: var(--auth-container-colour);
  padding: 20px;
  border: 2px solid;
`;

const Heading = styled.div`
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: black;
  font-size: 68px;
  margin-top: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: auto;
  margin-top: 50px;
  font-size: 24px;
`;

const Input = styled.input`
  margin: 8px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: var(--button-colour);
  color: white;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

const RedText = styled.p`
  color: var(--text-error);
  font-size: 13px;
`;

function JudgeAuth() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  async function sendLoginDetails() {
    let json: AuthResponse | null = null;
    try {
      const data = { username: username, password: password };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      json = await response.json();
      console.log(json);

      if (json && json.error === "none") {
        window.localStorage.setItem("token", json.data.token);
        navigate("/judge-manager/app");
      } else {
        setFailedLogin(true);
      }
    } catch (e) {
      console.log(e);
    }
    return json;
  }

  return (
    <Page>
      <Container>
        <Heading>Login</Heading>
        <Form>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {failedLogin ? (
            <RedText>Incorrect username or password</RedText>
          ) : null}
        <Wrapper>
          <Button type="button" onClick={sendLoginDetails}>
            Login
          </Button>
        </Wrapper>
        </Form>
      </Container>
    </Page>
  );
}

export default JudgeAuth;

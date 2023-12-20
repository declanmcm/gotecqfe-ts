import { useEffect } from "react";
import { User, Problem } from "../models";
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
  border-radius: 4px;
`;

const Container = styled.div`
  font-size: var(--text-xl);
`;

const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: var(--button-hover);
  }
`;

type UserDataProps = {
  currentUser: User;
  items: Array<User>;
  setFilteredItems: React.Dispatch<
    React.SetStateAction<Array<User> | Array<Problem> | null>
  >;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};
function UserData({
  currentUser,
  hidden,
  setHidden,
  items,
  setFilteredItems,
}: UserDataProps) {
  function toggleHidden() {
    if (hidden) window.localStorage.setItem("hidden", "true");
    else window.localStorage.setItem("hidden", "false");
    setHidden(!hidden);
  }

  useEffect(() => {
    let storedHidden = window.localStorage.getItem("hidden");
    setHidden(storedHidden !== "true");
  });

  function findSimilar() {
    let newList = [] as Array<User>;
    items.forEach((item) => {
      if (item.solved_problem.length >= currentUser.solved_problem.length)
        newList.push(item);
    });
    setFilteredItems(newList);
  }

  return (
    <div>
      <TitleContainer>
        <h1>{currentUser.username}</h1>
        <ButtonContainer>
            <Wrapper>
            <Button onClick={findSimilar}> Find similar</Button>
            </Wrapper>
            <Wrapper>
            <Button onClick={toggleHidden}>
            {" "}
            {hidden ? "Show" : "Hide"} submission{" "}
            </Button>
            </Wrapper>
        </ButtonContainer>
      </TitleContainer>
      <Container>
        <GridContainer>
          <Text><label>Username</label><div>{currentUser.username}</div></Text>
          <Text>
            <label>Full name</label>
            {currentUser.first_name && currentUser.last_name
              ? currentUser.first_name + currentUser.last_name
              : "None"}{" "}
          </Text>
          <Text><label>ID</label><div>{currentUser.id}</div></Text>
          <Text><label>Superuser</label><div>{currentUser.is_superuser ? "Yes" : "No"}</div></Text>
          <Text><label>Verified</label><div>{currentUser.is_verified ? "Yes" : "No"}</div></Text>
          <Text><label>Email</label><div>{currentUser.email}</div></Text>
          <Text><label>Password</label><div>{currentUser.password}</div></Text>
          <Text><label>Create time</label><div>{currentUser.create_time}</div></Text>
          <Text><label>Update time</label><div>{currentUser.update_time}</div></Text>
          <Text><label>Profile picture</label><div>{currentUser.profile_pic}</div></Text>
          <Text>
            <label>Last login</label>
            {currentUser.last_login == null ? "Never" : currentUser.last_login}
          </Text>
          <Text><label>Admin type</label><div>{currentUser.admin_type}</div></Text>
          <Text><label>Problem permission</label><div>{currentUser.problem_permission}</div></Text>
          <Text><label>Active</label><div>{currentUser.is_active ? "Yes" : "No"}</div></Text>
          <Text><label>Staff</label><div>{currentUser.is_staff ? "Yes" : "No"}</div></Text>
          <Text className="span-all">
            <label>Groups</label>
            {currentUser.groups.length === 0
              ? "None"
              : <Formatter data={currentUser.groups} />}
            <br />
            <br />
            <label>Problems</label>
            {currentUser.solved_problem.length === 0
              ? "None"
              : <Formatter data={currentUser.solved_problem} />}{" "}
            <br />
            <br />
            <label>User permissions</label>
            {currentUser.user_permissions.length === 0
              ? "None"
              : <Formatter data={currentUser.user_permissions} />}
          </Text>
        </GridContainer>
      </Container>
    </div>
  );
}

export default UserData;

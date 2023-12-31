import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { UserData, ProblemData, ProblemEditor } from ".";
import ReactDOM from "react-dom";
import "../modalStyle.css";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import {
  Submission,
  SubmissionList,
  User,
  UserResponse,
  Problem,
  ProblemResponse,
  ExpiredTokenResponse,
} from "../models";
import { BaseButton } from "../components/styled";

const url = "https://34.124.232.186:5000/";

const Loading = styled.p`
  font-size: var(--text-4x);
  color: var(--text-light);
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  gap: 15px;
`;

const Panel = styled.div`
  flex: 0 0 400px;
  text-align: center;
  font-size: var(--text-7x);
  border-style: solid;
  border-radius: 10px;
  border-color: var(--border-colour);
  background: var(--panel-colour);
`;

const PanelLarge = styled.div`
  flex: 3;
  text-align: center;
  font-size: var(--text-4x);
  border-style: solid;
  border-radius: 10px;
  border-color: var(--border-colour);
  background: var(--panel-colour);
`;

const PanelNewColour = styled.div`
  text-align: center;
  font-size: var(--text-7x);
  border-style: solid;
  border-radius: 10px;
  border-color: var(--border-colour);
  background: var(--background-colour);
  margin: 15px;
  h1 {
    margin-top: 15px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
`;

const AppButton = styled(BaseButton)`
  font-size: var(--text-6x);
`;

const SelectedItem = styled.div`
  border-style: solid;
  background: var(--item-colour);
  color: var(--selected-colour);
  border-color: var(--selected-colour);
  border-radius: 10px;
  margin: 15px;
  cursor: pointer;
`;

const Item = styled.div`
  border-style: solid;
  background: var(--item-colour);
  border-radius: 5px;
  margin: 15px;
  cursor: pointer;
`;

const ItemNewColour = styled.div`
  border-style: solid;
  background: var(--alt-item-colour);
  border-radius: 5px;
  margin: 15px;
  padding: 15px;
  font-size: var(--text-lg);
  p {
    margin: 0;
    margin-bottom: 15px;
  }
`;

const ItemText = styled.div`
  font-size: var(--text-2x);
  user-select: none;
  padding: 16px;
  text-align: left;
  p {
    margin-left: 0;
    margin-right: 0;
  }
`;

const BoldText = styled.p`
  font-weight: bold;
  margin: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 15px;
`;

const Heading = styled.h1`
  margin: 0px;
`;

type ListProps = {
  type: string;
};

const Wrapper = styled.div`
  &:hover ${AppButton} {
    background-color: var(--button-hover);
  }
`;

const ItemWrapper = styled.div`
    &:hover ${Item} {
        border-color: var(--item-hover-colour);
        color: var(--item-hover-colour);
    }

    &:hover ${SelectedItem} {
        border-color: var(--item-hover-colour);
        color: var(--item-hover-colour);
    }
`;

function List({ type }: ListProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<Array<Problem> | Array<User> | null>(null);
  const [filteredItems, setFilteredItems] = useState<
    Array<Problem> | Array<User> | null
  >(null);
  const [currentItem, setCurrentItem] = useState<User | Problem | null>(null);
  const [token, setToken] = useState<string | null>("");
  const [hidden, setHidden] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [surroundingPages, setSurroundingPages] =
    useState<Array<number> | null>(null);
  const [submissions, setSubmissions] = useState<Array<Submission> | null>(
    null
  );
  const id = useParams().id;
  const modalRoot = document.getElementById("modal-root");

  const Modal = ({ child }: { child: JSX.Element }) => {
    if (modalRoot) {
      return ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-content">{child}</div>
        </div>,
        modalRoot
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    let newArray = [] as Array<number>;
    for (let n = currentPage - 2; n < currentPage + 3; n++) {
      if (totalPages && n > 0 && n <= totalPages) newArray.push(n);
    }
    setSurroundingPages(newArray);
  }, [currentPage, totalPages]);

  useEffect(() => {
    let storedToken = window.localStorage.getItem("token");
    if (storedToken === "") navigate("/judge-manager/auth");

    const fetchData = async () => {
      let data = null as null | SubmissionList | ExpiredTokenResponse;
      try {
        const response = await fetch(url + "admin/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + storedToken,
          },
        });
        data = await response.json();
        if (
          (data && "detail" in data && data.detail === "Invalid token") ||
          (data && "detail" in data && data.detail === "Token has expired")
        )
          navigate("/judge-manager/auth");

        if (data && "data" in data) setSubmissions(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  const activeItem = useCallback((item: User | Problem) => {
    navigate(`/judge-manager/app/${type}/${item.id}`);
    setCurrentItem(item);
  }, [navigate, type]);
  useEffect(() => {
    let storedToken = window.localStorage.getItem("token");
    if (storedToken !== "") setToken(storedToken);
    else navigate("/judge-manager/auth");

    const fetchData = async () => {
      let data = null as
        | ProblemResponse
        | UserResponse
        | ExpiredTokenResponse
        | null;
      try {
        let toAppend = "";
        if (type === "user") toAppend = `admin/users/?page=${currentPage}`;
        else toAppend = `problem/?page=${currentPage}`;
        const response = await fetch(url + toAppend, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + storedToken,
          },
        });
        data = await response.json();
        if (
          (data && "detail" in data && data.detail === "Invalid token") ||
          (data && "detail" in data && data.detail === "Token has expired")
        )
          navigate("/judge-manager/auth");

        if (data && "maxpage" in data) setTotalPages(data.maxpage - 1);
        if (data && "data" in data && data.data) {
          setItems(data.data);
          if (id !== "all" && id !== "new" && id !== undefined) {
            (data.data as Array<User> | Array<Problem>).forEach(
              (item: User | Problem) => {
                if (item.id === parseInt(id ? id : "0")) {
                  activeItem(item);
                }
              }
            );
          } else {
            activeItem(data.data[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (storedToken !== "") {
      fetchData();
    }
  }, [type, token, id, navigate, currentPage, activeItem]);

  const formMode = searchParams.get('mode');
  console.log("🚀 ~ file: List.tsx:274 ~ List ~ formMode:", formMode)

  return (
    <div id="modal-root">
      {token === "" ? (
        <div>
          <Loading>Loading</Loading>
        </div>
      ) : (
        <div>
          <Header text={type === "user" ? "Problem" : "User"} />
          <Container>
            <Panel>
              <TitleContainer>
              <Heading>{type === "user" ? "Users" : "Problems"}</Heading>
              {type === "problem" && (
                <Wrapper>
                <AppButton
                  onClick={() => {
                    setSearchParams({ mode: 'new' })
                  }}
                >
                  Create
                </AppButton>
                </Wrapper>
              )}
              </TitleContainer>
              {(filteredItems != null && type === 'user') ? (
                filteredItems.map((item) => {
                  let ItemType: any = null;
                  if (currentItem != null && currentItem.id === item.id)
                    ItemType = SelectedItem;
                  else ItemType = Item;
                  return (
                    <ItemWrapper><ItemType onClick={() => activeItem(item)}>
                      {type === "user" && "username" in item ? (
                        <ItemText>
                          <BoldText>{item.username}</BoldText> Joined with email{" "}
                          {item.email} on {item.create_time.slice(0, 10)}{" "}
                        </ItemText>
                      ) : "title" in item ? (
                        <ItemText>
                          <BoldText>{item.title}</BoldText> Created on{" "}
                          {item.created.slice(0, 10)} by {item.author_name}: <br/>
                          {item.statement.slice(0, 50)}
                        </ItemText>
                      ) : null}
                    </ItemType></ItemWrapper>
                  );
                })
              ) : (
                <div>
                  {items != null
                    ? items.map((item) => {
                        let ItemType: any = null;
                        if (currentItem != null && currentItem.id === item.id)
                          ItemType = SelectedItem;
                        else ItemType = Item;
                        return (
                          <ItemWrapper><ItemType onClick={() => activeItem(item)}>
                            {type === "user" && "username" in item ? (
                              <ItemText>
                                <BoldText>{item.username}</BoldText> Joined with
                                email {item.email} on{" "}
                                {item.create_time.slice(0, 10)}{" "}
                              </ItemText>
                            ) : "title" in item ? (
                              <ItemText>
                                <BoldText>{item.title}</BoldText> Created on{" "}
                                {item.created.slice(0, 10)} by{" "}
                                {item.author_name}:<br/>
                          {item.statement.slice(0, 50)} {item.statement.length > 50 && "..."}
                              </ItemText>
                            ) : null}
                          </ItemType></ItemWrapper>
                        );
                      })
                    : null}
                </div>
              )}
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                surroundingPages={surroundingPages}
                totalPages={totalPages}
              />
            </Panel>

            <PanelLarge>
              {currentItem == null ||
              (type === "user" &&
                "is_superuser" in currentItem &&
                currentItem.is_superuser == null) ? (
                <h1>No item selected</h1>
              ) : (
                <div>
                  {"is_superuser" in currentItem ? (
                    <UserData
                      currentUser={currentItem}
                      hidden={hidden}
                      setHidden={setHidden}
                      items={items as Array<User>}
                      setFilteredItems={setFilteredItems}
                    />
                  ) : (
                    <ProblemData
                      problem={currentItem}
                      hidden={hidden}
                      setHidden={setHidden}
                    />
                  )}
                </div>
              )}
              {!hidden ? (
                <PanelNewColour>
                  <h1>Submissions</h1>
                  <GridContainer>
                    {currentItem != null && submissions != null
                      ? "username" in currentItem
                        ? submissions
                            .filter(
                              (submission) =>
                                submission.author_name === currentItem.username
                            )
                            .map((submission) => {
                              return (
                                <ItemNewColour>
                                  <BoldText>
                                    {submission.problem_title}
                                  </BoldText>{" "}
                                  {submission.language},{" "}
                                  {submission.submit_time.slice(0, 16)},{" "}
                                  {submission.verdict}
                                </ItemNewColour>
                              );
                            })
                        : submissions
                            .filter(
                              (submission) =>
                                submission.problem_title === currentItem.title
                            )
                            .map((submission) => {
                              return (
                                <ItemNewColour>
                                  <BoldText>{submission.author_name}</BoldText>{" "}
                                  {submission.language},{" "}
                                  {submission.submit_time.slice(0, 16)},{" "}
                                  {submission.verdict}
                                </ItemNewColour>
                              );
                            })
                      : null}
                  </GridContainer>
                </PanelNewColour>
              ) : null}
            </PanelLarge>
          </Container>
        </div>
      )}
      {(id != null && formMode) ? (
        <Modal
          child={
            <ProblemEditor
              toEdit={formMode === "new" ? null : currentItem}
              id={formMode === "new" ? "new" : id}
            />
          }
        />
      ) : null}
    </div>
  );
}

export default List;

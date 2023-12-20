import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Problem, User, getProblem } from "../models";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: white;
  font-size: 76px;
  padding-top: 450px;
`;

const Fieldset = styled.fieldset`
  display: block;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  color: var(--text-form);
  align-items: left;
  width: 65%;
  margin: auto;
  margin-top: 50px;
  font-size: var(--text-3x);
  border-radius: 10px;
`;

const Input = styled.input`
  width: 40%;
  font-size: var(--text-3x);
`;

const TextArea = styled.textarea`
  width: 75%;
  height: 150px;
  font-size: var(--text-lg);
`;

const TextAreaSmall = styled.textarea`
  width: 55%;
  height: 150px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: space-between;
`;

const RedText = styled.p`
  font-size: var(--text-xl);
  color: var(--text-error);
`;

type ProblemEditorProps = {
  toEdit: Problem | User | null;
  id: string;
};
function ProblemEditor({ toEdit, id }: ProblemEditorProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let initItem = getProblem() as Problem | User;
  if (toEdit != null) initItem = toEdit;
  const [problem, setProblem] = useState<Problem | User>(initItem);
  const [error, setError] = useState<string | null>(null);

  async function postProblem() {
    let method = "PUT";
    let toAppend = id;
    if (id === "new") {
      method = "POST";
      toAppend = "";
    }

    let storedToken = window.localStorage.getItem("token");

    console.log(JSON.stringify(problem));

    try {
      let data = new FormData();

      Object.entries(problem).forEach(([key, value]) => {
        data.append(key, value);
      });
      console.log(data);

      const response = await fetch(
        "https://34.124.232.186:5000/admin/problem/" + toAppend,
        {
          method: method,
          headers: {
            Authorization: "Token " + storedToken,
          },
          body: data,
        }
      );
      let json = await response.json();
      if (json.detail === "Invalid token") navigate("/judge-manager/auth");
      console.log(json);
      if (json.error !== "none") {
        let error = json.data;
        if (json.error === "Failed to handle request") {
          error = "Please fill all fields";
        }
        setError(error);
      }
    } catch (e: any) {
      console.log(e);
      setError("data" in e ? e.data : null);
    }
  }

  return (
    <div>
      <Heading>{id === "new" ? "Create new problem" : "Edit problem"}</Heading>
      <form>
        <Fieldset>
          <div>
            <label>Display id</label>
            <div>
              <Input
                value={"display_id" in problem ? problem.display_id : ""}
                name="display_id"
                type="text"
                onChange={(e) =>
                  setProblem({ ...problem, display_id: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Title</label>
            <div>
              <Input
                value={"title" in problem ? problem.title : ""}
                name="title"
                type="text"
                onChange={(e) =>
                  setProblem({ ...problem, title: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Statement</label>
            <div>
              <TextArea
                value={"statement" in problem ? problem.statement : ""}
                name="statement"
                onChange={(e) =>
                  setProblem({ ...problem, statement: e.target.value })
                }
              ></TextArea>
            </div>
          </div>
          <div>
            <label>Difficulty</label>
            <div>
              <select
                value={"difficulty" in problem ? problem.difficulty : "Easy"}
                name="difficulty"
                onChange={(e) =>
                  setProblem({ ...problem, difficulty: e.target.value })
                }
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div>
            <label>Source</label>
            <div>
              <TextAreaSmall
                value={
                  "source" in problem && problem.source ? problem.source : ""
                }
                name="source"
                onChange={(e) =>
                  setProblem({ ...problem, source: e.target.value })
                }
              ></TextAreaSmall>
            </div>
          </div>
          <div>
            <label>Sample test</label>
            <div>
              <TextAreaSmall
                defaultValue={
                  "sample_test" in problem
                    ? JSON.stringify(problem.sample_test)
                    : ""
                }
                name="sample_test"
                onChange={(e) => {
                  setProblem({
                    ...problem,
                    sample_test: JSON.parse(e.target.value) ?? "123123",
                  });
                }}
              />
            </div>
          </div>
          <div>
            <label>Test zip</label>
            <div>
              <input
                value={
                  "file" in problem && problem.file
                    ? JSON.stringify(problem.file)
                    : ""
                }
                name="test_zip"
                type="file"
                onChange={(e) =>
                  setProblem({ ...problem, test_zip: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Time limit</label>
            <div>
              <input
                value={"time_limit" in problem ? problem.time_limit : ""}
                name="time_limit"
                type="number"
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    time_limit: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <label>Memory limit</label>
            <div>
              <input
                value={"memory_limit" in problem ? problem.memory_limit : ""}
                name="memory_limit"
                type="number"
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    memory_limit: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <label>Total submission</label>
            <div>
              <input
                value={
                  "total_submission" in problem ? problem.total_submission : ""
                }
                name="total_submission"
                type="number"
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    total_submission: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <label>Correct submission</label>
            <div>
              <input
                value={
                  "correct_submission" in problem
                    ? problem.correct_submission
                    : ""
                }
                name="correct_submission"
                type="number"
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    correct_submission: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <label>Statistic info</label>
            <div>
              <textarea
                defaultValue={
                  "sample_test" in problem
                    ? JSON.stringify(problem.sample_test)
                    : ""
                }
                name="statistic_info"
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    statistic_info: JSON.parse(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div>
            <ButtonContainer>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  postProblem();
                }}
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (searchParams.has('mode')) {
                    searchParams.delete('mode');
                    setSearchParams(searchParams);
                  }
                }}
              >
                {" "}
                Close{" "}
              </button>
            </ButtonContainer>
            <RedText>{error != null ? error : null}</RedText>
          </div>
        </Fieldset>
      </form>
    </div>
  );
}

export default ProblemEditor;

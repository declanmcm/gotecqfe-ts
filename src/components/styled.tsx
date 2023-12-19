import styled from "styled-components";

export const BaseButton = styled.button`
  background-color: var(--button-colour);
  color: var(--text-light);
  font-family: Helvetica, sans-serif;
  padding: 8px;
  border: 1px solid var(--button-border-colour);
  border-radius: 8px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    background-color: var(--button-hover);
  }
`

export const TitleContainer = styled.div`
  display: flex;
  margin: 15px;
  justify-content: space-between;
  gap: 10px;
`;
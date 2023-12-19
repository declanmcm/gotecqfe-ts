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

export const GridContainer = styled.div`
  margin: 15px;
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  .span-all {
    grid-column: -1 / 1;
  }
`;

export const Text = styled.p`
  label {
    display: block;
    color: var(--text-form);
    font-size: var(--text-md);
    font-weight: bold;
    margin-bottom: 5px;
  }
  > div {
    word-break: break-word;
    &:empty:before {
      content: "-"
    }
  }
  text-align: left;
  font-size: var(--text-3x);
`;
import styled from 'styled-components';

const SmallButton = styled.button`
    font-size: 15px;
    background-color: var(--button-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 3px;
    padding: 4px;
    cursor: pointer;
`;

const SmallButtonActive = styled.button`
    font-size: 15px;
    background-color: var(--selected-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 3px;
    padding: 4px;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
`;

const Wrapper = styled.div`
  &:hover ${SmallButton} {
    background-color: var(--button-hover);
  }

  &:hover ${SmallButtonActive} {
    background-color: var(--button-active-hover);
  }
`;

type PaginationProps = {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number,
    surroundingPages: Array<number> | null,
    totalPages: number | null;
}

export default function Pagination({ setCurrentPage, currentPage, surroundingPages, totalPages }: PaginationProps) {

    function handlePageChange(newPage: number) {
        if (newPage < 1) newPage = 0;
        else if (totalPages && newPage > totalPages) newPage = totalPages;
        setCurrentPage(newPage);
    }

    return (<ButtonContainer>
        <Wrapper>
        <SmallButton onClick={() => handlePageChange(1)}>First</SmallButton>
        </Wrapper>
        <Wrapper>
        <SmallButton onClick={() => handlePageChange(currentPage - 1)}>Previous</SmallButton>
        </Wrapper>
        {surroundingPages && surroundingPages[0] != 1 ?
            <Wrapper><SmallButton>...</SmallButton></Wrapper>: null}
        {surroundingPages != null ?
            (surroundingPages.map(page => {
                let ButtonType = SmallButton;
                if (page === currentPage) ButtonType = SmallButtonActive;
                return <Wrapper><ButtonType onClick={() => handlePageChange(page)}>{page}</ButtonType></Wrapper>;
            })) : null}
        {surroundingPages && surroundingPages[surroundingPages.length - 1] != totalPages ?
            <Wrapper><SmallButton>...</SmallButton></Wrapper> : null}
            <Wrapper>
        <SmallButton onClick={() => handlePageChange(currentPage + 1)}>Next</SmallButton>
        </Wrapper>
        <Wrapper>
        <SmallButton onClick={() => { if (totalPages) handlePageChange(totalPages) }}>Last</SmallButton>
        </Wrapper>
    </ButtonContainer>);
}
import styled from 'styled-components';
import { BaseButton } from './styled';

const SmallButton = styled(BaseButton)`
    font-size: 15px;
    border-radius: 3px;
    padding: 4px;
`;

const SmallButtonActive = styled(SmallButton)`
    background-color: var(--selected-colour);
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    justify-content: center;
`;

const Wrapper = styled.div`
  font-size: 0;
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
        if (newPage < 1) newPage = 1;
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
        {surroundingPages && surroundingPages[0] !== 1 ?
            <Wrapper><SmallButton>...</SmallButton></Wrapper>: null}
        {surroundingPages != null ?
            (surroundingPages.map(page => {
                let ButtonType = SmallButton;
                if (page === currentPage) ButtonType = SmallButtonActive;
                return <Wrapper><ButtonType onClick={() => handlePageChange(page)}>{page}</ButtonType></Wrapper>;
            })) : null}
        {surroundingPages && surroundingPages[surroundingPages.length - 1] !== totalPages ?
            <Wrapper><SmallButton>...</SmallButton></Wrapper> : null}
            <Wrapper>
        <SmallButton onClick={() => handlePageChange(currentPage + 1)}>Next</SmallButton>
        </Wrapper>
        <Wrapper>
        <SmallButton onClick={() => { if (totalPages) handlePageChange(totalPages) }}>Last</SmallButton>
        </Wrapper>
    </ButtonContainer>);
}
import styled from 'styled-components';

const SmallButton = styled.button`
    font-size: 15px;
    background-color: var(--button-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 3px;
    padding: 4px;
`;

const SmallButtonActive = styled.button`
    font-size: 15px;
    background-color: var(--selected-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 3px;
    padding: 4px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
`;

type PaginationProps = {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number,
    surroundingPages: Array<number> | null,
    totalPages: number | null;
}

export default function Pagination( { setCurrentPage, currentPage, surroundingPages, totalPages } : PaginationProps) {

    function handlePageChange(newPage : number) {
        if (newPage < 1) newPage = 0;
        else if (totalPages && newPage > totalPages) newPage = totalPages;
        setCurrentPage(newPage);
    }

    return (<ButtonContainer>
        <SmallButton onClick={() => handlePageChange(1)}>First</SmallButton>
        <SmallButton onClick={() => handlePageChange(currentPage - 1)}>Previous</SmallButton>
        {surroundingPages && surroundingPages[0] != 1 ?
        <SmallButton>...</SmallButton> : null}
        {surroundingPages != null ?
        (surroundingPages.map(page => {
            let ButtonType = SmallButton;
            if (page === currentPage) ButtonType = SmallButtonActive;
            return <ButtonType onClick={() => handlePageChange(page)}>{page}</ButtonType>;
        })) : null}
        {surroundingPages && surroundingPages[surroundingPages.length - 1] != totalPages ?
        <SmallButton>...</SmallButton> : null}
        <SmallButton onClick={() => handlePageChange(currentPage + 1)}>Next</SmallButton>
        <SmallButton onClick={() => {if (totalPages) handlePageChange(totalPages)}}>Last</SmallButton>
    </ButtonContainer>);
}
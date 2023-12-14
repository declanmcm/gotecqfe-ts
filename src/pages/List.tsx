import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from '../components/Header';
import { UserData, ProblemData, ProblemEditor } from '.';
import ReactDOM from "react-dom";
import "../modalStyle.css";
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import { Submission, SubmissionList, User, UserResponse, Problem, ProblemResponse, ExpiredTokenResponse } from "../models";

const url = 'https://34.124.232.186:5000/';

const Loading = styled.p`
    font-size: 26px;
    color: var(--text-light);
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 15px;
`;

const Panel = styled.div`
    flex: 1;
    text-align: center;
    font-size: 32px;
    border-style: solid;
    border-radius: 10px;
    border-color: var(--border-colour);
    background: var(--panel-colour);
`;

const PanelLarge = styled.div`
    flex: 3;
    text-align: center;
    font-size: 26px;
    border-style: solid;
    border-radius: 10px;
    border-color: var(--border-colour);
    background: var(--panel-colour);
`;

const PanelNewColour = styled.div`
    text-align: center;
    font-size: 32px;
    border-style: solid;
    border-radius: 10px;
    border-color: var(--border-colour);
    background: var(--item-colour);
    margin: 15px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 440px);
`;

const AppButton = styled.button`
    font-size: 30px;
    background-color: var(--button-colour);
    color: var(--text-light);
    font-family: Helvetica;
    border-radius: 8px;
    padding: 8px;
`;

const SelectedItem = styled.div`
    border-style: solid;
    background: var(--item-colour);
    color: var(--selected-colour);
    border-color: var(--selected-colour);
    border-radius: 10px;
    margin: 15px;
`;

const Item = styled.div`
    border-style: solid;
    background: var(--item-colour);
    border-radius: 5px;
    margin: 15px;
`;

const ItemNewColour = styled.div`
    border-style: solid;
    background: var(--alt-item-colour);
    border-radius: 5px;
    margin: 15px;
`;

const ItemText = styled.div`
    font-size: 22px;
    user-select: none;
    padding: 16px;
`;

const BoldText = styled.p`
    font-weight: bold;
    margin: 10px;
`;

type ListProps = {
    type: string
}

function List({ type }: ListProps) {
    const navigate = useNavigate();

    const [items, setItems] = useState<Array<Problem> | Array<User> | null>(null);
    const [filteredItems, setFilteredItems] = useState<Array<Problem> | Array<User> | null>(null);
    const [currentItem, setCurrentItem] = useState<User | Problem | null>(null);
    const [token, setToken] = useState<string | null>('');
    const [hidden, setHidden] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [surroundingPages, setSurroundingPages] = useState<Array<number> | null>(null);
    const [submissions, setSubmissions] = useState<Array<Submission> | null>(null);
    const id = useParams().id;
    const modalRoot = document.getElementById("modal-root");

    const Modal = ({ child }: { child: JSX.Element }) => {
        if (modalRoot) {
            return ReactDOM.createPortal(
                <div className="modal"><div className="modal-content">{child}</div></div>,
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
        let storedToken = window.localStorage.getItem('token');
        if (storedToken === '') navigate('/judge-manager/auth');

        const fetchData = async () => {
            let data = null as null | SubmissionList | ExpiredTokenResponse;
            try {
                const response = await fetch(url + 'admin/status', {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + storedToken
                    }
                });
                data = await response.json();
                if ((data && 'detail' in data && data.detail === "Invalid token") || (data && 'detail' in data && data.detail === "Token has expired")) navigate('/judge-manager/auth');
                
                if (data && 'data' in data) setSubmissions(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentItem, navigate]);

    useEffect(() => {

        let storedToken = window.localStorage.getItem('token');
        if (storedToken !== "") setToken(storedToken);
        else navigate('/judge-manager/auth');

        const fetchData = async () => {
            let data = null as ProblemResponse | UserResponse | ExpiredTokenResponse | null;
            try {
                let toAppend = '';
                if (type === 'user') toAppend = `admin/users/?page=${currentPage}`;
                else toAppend = `problem/?page=${currentPage}`;
                const response = await fetch(url + toAppend, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + storedToken
                    }
                });
                data = await response.json();
                if ((data && 'detail' in data && data.detail === "Invalid token") || (data && 'detail' in data && data.detail === "Token has expired")) navigate('/judge-manager/auth');
                
                if (data && 'maxpage' in data) setTotalPages(data.maxpage - 1);
                if (data && 'data' in data && data.data) {
                    
                    setItems(data.data);
                    if (id !== 'all' && id !== 'new' && id !== undefined) {
                        (data.data as Array<User> | Array<Problem>).forEach((item: User | Problem) => {
                            if (item.id === parseInt(id ? id : '0')) {
                                setCurrentItem(item);
                            }
                        });
                    } else {
                        setCurrentItem(data.data[0]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        setCurrentItem(null);
        setFilteredItems(null);

        if (storedToken !== '') {
            fetchData();
        }


    }, [type, token, id, navigate, currentPage]);

    return (
        <div id="modal-root">
            {token === '' 
            ? <div>
                <Loading>Loading</Loading>
            </div> 
            : <div>
                <Header text={type === 'user' ? 'Problem' : 'User'} />
                    <Container>
                        <Panel>
                            <h1>{type === 'user' ? 'Users' : 'Problems'}</h1>
                            {type === 'problem' 
                            ? <AppButton onClick={() => navigate('/judge-manager/app/problem/new')}> Create problem</AppButton> 
                            : null}
                            {filteredItems != null 
                            ? (filteredItems.map(item => {
                                let ItemType : any = null;
                                if (currentItem != null && currentItem.id === item.id) ItemType = SelectedItem;
                                else ItemType = Item;
                                return <ItemType onClick={() => setCurrentItem(item)}>
                                        {type === 'user' && 'username' in item 
                                        ? <ItemText><BoldText>{item.username}</BoldText> Joined with email {item.email} on {item.create_time.slice(0, 10)} </ItemText> 
                                            : 'title' in item 
                                            ? <ItemText><BoldText>{item.title}</BoldText> Created on {item.created.slice(0, 10)} by {item.author_name}</ItemText> 
                                        : null}
                                </ItemType>
                            })) 
                            : <div>{items != null 
                                ? (items.map(item => {
                                    let ItemType : any = null;
                                    if (currentItem != null && currentItem.id === item.id) ItemType = SelectedItem;
                                    else ItemType = Item;
                                    return <ItemType onClick={() => setCurrentItem(item)}>
                                        {type === 'user' && 'username' in item 
                                        ? <ItemText><BoldText>{item.username}</BoldText> Joined with email {item.email} on {item.create_time.slice(0, 10)} </ItemText>
                                        : 'title' in item
                                            ? <ItemText><BoldText>{item.title}</BoldText> Created on {item.created.slice(0, 10)} by {item.author_name}</ItemText>
                                            : null}
                                    </ItemType>
                                })) 
                                : null}</div>}
                            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} surroundingPages={surroundingPages} totalPages={totalPages}/>
                        </Panel>
                        
                        <PanelLarge>
                            {currentItem == null || (type === 'user' && 'is_superuser' in currentItem && currentItem.is_superuser == null) ? (<h1>No item selected</h1>) : (<div>{'is_superuser' in currentItem ? <UserData currentUser={currentItem} hidden={hidden} setHidden={setHidden} items={items as Array<User>} setFilteredItems={setFilteredItems} /> : <ProblemData problem={currentItem} hidden={hidden} setHidden={setHidden} />}</div>)}
                            {!hidden ? 
                            <PanelNewColour>
                                <h1>Submissions</h1>
                                <GridContainer>
                                {currentItem != null && submissions != null ? 'username' in currentItem ? (submissions
                                                                                                                                .filter(submission => submission.author_name === currentItem.username)
                                                                                                                                .map(submission => {return <ItemNewColour><BoldText>{submission.problem_title}</BoldText> {submission.language}, {submission.submit_time.slice(0, 16)}, {submission.verdict}</ItemNewColour>})) : 
                                                                                                                    (submissions
                                                                                                                                .filter(submission => submission.problem_title === currentItem.title)
                                                                                                                                .map(submission => {return <ItemNewColour><BoldText>{submission.author_name}</BoldText> {submission.language}, {submission.submit_time.slice(0, 16)}, {submission.verdict}</ItemNewColour>})) : null}
                                </GridContainer>
                            </PanelNewColour> : null}
                        </PanelLarge>
                    </Container>
                </div>}
            {id != null && id !== 'all' ? <Modal child={<ProblemEditor toEdit={id === "new" ? null : currentItem} id={id} />} /> : null}
        </div>
    );
}

export default List;
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from '../components/Header';
import styles from '../styles';
import { UserData, ProblemData, ProblemEditor } from '.';
import ReactDOM from "react-dom";
import "../modalStyle.css";
import { Submission, SubmissionList, User, UserResponse, Problem, ProblemResponse, ExpiredTokenResponse } from "../models";

const url = 'https://34.124.232.186:5000/';

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

    function handlePageChange(newPage : number) {
        if (newPage < 1) newPage = 0;
        else if (totalPages && newPage > totalPages) newPage = totalPages;
        setCurrentPage(newPage);
    }

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
                console.log("Submission data: ");
                console.log(data);
                if (data && 'data' in data) setSubmissions(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    });

    useEffect(() => {

        let storedToken = window.localStorage.getItem('token');
        if (storedToken !== "") setToken(storedToken);
        else navigate('/judge-manager/auth');
        console.log("Token: " + storedToken);

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
                console.log("Data: ");
                console.log(data);
                if (data && 'maxpage' in data) setTotalPages(data.maxpage - 1);
                if (data && 'data' in data && data.data) {
                    console.log("Data.data:");
                    console.log(data.data);
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

        console.log("current: " + currentItem);


    }, [type, token, id, navigate, currentPage]);

    return (
        <div id="modal-root">
            {token === '' ?
                <div>
                    <p style={{ fontSize: '26px', color: 'white' }}>Loading</p>
                </div> :
                <div>
                    <Header text={type === 'user' ? 'Problem' : 'User'} />
                    <div style={styles.containerStyle}>
                        <div style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: '32px',
                            borderStyle: 'solid',
                            borderRadius: 10,
                            borderColor: 'grey',
                            background: '#9ccbd9',
                            margin: 15
                        }}>
                            <h1>{type === 'user' ? 'Users' : 'Problems'}</h1>
                            {type === 'problem' ? <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem/new')}> Create problem</button> : null}
                            {filteredItems != null ? (filteredItems.map(item => {
                                return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id === item.id ? { borderStyle: 'solid', background: '#b3b5b4', color: "#2424c7", borderColor: '#2424c7', borderRadius: 10, margin: 15 } : { borderStyle: 'solid', background: '#b3b5b4', borderRadius: 10, margin: 15 }}>
                                    <p style={{ fontSize: '22px', userSelect: 'none' }}>{type === 'user' && 'username' in item ? item.username : 'title' in item ? item.title : null}</p>
                                </div>
                            })) : <div>{items != null ?
                                (items.map(item => {
                                    return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id === item.id ? { borderStyle: 'solid', background: '#b3b5b4', color: "#2424c7", borderColor: '#2424c7', borderRadius: 10, margin: 15 } : { borderStyle: 'solid', background: '#b3b5b4', borderRadius: 10, margin: 15 }}>
                                        <p style={{ fontSize: '22px', userSelect: 'none' }}>{type === 'user' && 'username' in item ? item.username : 'title' in item ? item.title : null}</p>
                                    </div>
                                })) : null}</div>}
                            <div>
                                <button style={styles.smallButton} onClick={() => handlePageChange(1)}>First</button>
                                <button style={styles.smallButton} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                {surroundingPages && surroundingPages[0] != 1 ?
                                <button style={styles.smallButton}>...</button> : null}
                                {surroundingPages != null ?
                                (surroundingPages.map(page => {
                                    let style = styles.smallButton;
                                    if (page === currentPage) style = styles.smallButtonActive;
                                    return <button style={style} onClick={() => handlePageChange(page)}>{page}</button>;
                                })) : null}
                                {surroundingPages && surroundingPages[surroundingPages.length - 1] != totalPages ?
                                <button style={styles.smallButton}>...</button> : null}
                                <button style={styles.smallButton} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                <button style={styles.smallButton} onClick={() => {if (totalPages) handlePageChange(totalPages)}}>Last</button>
                            </div>
                        </div>

                        
                        <div style={{
                            flex: 3,
                            textAlign: 'center',
                            fontSize: '32px',
                            borderStyle: 'solid',
                            borderRadius: 10,
                            borderColor: 'grey',
                            background: '#9ccbd9',
                            margin: 15
                        }}>
                            {currentItem == null || (type === 'user' && 'is_superuser' in currentItem && currentItem.is_superuser == null) ? (<h1>No item selected</h1>) : (<div>{'is_superuser' in currentItem ? <UserData currentUser={currentItem} hidden={hidden} setHidden={setHidden} items={items as Array<User>} setFilteredItems={setFilteredItems} /> : <ProblemData problem={currentItem} hidden={hidden} setHidden={setHidden} />}</div>)}
                            {!hidden ? 
                            <div style={{
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                background: '#b3b5b4',
                                margin: 15
                            }}>
                                <h1>Submissions</h1>
                                {currentItem != null && submissions != null ? 'username' in currentItem ? (submissions
                                                                                                                                .filter(submission => submission.author_name === currentItem.username)
                                                                                                                                .map(submission => {return <p>{submission.problem_title}</p>})) : 
                                                                                                                    (submissions
                                                                                                                                .filter(submission => submission.problem_title === currentItem.title)
                                                                                                                                .map(submission => {return <p>{submission.author_name}</p>})) : null}
                            </div> : null}
                        </div>
                    </div>
                </div>}
            {id != null && id !== 'all' ? <Modal child={<ProblemEditor toEdit={id === "new" ? null : currentItem} id={id} />} /> : null}
        </div>
    );
}

export default List;
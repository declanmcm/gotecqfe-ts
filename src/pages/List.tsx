import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header';
import styles from '../styles';
import { UserData, ProblemData, ProblemEditor } from '.';
import ReactDOM from "react-dom";
import "../modalStyle.css";
import { User, UserResponse, Problem, ProblemResponse, ExpiredTokenResponse } from "../models";

const url = 'https://34.124.232.186:5000/';

type ListProps = {
    type: string
}

function List( { type }: ListProps ) {
    const navigate = useNavigate();

    const [items, setItems] = useState<Array<Problem>  | Array<User> | null>(null);
    const [filteredItems, setFilteredItems] = useState<Array<Problem> | Array<User> | null>(null);
    const [currentItem, setCurrentItem] = useState<User | Problem | null>(null);
    const [token, setToken] = useState<string | null>('');
    const [hidden, setHidden] = useState<boolean>(false);
    const id = useParams().id;

    const modalRoot = document.getElementById("modal-root");

    const Modal = ({child} : {child: JSX.Element}) => {
        if(modalRoot) {
            return ReactDOM.createPortal(
                <div className="modal"><div className="modal-content">{child}</div></div>,
                modalRoot
              );
        } else {
            return null;
        }
        
      };

    useEffect(() => {

        let storedToken = window.localStorage.getItem('token');
        if ( storedToken !== "" ) setToken(storedToken);
        else navigate('/judge-manager/auth');
        console.log("Token: " + storedToken);

        const fetchData = async () => {
            let data = null as ProblemResponse | UserResponse | ExpiredTokenResponse | null;
            try {
                let toAppend = '';
                if (type === 'user') toAppend = 'admin/users';
                else toAppend = 'problem';
                const response = await fetch(url + toAppend, {
                    method: "GET",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + storedToken }});
                data = await response.json();
                if ((data && 'detail' in data && data.detail === "Invalid token") || (data && 'detail' in data && data.detail === "Token has expired")) navigate('/judge-manager/auth');
                console.log("Data: ");
                console.log(data);
                if (data && 'data' in data && data.data) {
                    console.log("Data.data:");
                    console.log(data.data);
                    setItems(data.data);
                    if (id !== 'all' && id !== 'new' && id !== undefined) {
                        (data.data as Array<User> | Array<Problem>).forEach((item : User | Problem) => {
                            if (item.id === parseInt(id ? id : '0')) {
                                setCurrentItem(item);
                            }
                        });
                    } else {
                        console.log("HEYYYYYY");
                        setCurrentItem(data.data[0]);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                
            }
        };

        setCurrentItem(null);
        setFilteredItems(null);

        if (storedToken !== '') {
            fetchData();
        }
                
        console.log("current: " + currentItem);


        }, [type, token, id, navigate]);

    return (
        <div id="modal-root">
            {token === '' ? 
            <div>
                <p style={{fontSize: '26px', color: 'white'}}>Loading</p>
            </div> :
            <div>
                <Header text={type === 'user' ? 'Problem' : 'User'}/>
                <div style={styles.containerStyle}>
                    <div style={{
                                flex: 1,
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                margin: 15}}>
                        <h1>{type === 'user' ? 'Users' : 'Problems'}</h1>
                        {type === 'problem' ? <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem/new') }> Create problem</button> : null}
                        {filteredItems != null ? (filteredItems.map(item => {
                            return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id === item.id ? {borderStyle: 'solid', borderColor: "#2424c7", borderRadius: 10, margin: 15} : {borderStyle: 'solid', borderRadius: 10, margin: 15}}>
                                <p style={{fontSize: '22px', userSelect: 'none'}}>{type === 'user' && 'username' in item ? item.username : 'title' in item ? item.title : null}</p>
                            </div>
                        })) : <div>{items != null ? 
                        (items.map(item => {
                            return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id === item.id ? {borderStyle: 'solid', borderColor: "#2424c7", borderRadius: 10, margin: 15} : {borderStyle: 'solid', borderRadius: 10, margin: 15}}>
                                <p style={{fontSize: '22px', userSelect: 'none'}}>{type === 'user' && 'username' in item ? item.username : 'title' in item ? item.title : null}</p>
                            </div>
                        })) : null}</div>}
                    </div>

                    <div style={{
                                flex: 3,
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                margin: 15}}>
                        {currentItem == null || (type === 'user' && 'is_superuser' in currentItem && currentItem.is_superuser == null) ? (<h1>No item selected</h1>) : (<div>{'is_superuser' in currentItem ? <UserData currentUser={currentItem} hidden={hidden} setHidden={setHidden} items={items as Array<User>} setFilteredItems={setFilteredItems} /> : <ProblemData problem={currentItem} hidden={hidden} setHidden={setHidden} />}</div>)}
                        
                    </div>
                </div>
            </div>}
            {id !=  null && id !== 'all' ? <Modal child={<ProblemEditor toEdit={id === "new" ? null : currentItem} id={id} />}/> : null}
        </div>
    );
}

export default List;
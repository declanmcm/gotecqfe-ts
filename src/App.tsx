import { Routes, Route  } from "react-router-dom";
import { Navigate } from 'react-router';
import { JudgeApp, JudgeAuth, List } from './pages';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/judge-manager/auth"/>}/>
            <Route path="/gotecqfe" element={<Navigate to="/judge-manager/auth"/>}/>
            <Route path="/judge-manager/app" element={<JudgeApp/>}/>
            <Route path="/judge-manager/auth" element={<JudgeAuth/>}/>
            <Route path="/judge-manager/app/user" element={<List type='user' />}/>
            <Route path="/judge-manager/app/problem/:id" element={<List type='problem' />}/>
        </Routes>
    );
}

export { App };
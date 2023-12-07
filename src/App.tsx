import { Routes, Route  } from "react-router-dom";
import { Navigate } from 'react-router';
import { useState } from "react";
import { JudgeApp, JudgeAuth, List } from './pages';
import React from "react";
import { AuthUser } from './models';

function App() {
    const [user, setUser] = useState<AuthUser | null>(null);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/judge-manager/auth"/>}/>
            <Route path="/gotecqfe" element={<Navigate to="/judge-manager/auth"/>}/>
            <Route path="/judge-manager/app" element={<JudgeApp/>}/>
            <Route path="/judge-manager/auth" element={<JudgeAuth setUser={setUser} />}/>
            <Route path="/judge-manager/app/user" element={<List user={user} type='user' />}/>
            <Route path="/judge-manager/app/problem/:id" element={<List user={user} type='problem' />}/>
        </Routes>
    );
}

export { App };
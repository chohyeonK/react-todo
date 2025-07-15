import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import TodoGuest from '../pages/Todo/TodoGuest'
import TodoUser from '../pages/Todo/TodoUser'
import useUserStore from '../stores/useUserStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AppRouter = () => {
    // 앱 시작 시 로그인 상태 유지하도록 처리
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else clearUser();

            return () => unsubscribe();
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todo" element={<TodoGuest />} />
                <Route path="/todo/:userId" element={
                    <ProtectedRoute>
                        <TodoUser />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter

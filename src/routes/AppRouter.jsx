import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import TodoGuest from '../pages/Todo/TodoGuest'
import TodoUser from '../pages/Todo/TodoUser'

const AppRouter = () => {
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

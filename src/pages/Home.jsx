import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">📝 MyTodo</h1>
            <p className="text-gray-600 text-lg mb-8">할 일을 간단하게 관리하고 기록해보세요!</p>

            <div className="space-x-4">
                <Button label='체험하기' color='blue' onClick={() => navigate("/todo")} type='button' />
                <Button label='로그인' color='gray' onClick={() => navigate("/login")} type='button' />
                <Button label='회원가입' color='green' onClick={() => navigate("/signup")} type='button' />
            </div>
        </div>
    )
}

export default Home

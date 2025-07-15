import React from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../stores/useUserStore';
import Button from './ui/Button';

const Header = () => {
    const navigate = useNavigate();
    const { user, clearUser } = useUserStore();

    const handleLogout = () => {
        clearUser();
        navigate("/login");
    };

    return (
        <header className="w-full mb-10 px-6 py-4 bg-white shadow-md flex justify-between items-center ">
            {/* 로고 또는 앱 이름 */}
            <div
                className="text-lg font-bold text-indigo-600 cursor-pointer"
                onClick={() => navigate('/')}
            >
                MyTodo
            </div>

            {/* 사용자 정보 및 로그아웃 버튼 */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-gray-700">{user.email}</span>
                        <Button label="로그아웃" color="red" type="button" onClick={handleLogout} />
                    </>
                ) : (
                    <Button label="로그인" color="indigo" type="button" onClick={() => navigate('/login')} />
                )}
            </div>
        </header>
    )
}

export default Header

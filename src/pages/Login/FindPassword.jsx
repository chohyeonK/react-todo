import React, { useState } from 'react'
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"
import { useNavigate } from "react-router-dom"

const FindPassword = () => {
    const navigate = useNavigate('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const handleFindPw = (e) => {
        e.preventDefault();
        console.log('jj')
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Button label='홈' color='gray' type='button' onClick={() => navigate('/')} />

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    비밀번호 찾기
                </h2>
            </div>



            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleFindPw} className="space-y-6">
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                label="이메일"
                                autoComplete="current-password"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button label="인증" color="gray" type="button" />
                    </div>

                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        label="비밀번호"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled
                    />

                    <InputField
                        id="password2"
                        name="password2"
                        type="password"
                        label="비밀번호 확인"
                        autoComplete="current-password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        disabled
                    />

                    <div>
                        <Button label='비밀번호 찾기' color='indigo' type='submit' />
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    아직 계정이 없으신가요?{' '}
                    <span className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => navigate('/signup')}>
                        회원가입
                    </span>
                </p>
            </div>
        </div>
    )
}

export default FindPassword

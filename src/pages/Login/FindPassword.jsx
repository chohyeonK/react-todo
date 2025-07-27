import React, { useState } from 'react'
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"
import { useNavigate } from "react-router-dom"
import { initializeApp, db, auth, doc, setDoc, createUserWithEmailAndPassword } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const FindPassword = () => {
    const navigate = useNavigate('');
    const [email, setEmail] = useState('');
    const findPassword = async (e, email) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.');
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                alert('존재하지 않는 이메일입니다. 이메일을 다시 확인해주세요.');
            } else {
                alert('에러: ', err)
            }
        }
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
                <form onSubmit={(e) => findPassword(e, email)} className="space-y-6">
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
                    </div>
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

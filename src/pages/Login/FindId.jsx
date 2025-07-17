import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { initializeApp, db, auth, doc, setDoc, createUserWithEmailAndPassword } from "../../firebase";
import { collection, query, where, getDocs } from "../../firebase";
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"

const FindId = () => {
    const navigate = useNavigate('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [search, setSearch] = useState(false);

    const q = query(
        collection(db, "users"),
        where("name", "==", name),
        where("phone", "==", phone)
    );
    const handleFindId = async (e) => {
        e.preventDefault();
        const result = await getDocs(q);
        setSearch(true);
        if (!result.empty) {
            const userDoc = result.docs[0];
            const userData = userDoc.data();
            setEmail(userData.email);
        }
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Button label='홈' color='gray' type='button' onClick={() => navigate('/')} />

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    이메일 찾기
                </h2>
            </div>



            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleFindId} className="space-y-6">
                    <InputField
                        id="name"
                        name="name"
                        type="text"
                        label="이름"
                        value={name}
                        autoComplete="current-password"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputField
                        id="phone"
                        name="phone"
                        type="text"
                        value={phone}
                        label="전화번호"
                        autoComplete="current-password"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <div>
                        <Button label='이메일 찾기' color='indigo' type='submit' />
                    </div>
                </form>


                {search && (email ? <p className='mt-10 text-center text-sm/12'>{email}</p> : <p className='mt-10 text-center text-sm/12'>일치하는 사용자를 찾을 수 없습니다.</p>)}

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

export default FindId

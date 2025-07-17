// 홈 버튼 추가, 인풋선 안보임

import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { useState } from "react";
import useUserStore from "../../stores/useUserStore";

const Login = () => {
  const navigate = useNavigate();
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUser({
        uid: user.uid,
        email: user.email
      });

      navigate(`/todo/${user.uid}`);
    } catch (err) {
      console.log(err)
      alert('이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Button label='홈' color='gray' type='button' onClick={() => navigate('/')} />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          로그인
        </h2>
      </div>



      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField
            id="email"
            name="email"
            type="email"
            label="이메일"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          >
            <div className="text-sm">
              <span onClick={() => navigate('/findId')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                이메일 찾기
              </span>
            </div>
          </InputField>

          <InputField
            id="password"
            name="password"
            type="password"
            value={password}
            label="비밀번호"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          >
            <div className="text-sm">
              <span onClick={() => navigate('/findPw')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                비밀번호 찾기
              </span>
            </div>
          </InputField>

          <div>
            <Button label='로그인 하기' color='indigo' type='submit' />
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

export default Login

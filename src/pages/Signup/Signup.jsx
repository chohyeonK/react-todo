import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"
import { useState } from "react";
import { initializeApp, db, auth, doc, setDoc, createUserWithEmailAndPassword } from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const isMatch = password === password2;
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      // [주] 폼 validation 추가 필요

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: name,
        phone: phone,
        createAt: new Date()
      });

      alert('회원가입을 성공하였습니다.');
      navigate('/login');
    } catch (err) {
      alert('회원가입에 실패하였습니다.')
      console.log(err)
    }
  }

  // [주] 아이디 중복 확인 함수 개발

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Button label='홈' color='gray' type='button' onClick={() => navigate('/')} />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <InputField
              id="name"
              name="name"
              type="text"
              label="이름"
              autoComplete="current-password"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <InputField
              id="phone"
              name="phone"
              type="text"
              label="전화번호"
              autoComplete="current-password"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              <p className="text-center text-sm/6 text-gray-500">- 없이 숫자만 입력해주세요.</p>
            </InputField>
          </div>
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
            <Button label="중복확인" color="gray" type="button" />
          </div>


          <InputField
            id="password"
            name="password"
            type="password"
            label="비밀번호"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            id="password2"
            name="password2"
            type="password"
            label="비밀번호 확인"
            autoComplete="current-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          {password2 && !isMatch && (
            <p className="mt-1 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
          )}

          <div>
            <Button label='회원가입 하기' color='indigo' type='submit' />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          이미 계정이 있으신가요?{' '}
          <span className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => navigate('/login')}>
            로그인
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup

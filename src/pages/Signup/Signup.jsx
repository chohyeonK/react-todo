import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import InputField from "../../components/ui/InputField"

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Button label='홈' color='gray' type='button' onClick={() => navigate('/')} />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>



      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <InputField
            id="email"
            name="email"
            type="email"
            label="이메일"
            autoComplete="email"
           />

          <InputField
            id="password"
            name="password"
            type="password"
            label="비밀번호"
            autoComplete="current-password"
          />

          <InputField
            id="password2"
            name="password2"
            type="password"
            label="비밀번호 확인"
            autoComplete="current-password"
          />

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

import { WrapperContainer, WrapperTextLight } from './style'
import { Image, message } from 'antd'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/LoadingComponent/Loading'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getMe, login } from '../../apis/userApi'
import { useAuth } from '../../contexts/AuthContext'

const SignInPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('user@gmail.com');
    const [password, setPassword] = useState('111111');
    const { user, setUser } = useAuth();

    const useLogin = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            message.success(data.message);
            const res = await getMe();
            setUser(res.data);
            navigate('/');
        },
        onError: (error) => {
            console.log(error)
            message.error(error.response.data.message)
        }
    })

    console.log(user)


    const handelSignIn = () => {
        useLogin.mutate({ email, password });
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#ccc' }}>
            <div style={{ display: 'flex', width: '500px', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainer>
                    <h1 style={{ margin: '0' }}>Xin chào,</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder='abc@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: '10px' }}
                            placeholder='password'
                            type={isShowPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* {data?.status === 'ERR' && <span style={{ color: 'red', marginTop: '5px' }}>{data?.message}</span>} */}
                    <Loading isLoading={loading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handelSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 66, 78)',
                                borderRadius: '2px',
                                border: 'none',
                                width: '100%',
                                height: '48px',
                                margin: '20px 0 10px'
                            }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainer>
            </div>
        </div>
    )
}

export default SignInPage
import React, { useEffect, useState } from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/LoadingComponent/Loading'
import { registerUser } from '../../apis/userApi'
import { useMutation } from '@tanstack/react-query'
import * as message from '../../components/Message/MessageComponent'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // call api
  const register = async (data) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      message.success(response.message);
      navigate('/sign-in');
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      // setLoading(false);
    }
  }

  // query
  const mutationRegister = useMutation({
    mutationKey: ['register-user'],
    mutationFn: register
  })

  const handleSignUp = () => {
    if (!username || !email || !password) {
      message.error('Vui lòng nhập đầy đủ thông tin bên dưới');
      return;
    }
    if (password !== confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp');
      return;
    }
    mutationRegister.mutate({ username, email, password })
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#ccc' }}>
      <div style={{ display: 'flex', width: '500px', height: '460px', borderRadius: '6px', background: '#fff' }}>
        <WrapperContainer>
          <h1 style={{ margin: '0' }}>Tạo tài khoản</h1>
          <p>Vui lòng nhập các thông tin bên dưới</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder='tên người dùng'
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder='abc@gmail.com'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
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
          </div>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder='mật khẩu'
            value={password}
            type={isShowPassword ? 'text' : 'password'}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder='nhập lại mật khẩu'
            value={confirmPassword}
            type={isShowConfirmPassword ? 'text' : 'password'}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
          {/* {data?.status === 'ERR' && <span style={{ color: 'red', marginTop: '5px' }}>{data?.message}</span>} */}
          <Loading isLoading={loading}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 66, 78)',
                borderRadius: '2px',
                border: 'none',
                width: '100%',
                height: '48px',
                margin: '20px 0 10px'
              }}
              textButton={'Đăng ký'}
              styleTextButton={{ color: '#fff' }}
            ></ButtonComponent>
          </Loading>
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignUpPage
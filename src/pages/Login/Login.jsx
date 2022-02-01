import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import axiosInstance from '../../helpers/axiosInstance';
import { setLocalStorage, getLocalStorage } from '../../helpers/localStorage';
import styles from './Login.module.less';
import MainHeader from '../../components/Header/MainHeader';
import { MainInput } from '../../elements/MainInput';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(null);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
      setErrorMessage('');
      setLoginLoader(true);

    try {
      const response = await axiosInstance.post(`auth/login`, values);
      const userDetails = response.data.data;

      if (response.status === 200) {
        setLocalStorage('accessToken', userDetails.token);
        setLocalStorage('currentUserId', userDetails.user._id);
        setLocalStorage('verified', userDetails.user.status);
        if (userDetails.user.status === 'verified') {
          navigate(`/${userDetails.user._id}`)
        } else {
          navigate(`/users/${userDetails.user._id}`);
        }
      }

    } catch (error) {
      if (typeof error.response.data.errors === 'string') {
        setErrorMessage(error.response.data.errors);
      } else {
        setEmailFormatError(error.response.data.errors.email[0]);
      }
      setLoginLoader(false);
      form.validateFields();
    }
  };

  function onChange () {
    if (emailFormatError) {
      setEmailFormatError(null);
    }
  }

  function validateEmailFormatError () {
    return ({
      validator() {
        if (!emailFormatError) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(emailFormatError),
          );
        }
      },
    })
  }

  const validateRequiredFields = (message) => ({required: true, message})

  return (
    <>
    <MainHeader inPublicPages={true} />
    { getLocalStorage('accessToken') ? <Navigate to='/' /> :
    <div className={styles.formContainer}>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        form={form}
        validateTrigger='onSubmit'
        requiredMark={false}
      >
        <Form.Item className={styles.loginFormTitle} wrapperCol={{ offset: 8, span: 16 }} >
          <h1>Login</h1>
        </Form.Item>

        <Form.Item
          className={styles.loginFormItem}
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your e-mail!'), validateEmailFormatError() ]}
        >
          <MainInput onChange={onChange}/>
        </Form.Item>

        <Form.Item
          className={styles.loginFormItem}
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password!') ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item  className={styles.loginFormItem} wrapperCol={{ offset: 0, span: 24 }} 
                    hidden={!errorMessage} >
          <div className={styles.errMessage} >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item className={styles.loginFormItem} wrapperCol={{ offset: 9, span: 16 }} >
          <Button className={styles.loginBtn} type='primary' htmlType='submit' loading={loginLoader}>
            Login
          </Button>
        </Form.Item>
        <Form.Item
          className={styles.loginFormItem} wrapperCol={{ offset: 4, span: 24 }} >
          Don`t have an account <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
    }
    </>);
}
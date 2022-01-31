import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';

import MainHeader from '../../components/Header/MainHeader'
import styles from './Signup.module.less';
import './Signup.less'
import axiosInstance from '../../helpers/axiosInstance';
import { MainButton } from '../../elements/MainButton';
import { MainInput } from '../../elements/MainInput';
import { PasswordInput } from '../../elements/PasswordInput';

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] = useState('');

  const navigate = useNavigate();

  const onFinish = async (values) => {
      setSignUpLoader(true);

    try {
      setErrorMessage('');
      setEmailErrMessage('');
      setPasswordErrMessage('');
      setConfirmPasswordErrMessage('');
      // const response = await axiosInstance.post('auth/register', values);
      const response = await axiosInstance.post('signup', values);

      if (response.status === 201) {
        navigate('/confirm');
      }
    } catch ({ response }) {
      console.log('response', response);
      if (response.data.errors.email){
        setEmailErrMessage(response.data.errors.email[0]);
      }

      if (response.data.errors.password){
        setPasswordErrMessage(response.data.errors.password[0]);
      }

      if (response.data.errors.confirmPassword){
        setConfirmPasswordErrMessage(response.data.errors.confirmPassword[0]);
      }
      setErrorMessage(response.data.errors);
      setSignUpLoader(false);
    }
  };

  const validateRequiredFields = (message) => ({required: true, message})

  return (
    <>
    <MainHeader inPublicPages={true} />
    <div className={styles.formContainer}>
      <Form
        name='basic'
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item className={styles.signUpFormTitle} wrapperCol={{ offset: 8, span: 16 }} >
          <h1>Sign Up</h1>
        </Form.Item>
        <Form.Item className={styles.signUpFormItem}
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your username!') ]}
        >
          <MainInput />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 0, span: 24 }} hidden={!emailErrMessage} >
          <div className={styles.errMessage} >
            {emailErrMessage}
          </div>
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password!')]}
        >
          <PasswordInput />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 0, span: 24 }} hidden={!passwordErrMessage} >
          <div className={styles.errMessage} >
            {passwordErrMessage}
          </div>
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Confirm Password'
          name='confirmPassword'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Confirm password must be the same as password!') ]}
        >
          <PasswordInput />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 0, span: 24 }} hidden={!confirmPasswordErrMessage && !errorMessage} >
          <div className={styles.errMessage} >
            {confirmPasswordErrMessage || errorMessage}
          </div>
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 9, span: 16 }} >
          <MainButton margin={'15px 0 0 0'}
                type='primary' htmlType='submit' loading={signUpLoader}>
            Sign Up
          </MainButton>
        </Form.Item>
        <Form.Item className={styles.signUpFormItem} wrapperCol={{ span: 24, offset: 5 }}>
          Already have an account? <Link to='/login'>Log in</Link>
        </Form.Item>
      </Form>
    </div>
    </>
  );
}

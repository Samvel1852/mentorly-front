import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import MainHeader from '../../components/Header/MainHeader'
import styles from './Signup.module.less';
import './Signup.less'
import axiosInstance from '../../helpers/axiosInstance';

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpLoader, setSignUpLoader] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
      setSignUpLoader(true);

    try {
      setErrorMessage('');
      const response = await axiosInstance.post('signup', values);

      if (response.status === 201) {
        navigate('/confirm');
      }
    } catch ({ response }) {
      setErrorMessage(response.data.errors[0]);
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
        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 8, span: 16 }} >
          <h1>Sign Up</h1>
        </Form.Item>
        <Form.Item className={styles.signUpFormItem}
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your username!') ]}
        >
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password!')]}
        >
          <Input.Password className={styles.passwordInput} />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Confirm Password'
          name='confirmPassword'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Confirm password must be the same as password!') ]}
        >
          <Input.Password className={styles.passwordInput} />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 2, span: 15 }} hidden={!errorMessage} >
          <div className={styles.errMessage} >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item className={styles.signUpFormItem} wrapperCol={{ offset: 8, span: 16 }} >
          <Button className={styles.signUpBtn} type='primary' htmlType='submit' loading={signUpLoader}>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item className={styles.signUpFormItem} wrapperCol={{ span: 24, offset: 4 }}>
          Already have an account? <Link to='/login'>Log in</Link>
        </Form.Item>
      </Form>
    </div>
    </>
  );
}

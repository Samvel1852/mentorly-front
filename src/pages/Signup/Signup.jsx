import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import styles from './Signup.module.less';
import { myAxios } from '../../helpers/axiosInstance';

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onFinish = async (values) => {

    try {
      setErrorMessage('');
      const response = await myAxios.post('signup', values);

      if (response.status === 201) {
        navigate('/confirm');
      }
    } catch ({ response }) {
      setErrorMessage(response.data.errors[0]);
    }
  };

  const validateRequiredFields = (message) => ({required: true, message})

  return (
    <div className={styles.formContainer}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <h1>Sign Up</h1>
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your username!') ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password!')]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Confirm password must be the same as password!') ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 24 }} >
          <div className={styles.errMessage} >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button type='primary' htmlType='submit'>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 4 }}>
          Already have an account? <Link to='/login'>Log in</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

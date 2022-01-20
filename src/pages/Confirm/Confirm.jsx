import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

import styles from './Confirm.module.less';

export default function Confirm() {
  const [errorHidden, setErrorHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('values', values);
      const response = await axios.post('http://localhost:4000/verify', values);
      setErrorHidden(true);

      if (response.status === 200) {
        navigate('/login');
      }
      console.log('response', response);
    } catch ({ response }) {
      setErrorHidden(false);
      setErrorMessage(response.data.errors[0]);
      console.log('confirmRes', response);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.formContainer}>
      <Form
        name='basic'
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <h1>Confirm e-mail</h1>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 2,
          }}
        >
          <p>
            We have sent a verification code to your e-mail. <br /> Please
            insert the code to validate your e-mail address.
          </p>
        </Form.Item>
        <Form.Item
          label='Code'
          name='verificationCode'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 100 }}
          rules={[
            {
              required: true,
              message: 'Please input messaged code!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 2,
            span: 24,
          }}
        >
          <div style={{ color: 'red' }} hidden={errorHidden}>
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

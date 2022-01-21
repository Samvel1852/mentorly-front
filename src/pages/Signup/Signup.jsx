import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import styles from './Signup.module.less';

import { myAxios } from '../../helpers/axiosInstance';

export default function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await myAxios.post('signup', values);

    if (response.status === 200) {
      navigate('/confirm');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item wrapperCol={{ offset: 13, span: 16 }} >
        <h1>Sign Up</h1>
      </Form.Item>
      <Form.Item label='Email' name='email'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input className={styles.inputs} />
      </Form.Item>

      <Form.Item label='Password' name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password className={styles.inputs} />
      </Form.Item>

      <Form.Item label='Confirm Password' name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Confirm password must be the same as password!',
          },
        ]}
      >
        <Input.Password className={styles.inputs} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 13, span: 16 }} >
        <Button type='primary' htmlType='submit'>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

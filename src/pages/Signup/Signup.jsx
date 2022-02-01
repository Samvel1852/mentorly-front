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

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onChange = () => {
    if(typeof errorMessage !== 'string') {
      setErrorMessage('');
    }
  };

  const onFinish = async (values) => {
      setSignUpLoader(true);

    try {
      const response = await axiosInstance.post('auth/register', values);

      if (response.status === 201) {
        navigate('/confirm');
      }
    } catch ({ response }) {

      if (typeof response.data.errors === 'string') {
        setErrorMessage({errors: [response.data.errors]});
        setSignUpLoader(false);
      } else {
        setErrorMessage(response.data.errors);
        setSignUpLoader(false);
      }
      form.validateFields();
    }
  };

  const validateRequiredFields = (message) => ({required: true, message});

  function validateErrors (name) {
    return ({
      validator() {
        if (!(errorMessage[name] && errorMessage[name].length)) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(errorMessage[name][0]),
          );
        }
      },
    })
  }

  return (
    <>
    <MainHeader inPublicPages={true} />
    <div className={styles.formContainer}>
      <div className={styles.formPart}>
      <Form
        name='basic'
        onFinish={onFinish}
        autoComplete='off'
        form={form}
        validateTrigger='onSubmit'
        requiredMark={false}
      >
        <Form.Item className={styles.signUpFormTitle} wrapperCol={{ offset: 8, span: 16 }} >
          <h1>Sign Up</h1>
        </Form.Item>
        <Form.Item className={styles.signUpFormItem}
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your email.'), validateErrors('email'),
                validateErrors('errors') ]}
        >
          <MainInput onChange={() => onChange('email')} />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password.'), validateErrors('password')]}
        >
          <PasswordInput onChange={() => onChange()} />
        </Form.Item>

        <Form.Item className={styles.signUpFormItem}
          label='Confirm Password'
          name='confirmPassword'
          labelCol={{ span: 24 }}
          rules={[ validateRequiredFields('Confirm password must be the same as password.'), 
                  validateErrors('confirmPassword') ]} >
          <PasswordInput onChange={() => onChange()} />
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
    </div>
    </>
  );
}

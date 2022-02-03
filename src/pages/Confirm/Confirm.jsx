import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, message } from 'antd';

import MainHeader from '../../components/Header/MainHeader'
import styles from './Confirm.module.less';
import axiosInstance from '../../helpers/axiosInstance';
import { MainInput } from '../../elements/MainInput';
import { CheckCircleFilled } from '@ant-design/icons/lib/icons';

export default function Confirm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmLoader, setConfirmLoader] = useState(false);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onChange = () => {
    if(errorMessage !== null) {
      setErrorMessage(null);
    }
  };

  const onFinish = async (values) => {
    setConfirmLoader(true);
    try {
      const response = await axiosInstance.post('auth/verify', values);

      if (response.status === 200) {
        message.success({ content: 'You have successfully registered',
          style: { marginTop: '80vh' },
          icon: <CheckCircleFilled style={{ color: '#026670' }} />,
          duration: 6,
        });
        navigate('/login');
      }
    } catch ({ response }) {
      setConfirmLoader(false);
      setErrorMessage('Invalid Verification Code.');
      form.validateFields();
    }
  };

  const validateRequiredFields = (message) => ({required: true, message});

  function validateInvalidCodeError () {
    return ({
      validator() {
        if (!errorMessage) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(errorMessage),
          );
        }
      },
    })
  }

  return (
    <>
    <MainHeader inPublicPages={true} />
      <div className={styles.formContainer}>
      <Form name='basic' initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        autoComplete='off'
        validateTrigger='onSubmit'
        requiredMark={false}
      >
        <Form.Item className={styles.confirmFormItem, styles.title} wrapperCol={{ span: 16, offset: 8 }} >
          <h1>Confirm e-mail</h1>
        </Form.Item>
        <Form.Item className={styles.confirmFormItem} wrapperCol={{ offset: 5 }}>
          <p>
            We have sent a verification code to your e-mail. <br /> Please
            insert the code to validate your e-mail address.
          </p>
        </Form.Item>
        <Form.Item className={styles.confirmFormItem}
          label='Code'
          name='verificationCode'
          labelCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input messaged code.'), validateInvalidCodeError() ]}
        >
          <MainInput onChange={onChange} className={styles.input} />
        </Form.Item>

        <Form.Item className={styles.confirmFormItem} wrapperCol={{ offset: 9, span: 16 }} >
          <Button className={styles.confirmBtn} type='primary' htmlType='submit' loading={confirmLoader}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </>);
}

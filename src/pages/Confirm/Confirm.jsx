import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import styles from './Confirm.module.less';
import axiosInstance from '../../helpers/axiosInstance';
import Modal from 'antd/lib/modal/Modal';

export default function Confirm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmLoader, setConfirmLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] =useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setConfirmLoader(true);
    try {
      const response = await axiosInstance.post('verify', values);
      setErrorMessage('');

      if (response.status === 200) {
        setIsModalVisible(true);
      }
    } catch ({ response }) {
      setErrorMessage(response.data.errors[0]);
      setConfirmLoader(false);
    }
  };

  const validateRequiredFields = (message) => ({required: true, message});

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  return (
      <div className={styles.formContainer}>
      <Modal
        title='You have successfully registered'
        visible={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>Click on Ok button below to Log in</p>
      </Modal>
      <Form name='basic' initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item wrapperCol={{ span: 16, offset: 6 }} >
          <h1>Confirm e-mail</h1>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
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
          rules={[ validateRequiredFields('Please input messaged code!') ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 24 }} hidden={!errorMessage} >
          <div className={styles.errorMessage} >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }} >
          <Button type='primary' htmlType='submit' loading={confirmLoader}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>);
}

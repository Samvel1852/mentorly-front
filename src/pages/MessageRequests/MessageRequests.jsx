import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, List, Typography, Divider, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import styles from './MessageRequests.module.less';
import MainHeader from '../../components/Header/MainHeader';
import MainFooter from '../../components/Footer/MainFooter';
import { MainSpin } from '../../elements/MainSpin';

import { 
  confirmedConnections, 
  pendingConnections, 
  changeRequestStatus,
  clearErrorsInMessages,
} from '../../features/messageRequests/messageRequestsSlice';

const { Title } = Typography;


export default function MessageRequests() {
  const [status, setStatus] = useState('');
  const { confirmations, pendings, errors, loading } = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    if(errors) {
      message.error(errors);
    }
    return () => dispatch(clearErrorsInMessages());
  },[errors])

  useEffect(() => {
    dispatch(pendingConnections());
    dispatch(confirmedConnections());
  }, [status]);

  const requestAnswer = async (id, param) => {
    const resp = await dispatch(changeRequestStatus({id, param}));
    if (typeof resp?.payload !== 'string') {
      setStatus(resp);
    }
  };
  
  return (
    <Layout className={styles.layout}>
      <MainHeader verified={true}/>
      {loading ? <div className={styles.pageLoaderContainer}><MainSpin tip='Loading...' /></div> :
      <Row className={styles.requestContainer}>
        <Col span={11} className= {styles.column}>
          <Title level={4} className={styles.title}>Connections</Title>
          <List
            size='large'
            dataSource={confirmations} 
            renderItem=
            {(item, index) => 
            <List.Item key={item._id} className={styles.connectedItem}>
                <List.Item.Meta
                  title=
                  {<Link className={styles.text} to={`/${item._id}`}>
                    {`${++index}. ${item.firstName} ${item.lastName}(${item.position}).`}
                  </Link>}
                />
            </List.Item>}
          />
        </Col>
        <Col span={1} >
          <Divider type='vertical' className={styles.divider} />
        </Col>
        <Col span={11} className= {styles.column}>
          <List
            size='large'
            dataSource={pendings}
            renderItem={item => 
            <div className={styles.approvals}>
            <List.Item>
              <List.Item.Meta
                title=
                {<Link className={styles.text} to={`/${item.from._id}`}>
                  {`${item.from.firstName} ${item.from.lastName}`}
                </Link>}
                description={item.from.position}
              />
              <Button className={styles.accept} onClick={() => requestAnswer(item._id, {connect: 'confirmed'})}>Accept</Button>
              <Button className={styles.decline} onClick={() => requestAnswer(item._id, {connect: 'rejected'})}>Ignore</Button>
            </List.Item>
            </div>}
          />
        </Col>
      </Row> 
      }
      <MainFooter > Simply Technologies ©2022 Created with Pleasure </MainFooter>
    </Layout>
  );
}
  
  
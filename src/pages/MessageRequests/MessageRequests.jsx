import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, List, Typography, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.less';
import styles from './MessageRequests.module.less';
import MainHeader from '../../components/Header/MainHeader';

import { 
  confirmedConnections, 
  pendingConnections, 
  changeRequestStatus 
} from '../../features/messageRequests/messageRequestsSlice';

const { Footer } = Layout;
const { Title } = Typography;


export default function MessageRequests() {
  const { confirmations, pendings, pendingsCount } = useSelector((state) => state.connections);

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(pendingConnections());
  }, []);

  useEffect( () => {
    dispatch(confirmedConnections());
  }, []);

  const acceptRequest = (id) => {
    const param = {connect: 'confirmed'};
    dispatch(changeRequestStatus({id, param}));
  };

  const declineRequest = (id) => {
    console.log(id);
    const param = {connect: 'rejected'};
    dispatch(changeRequestStatus({id, param}))
  };
  
  return (
    <Layout style={{backgroundColor: '#fff'}}>
      <MainHeader verified={true} pendingsCount={pendingsCount}/>
      <Row style={{ marginTop: '30px'}}>
        <Col span={11}>
          <Title level={4} className={styles.title}>My Mentors/Mentees</Title>
          <List
            size='large'
            dataSource={confirmations} 
            renderItem=
            {(item, index) => 
            <List.Item key={item._id}>
                <List.Item.Meta
                  title=
                  {<Link to={`/${item._id}`}>
                    {`${++index}. ${item.firstName} ${item.lastName}(${item.position})`}
                  </Link>}
                />
            </List.Item>}
          />
        </Col>
        <Col span={1}>
          <Divider type='vertical' style={{ borderWidth: 2, height: '100%',marginTop:'6px' }} />
        </Col>
        <Col span={11} style={{ height: '100vh'}}>
          <List
            size='large'
            dataSource={pendings}
            renderItem={item => 
            <div className={styles.approvals}>
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/${item.from._id}`}>{`${item.from.firstName} ${item.from.lastName}`}</Link>}
                description={item.from.position}
              />
              <Button className={styles.accept} onClick={() => acceptRequest(item._id)}>Accept</Button>
              <Button className={styles.decline} onClick={() => declineRequest(item._id)}>Ignore</Button>
            </List.Item>
            </div>}
          />
        </Col>
      </Row>
      <Footer className={styles.footer}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}
  
  
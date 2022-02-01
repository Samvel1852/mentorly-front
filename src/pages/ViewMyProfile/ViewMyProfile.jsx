import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Layout, Row, Spin, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ViewMyProfile.module.less';
import 'antd/dist/antd.css';

import { getLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import {
  setProfileState,
} from '../../features/fillMyProfile/fillMyProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../features/profile/profileSlice';
import { connect, pendingConnections } from '../../features/messageRequests/messageRequestsSlice';

const { Content, Footer } = Layout;

const { Title } = Typography;
export default function ViewMyProfile() {
  const [initialPendingsCount, setinitialPendingsCount] = useState(0);
  const {userData, editLoader} = useSelector((state) => state.profile);
  const {requestSent, pendingsCount} = useSelector((state) => state.connections);

  useEffect(async () => {
    const result = await dispatch(pendingConnections());
    setinitialPendingsCount(result?.payload.length);
  }, []);


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();
  const currentUserId = getLocalStorage('currentUserId');

  useEffect(async () => {
    await dispatch(getUserData(id));
  }, [id]);

  const useStatus = () => {
    const status =  userData?.isConnected[0]?.status;
    return status === 'pending' || status === 'confirmed' || status === 'rejected';
  };

  const useStatusValue = () => {
    const status = userData?.isConnected[0]?.status;
    return (
      (status === 'pending') ? 'Request Sent' : (status === 'confirmed') ? 'Connected' :
      (status === 'rejected') ? 'Request Rejected' :
      (requestSent === 'Request Sent') ? requestSent  : 'Connect'
    );
  };

  const handleEditProfileClick = async () => {
    await dispatch(setProfileState(userData));
    navigate(`/users/${id}`);
  };

  const handleConnectUser = async () => {
    await dispatch(connect(id));
  };

  return (
    <Layout> 
      <MainHeader verified={true} pendingsCount={pendingsCount ? pendingsCount : initialPendingsCount}/>
      { userData?.status !== 'verified' && !editLoader ? 
      <div className={styles.pageLoaderContainer}>The User not exists</div> :
       !editLoader  ? 
      <Content className={styles.site_layout} >
          <Row className={styles.mainRow} >
            <Col flex='200px' className={styles.personalInfoContainer}>
              <Title level={3}>Personal Info </Title>
              <Title level={4} className={styles.mentorBeige} > 
                {userData?.selectedRole === 'Mentor'? 'Mentor': null} </Title>
                <Typography>First Name: {userData?.firstName}</Typography>
                <Typography>Last Name: {userData?.lastName}</Typography>
                {
                  (id === currentUserId || userData?.isConnected[0]?.status === 'confirmed') &&
                  <Typography>Email: {userData?.email}</Typography>
                }
                <Typography>Role: {userData?.selectedRole}</Typography>
                <Typography>Position: {userData?.position}</Typography>
                <Typography>Field: {userData?.selectedField}</Typography>
              <Title level={3}>Skills</Title>
              <div className={styles.skillsContainer}>
              {
                userData?.skills.map((skill) => <Skill name={skill.name} key={skill._id}></Skill>)
              }
              </div>
              {
                id === currentUserId ? <Button type='primary' 
                className={styles.editBtn}
                onClick={handleEditProfileClick}
                loading={editLoader}>Edit</Button>
                :<Button type='primary'
                className={styles.connectBtn} onClick={handleConnectUser} 
                disabled={useStatus() || requestSent.length}> 
                {useStatusValue()}
                </Button>
              }
            </Col>
            <Col xs={5} sm={6} md={15} lg={16} xl={17} className={styles.generalInfoContainer}>
              <Title level={3}>Education</Title>
              <Typography className={styles.genInfoContainers} >{  
                  userData?.education}</Typography>
              <Title level={3}>Experience</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.experience}</Typography>
              <Title level={3}>About</Title>
              <Typography className={styles.genInfoContainers}>{ 
                  userData?.about}</Typography>
              <Title level={3}> { userData?.selectedRole === 'Mentor' ? 'Who can request mentorship'
                  : 'My plans' }</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.plans}</Typography>
            </Col>
          </Row>
      </Content>
      : <div className={styles.pageLoaderContainer}><Spin tip='Loading...' /></div>
      }
      <Footer className={styles.foot}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};

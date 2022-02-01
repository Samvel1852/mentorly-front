import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Layout, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { getLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import {
  setProfileState,
} from '../../features/fillMyProfile/fillMyProfileSlice';
import { getUserData } from '../../features/profile/profileSlice';
import { connect, pendingConnections } from '../../features/messageRequests/messageRequestsSlice';

import MainFooter from '../../components/Footer/MainFooter';
import styles from './ViewMyProfile.module.less';
import { MainButton } from '../../elements/MainButton';
import { MainSpin } from '../../elements/MainSpin';
import { MainException } from '../../elements/MainException';

const { Content } = Layout;

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
      <div className={styles.pageLoaderContainer}>
        <MainException type='404' redirect={`/${currentUserId}`} title={'This Page Isn`t Available'} 
        desc={'The link may be broken, or the page may have been removed. Check to see if the link you`re trying to open is correct.'} />
        </div> :
       !editLoader  ? 
      <Content className={styles.site_layout} >
          <Row className={styles.mainRow} >

            <Col flex='300px' className={styles.personalInfoContainer}>
              <Title className={styles.title} level={3}>Personal Info </Title>
                <Title level={4} className={styles.mentorBeige}  hidden={userData?.selectedRole !== 'Mentor'}> 
                 Mentor </Title>
                <Typography><b>First Name:</b> {userData?.firstName}</Typography>
                <Typography><b>Last Name:</b> {userData?.lastName}</Typography>
                {
                  (id === currentUserId || userData?.isConnected[0]?.status === 'confirmed') &&
                  <Typography>Email: {userData?.email}</Typography>
                }
                <Typography><b>Role:</b> {userData?.selectedRole}</Typography>
                <Typography><b>Position:</b> {userData?.position}</Typography>
                <Typography><b>Field:</b> {userData?.selectedField}</Typography>
              <Title className={styles.title} level={3}>Skills</Title>
              <div className={styles.skillsContainer}>
              {
                userData?.skills.map((skill) => <Skill name={skill.name} key={skill._id}></Skill>)
              }
              </div>
              
            </Col>
            <Col xs={5} sm={6} md={10} lg={10} xl={15} className={styles.generalInfoContainer}>
              <Title className={styles.title} level={3}>Education</Title>
              <Typography className={styles.genInfoContainers} >{  
                  userData?.education}</Typography>
              <Title className={styles.title} level={3}>Experience</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.experience}</Typography>
              <Title className={styles.title} level={3}>About</Title>
              <Typography className={styles.genInfoContainers}>{ 
                  userData?.about}</Typography>
              <Title className={styles.title} level={3}> { userData?.selectedRole === 'Mentor' ? 'Who can request mentorship'
                  : 'My plans' }</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.plans}</Typography>
            </Col>
              <div className={styles.btnContainer}>
                {
                 id === currentUserId ? <MainButton
                 margin={'40px 0 0 0 '}
                 width={'150px'} height={'40px'} type='primary' 
                 className={styles.editBtn}
                 onClick={handleEditProfileClick}
                 loading={editLoader}>Edit</MainButton>
                 : <MainButton width={'150px'} height={'40px'} margin={'40px 0 0 0 '} type='primary' 
                 className={styles.connectBtn} onClick={handleConnectUser} 
                 disabled={useStatus() || requestSent.length}>{useStatusValue()}</MainButton>
                }
                </div>
          </Row>
      </Content>
      : <div className={styles.pageLoaderContainer}><MainSpin tip='Loading...' /></div>
      }
      <MainFooter > Simply Technologies ©2022 Created with Pleasure </MainFooter>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};

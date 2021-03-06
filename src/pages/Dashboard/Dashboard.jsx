import React, { useEffect, useState } from 'react';
import { Col, Form, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Option } from 'antd/es/mentions';

import { getUsers } from '../../features/dashboard/dashboardSlice';
import MainHeader from '../../components/Header/MainHeader';
import { useNavigate } from 'react-router-dom';
import { MainInput } from '../../elements/MainInput';
import { MainSelect } from '../../elements/MainSelect';
import { MainButton } from '../../elements/MainButton';
import { MainTable } from '../../elements/MainTable';
import MainFooter from '../../components/Footer/MainFooter';
import styles from './Dashboard.module.less';

function Dashboard() {
    const dispatch = useDispatch();
    const { users, pageTotal, loading } = useSelector(state => state.users);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 5;
    const [params, setParams] = useState({
        sortBy: 'ascend'
    });

    useEffect(async () => {
       await getData({ params })
    }, []);

    const getData = async (params) => {
        await dispatch(getUsers(params));
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Field',
            dataIndex: 'filed',
            key: 'filed',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: true,
            sortOrder: params.sortBy
        }
    ];
    const handleTableChange = async () => {
        setParams({ ...params, sortBy: params.sortBy === 'ascend' ? 'descend' : 'ascend' });
        await getData(params)
    }
    const dataSource = users.map((item) => (
        {
            key: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            position: item.position,
            filed: item.selectedField,
            role: item.selectedRole,
            date: new Date(item.createdAt).toLocaleString().split(',')[0]
        }
    ));
    const handleSubmit = async (event) => {
        event.preventDefault();
        await getData(params);
    };
    return (
        <>
        <MainHeader verified={true} />
        <Layout className={styles.layout} >
            <div style={ { 'margin': '30px'} }>
                <Form
                    onSubmit={ handleSubmit }
                    onSubmitCapture={ handleSubmit }
                    size={ 'middle' }
                    style={ { 'margin': '10px' } }
                >
                    <Row justify="space-between">
                        <Col span={ 4 } >
                            <Form.Item>
                                <MainInput
                                    placeholder="First Name"
                                    value={ params.firstName }
                                    onChange={ (e) => setParams({ ...params, firstName: e.target.value })
                                    }/>
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainInput
                                    placeholder="Last Name"
                                    value={ params.lastName }
                                    onChange={ (e) => setParams({ ...params, lastName: e.target.value }) }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainInput
                                    placeholder="Position"
                                    value={ params.position }
                                    onChange={ (e) => setParams({ ...params, position: e.target.value }) }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainSelect
                                    showArrow={true}
                                    mode={ 'multiple' }
                                    allowClear
                                    style={ { width: '100%' } }
                                    placeholder="Field"
                                    onChange={ (value) => setParams({ ...params, selectedField: value }) }
                                >
                                    <Option value="it">IT</Option>
                                    <Option value="marketing">Marketing</Option>
                                    <Option value="finance">Finance</Option>
                                    <Option value="law">Law</Option>
                                    <Option value="tourism">Tourism</Option>
                                    <Option value="business">Business</Option>
                                </MainSelect>
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainSelect
                                    placeholder="Role"
                                    onChange={ (value) => setParams({ ...params, selectedRole: value }) }
                                    allowClear
                                >
                                    <Option value="mentor">Mentor</Option>
                                    <Option value="mentee">Mentee</Option>
                                </MainSelect>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <MainButton type="primary" htmlType={ 'submit' }>
                                    Search
                                </MainButton>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className={styles.tableContainer}>               
                <MainTable
                    scroll={{ y: 200 }} 
                    dataSource={ dataSource }
                    columns={ columns }
                    onRow={(record) => {
                        return {
                            style: {  cursor: 'pointer' },
                            onClick: () => navigate(`/${record.key}`)
                          }
                    }}
                    loading={ loading }
                    onChange={handleTableChange}
                    pagination={ {
                        total: pageTotal,
                        current: page,
                        pageSize: limit,
                        onChange: async (page, limit) => {
                            setPage(page)
                            await getData({ ...params, page, limit });
                        },
                    } }
                />
                </div> 
            </div>
        </Layout>
        <MainFooter />        
        </>
    );
}

export default Dashboard;
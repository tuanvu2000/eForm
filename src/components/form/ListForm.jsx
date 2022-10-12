import React, { useState, useEffect } from 'react';
// third party libraries
import { Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
// project
import jsonFormApi from '../../api/jsonForm';

// ----------------------------------------------------------------

const ListForm = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    // const data = [
    //     {
    //         key: 1,
    //         name: 'Student form',
    //         description: 'Form create infomation for student',
    //         createdAt: '10/10/2022 14:24:45'
    //     },
    //     {
    //         key: 2,
    //         name: 'Student form',
    //         description: 'Form create infomation for student',
    //         createdAt: '10/10/2022 14:24:45'
    //     },
    //     {
    //         key: 3,
    //         name: 'Student form',
    //         description: 'Form create infomation for student',
    //         createdAt: '10/10/2022 14:24:45'
    //     }
    // ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            width: 300,
            render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (_, record) => (
                <Space>
                    <Link to={`preview?id=${_.id}`}>
                        <button className="btn btn-primary">Preview</button>
                    </Link>
                    <Link to={`create?id=${_.id}`}>
                        <button className="btn btn-success">Edit</button>
                    </Link>
                    <Link to="">
                        <button className="btn btn-danger">Delete</button>
                    </Link>
                </Space>
            )
        }
    ];

    useEffect(() => {
        const getData = async () => {
            const res = await jsonFormApi.getList();
            const data = res.data?.data;
            if (data.length > 0) {
                const newData = data.map((item) => {
                    return {
                        ...item,
                        key: item.id
                    };
                });
                setList(newData);
                setLoading(false);
            }
            setLoading(false);
        };
        getData();
    }, []);

    return (
        <div className="m-5">
            <div className="d-flex justify-content-between align-items-center">
                <h4>List Form</h4>
                <Link to="create">
                    <button className="btn btn-primary">Add new</button>
                </Link>
            </div>
            <Table loading={loading} dataSource={list} columns={columns} />
            <div id="formio"></div>
        </div>
    );
};

export default ListForm;

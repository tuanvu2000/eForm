import React, { useState, useEffect } from 'react';
// third party libraries
import { Form } from '@formio/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
// project import
import jsonFormApi from '../../api/jsonForm';

// ----------------------------------------------------------------

const PreviewForm = () => {
    const navi = useNavigate();
    const { search } = useLocation();
    const id = search ? search.split('?id=')[1] : null;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await jsonFormApi.getOne(id);
            setData(res.data?.data);
            setLoading(false);
        };
        getData();
    }, [id]);

    return loading ? (
        <Spin size="large" className="d-flex justify-content-center m-5" />
    ) : (
        <div className="m-5">
            <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-end">
                    <h4 className="mb-0">{data?.name}</h4>
                    <span style={{ paddingLeft: 4 }}> - {data?.description}</span>
                </div>
                <div className="d-flex gutter-1" style={{ gap: 16 }}>
                    <button className="btn btn-secondary px-4" onClick={() => navi('../')}>
                        Back
                    </button>
                    <button className="btn btn-primary px-4" onClick={() => navi(`../create?id=${data?.id}`)}>
                        Edit
                    </button>
                </div>
            </div>
            <div>
                <Form form={data?.json.includes('"display":"form"') ? JSON.parse(data?.json) : {}} options={{ noAlerts: true }} />
            </div>
        </div>
    );
};

export default PreviewForm;

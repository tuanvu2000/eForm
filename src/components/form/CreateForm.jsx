import React, { useState, useEffect, useMemo, useRef } from 'react';
// third party libraries
import { FormBuilder } from '@formio/react';
import ReactJson from 'react-json-view';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin, Form, Input, BackTop } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
// project import
import jsonFormApi from '../../api/jsonForm';

// ----------------------------------------------------------------

const CreateForm = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [save, setSave] = useState();
    const btnRef = useRef();

    const navi = useNavigate();
    const { search } = useLocation();
    const id = search ? search.split('?id=')[1] : null;

    const validationSchema = useMemo(
        () =>
            yup.object({
                name: yup.string().trim().required('Form name is required')
            }),
        []
    );

    const formik = useFormik({
        initialValues: {
            name: '',
            json: '',
            description: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log(values);
            if (id) {
                const sendData = await jsonFormApi.putJson(id, values);
                toast[sendData.status === 200 ? 'success' : 'error'](sendData.data?.message);
            } else {
                const sendData = await jsonFormApi.postJson(values);
                toast[sendData.status === 200 ? 'success' : 'error'](sendData.data?.message);
                navi(`?id=${sendData.data?.data?.id}`);
            }
        }
    });

    useEffect(() => {
        const getData = async () => {
            const res = await jsonFormApi.getOne(id);
            setData(res.data?.data);
            setLoading(false);
            // formik.setFieldValue('name', res.data?.data?.name);
            // formik.setFieldValue('description', res.data?.data?.description);
        };
        if (id) {
            getData();
        } else setLoading(false);
    }, [id]);

    useEffect(() => {
        if (Boolean(id) && Boolean(data)) {
            formik.setFieldValue('name', data?.name);
            formik.setFieldValue('description', data?.description);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, data]);

    const handleChangeForm = (value) => {
        setSave(value);
        formik.setFieldValue('json', JSON.stringify(value));
    };
    return loading ? (
        <Spin size="large" className="d-flex justify-content-center m-5" />
    ) : (
        // <Form onFinish={formik.handleSubmit} layout="vertical" initialValues={formik.values}>

        <Form onFinish={formik.handleSubmit} layout="vertical">
            <div className="my-3 mx-5">
                {/* header infomation */}
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 className="mb-1">{data ? data?.name : 'Create new form'}</h3>
                        <p>{data ? data?.description : 'new'}</p>
                    </div>
                    <div className="text-end">
                        {id ? (
                            <>
                                <div className="d-flex justify-content-end" style={{ gap: 8 }}>
                                    <button className="btn btn-secondary px-4" onClick={() => navi('../')}>
                                        Back
                                    </button>
                                    <button className="btn btn-info px-4" onClick={() => navi(`../preview?id=${id}`)}>
                                        Preview
                                    </button>
                                    <button ref={btnRef} onClick={() => console.log(formik.values)} className="btn btn-primary px-4">
                                        Update
                                    </button>
                                </div>
                                <p>Last updated - {moment(data?.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                            </>
                        ) : (
                            <div className="d-flex" style={{ gap: 8 }}>
                                <button className="btn btn-secondary px-4" onClick={() => navi('../')}>
                                    Back
                                </button>
                                <button ref={btnRef} type="submit" className="btn btn-primary px-4">
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* diiver */}
                <div className="border-bottom"></div>

                {/* form builder */}
                <div className="mt-4">
                    <div className="w-100">
                        <div className="d-flex" style={{ gap: 16 }}>
                            <Form.Item
                                label="Name"
                                name="name"
                                initialValue={data ? data?.name : formik.values.name}
                                onChange={formik.handleChange}
                                // onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                className="w-100"
                                validateStatus={formik.touched['name'] && formik.errors['name'] ? 'error' : 'success'}
                                help={formik.touched['name'] && formik.errors['name'] ? formik.errors['name'] : ''}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                initialValue={data ? data?.description : formik.values.description}
                                onChange={formik.handleChange}
                                // onChange={(e) => formik.setFieldValue('description', e.target.value)}
                                className="w-100"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 form-builder">
                            <Isolate>
                                <FormBuilder
                                    form={{
                                        display: 'form',
                                        components: data?.json.includes('"display":"form"')
                                            ? JSON.parse(data?.json)['components']
                                            : formik.values.json
                                            ? JSON.parse(formik.values.json)['components']
                                            : []
                                    }}
                                    onChange={handleChangeForm}
                                />
                            </Isolate>
                        </div>
                        <div className="col-sm-4 border rounded p-3">
                            {/* <p>Show JSON (comming son)</p> */}
                            <ReactJson
                                src={save}
                                collapsed={2}
                                onEdit={(e) => console.log(e.updated_src)}
                                onDelete={(e) => handleChangeForm(e.updated_src)}
                            ></ReactJson>
                        </div>
                    </div>
                </div>
            </div>
            <BackTop />
        </Form>
    );
};

export default CreateForm;

class Isolate extends React.Component {
    shouldComponentUpdate() {
        return false; // prevent parent state changes from re-rendering FormBuilder
    }
    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}

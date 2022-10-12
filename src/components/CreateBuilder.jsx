import { FormBuilder } from '@formio/react';
import ReactJson from 'react-json-view';
import useConfig from '../hooks/useConfig';
import { Link } from 'react-router-dom';

// ============================================================================

const CreateBuilder = () => {
    const { jsonSchema, onChangeJson } = useConfig();

    // useEffect(() => {
    //   if (localStorage.getItem("form")) {
    //     onChangeJson(JSON.parse(localStorage.getItem("form")));
    //   }
    // }, []);

    return (
        <div style={{ padding: '20px 50px' }}>
            <div>
                <FormBuilder form={jsonSchema} onChange={(schema) => onChangeJson(schema)} />
            </div>
            <div style={{ marginTop: 30 }}>
                <ReactJson src={jsonSchema} collapsed={true}></ReactJson>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 20 }}>
                <Link to="form" style={styles.link}>
                    preview form
                </Link>
            </button>
        </div>
    );
};

const styles = {
    link: {
        color: 'white',
        textDecoration: 'none'
    }
};

export default CreateBuilder;

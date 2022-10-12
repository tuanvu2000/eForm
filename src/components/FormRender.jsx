import React from "react";
import useConfig from "../hooks/useConfig";
import { Form } from "@formio/react";
import { Link } from "react-router-dom";

const FormRender = () => {
  const { jsonSchema } = useConfig();
  return (
    <div style={{ margin: 50 }}>
      <div style={{ padding: 20, border: "1px solid #ccc" }}>
        <Form form={jsonSchema} />
      </div>
      <div style={{ marginTop: 20 }}>
        <button className="btn btn-primary" style={{ marginRight: 10 }}>
          <Link to="/" style={styles.link}>
            back build form
          </Link>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.setItem("form", JSON.stringify(jsonSchema));
          }}
        >
          Save form
        </button>
      </div>
    </div>
  );
};

const styles = {
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default FormRender;

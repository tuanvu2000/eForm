import { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [jsonSchema, setJson] = useState({ components: [] });
  const onChangeJson = (schema) => {
    setJson(schema);
  };
  return (
    <FormContext.Provider value={{ jsonSchema, onChangeJson }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };

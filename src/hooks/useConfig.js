import { useContext } from "react";
import { FormContext } from "../context/FromContext";

const useConfig = () => useContext(FormContext);

export default useConfig;

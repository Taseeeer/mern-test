import { useState } from "react";

export default function useForm(intialState = {}) {
    const [inputs, setInputs] = useState(intialState);

    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    function resetForm() {
        setInputs(intialState);
    }

    return {
        inputs,
        handleChange,
        resetForm
    }
};
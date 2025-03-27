import React, { useState, useEffect } from "react";
import { Edit } from "./icons/edit";
import { GreenCheck } from "./icons/greenCheck";

type ValueFieldProps = {
    reportValue: (s: string) => void;
    defaultValue: string;
};

export const ValueField: React.FC<ValueFieldProps> = (props: ValueFieldProps) => {
    
    const [value, setValue] = useState(props.defaultValue);
    const [editing, setEditing] = useState(false);

    const handleSubmitValue = (e: any) => {
        setEditing(false);
        props.reportValue(value);
    }

    useEffect(() => {
        props.reportValue(value);
    }, [editing]);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    }
    return (
        <div className="value-field">
            {editing ? (
                <div className="horizontal-between">
                    <input
                        type="text"
                        className="value-field-input"
                        value={value}
                        // onChange={(e) => setValue(e.target.value)}>
                        onChange={(e) => handleValueChange(e.target.value)}>
                    </input>
                    <div onClick={(e) => handleSubmitValue(e)}>
                        <GreenCheck />
                    </div>
                </div>
            ) : (
                <div className="horizontal-between">
                    <div>
                        {value}
                    </div>
                    <div onClick={() => setEditing(true)}>
                        <Edit />
                    </div>
                </div>
            )}
        </div>
    );
};
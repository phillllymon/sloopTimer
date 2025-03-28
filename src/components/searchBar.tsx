import React, { useState, useContext } from "react";

type SearchBarProps = {
    placeholderText: string,
    setSearchTerm: (s: string) => void
};

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const [value, setValue] = useState("");
    const handleChange = (e: any) => {
        setValue(e.target.value);
        props.setSearchTerm(e.target.value);
    }
    return (
        <div>
            <input
                type="text"
                className="search-bar"
                placeholder={props.placeholderText}
                value={value}
                onChange={handleChange} />
        </div>
    );
};
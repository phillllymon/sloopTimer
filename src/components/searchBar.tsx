import React, { useState, useContext } from "react";

type SearchBarProps = {
    searchParam: string,
    setSearchTerm: (s: string) => void
};

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const [value, setValue] = useState("");
    const handleChange = (e: any) => {
        setValue(e.target.value);
        props.setSearchTerm(e.target.value);
    }

    const paramNames: Record<string, string> = {
        "name": "boat name",
        "sailNumber": "sail number",
        "boatType": "boat type"
    }

    return (
        <div>
            <input
                type="text"
                className="search-bar"
                placeholder={`search by ${paramNames[props.searchParam]}`}
                value={value}
                onChange={handleChange} />
        </div>
    );
};
import React from 'react';
export default function SearchBar({setSearchState}) {
    return (
            <input 
                type = "text" 
                style={{marginBottom:"15px",
                height:"50px",
                width: "300px",
                borderRadius: "5px 0px 0px 5px",
                paddingLeft: "10px",
                fontSize: "20px"}} 
                placeholder="Search for org..." 
                onChange={event => {setSearchState(event.target.value);
                }}
            />
    )
}
import React from 'react';
export default function SearchBar(props) {
    return (
            <div>
            {props.filtersLen > 6 ?
            <input 
                type = "text" 
                style={{marginBottom:"15px",
                height:"50px",
                width: "300px",
                borderRadius: "5px 0px 0px 5px",
                paddingLeft: "10px",
                fontSize: "20px"}} 
                placeholder="Search for org..." 
                onChange={event => {props.setSearchState(event.target.value);
                }}
            />
            :
            <input 
                type = "text" 
                style={{marginBottom:"15px",
                height:"50px",
                width: "300px",
                borderRadius: "5px 0px 0px 5px",
                paddingLeft: "10px",
                fontSize: "20px"}} 
                placeholder="Search for repo..." 
                onChange={event => {props.setSearchState(event.target.value);
                }}
            />}
            </div>
    )
}
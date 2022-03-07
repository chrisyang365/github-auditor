import React, {useState, useRef} from 'react';
import { Icon } from 'semantic-ui-react'

export default function FilterDrop(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(undefined);
    const filters = props.filters;

    const handleOnChange = (filter) => (event) => {
        props.setFilter((prev) => ({
          ...prev,
          [filter]: event.target.checked,
        }));
      };
    
    return (
        <div>
            <button onClick={() => {setIsOpen(!isOpen)}} style={{height:"50px",
                        borderRadius: "0px 5px 5px 0px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: "20px",
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        borderRight: "2px solid",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column"
                        
                        }}
            >
            Filter
            </button>
            {isOpen &&(
                <>
                {props.filtersLen > 6 ?
                <div ref={dropdownRef} style={{
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)",
                    padding: "0.25rem",
                    display: "block",
                    width: "44rem",
                    zIndex: "50",
                    maxHeight: "calc(100vh - 152px)",
                    position: "absolute",
                    marginTop: "0.5rem",
                    backgroundColor: "white",
                    border: "1px solid",
                    transform: "translateX(-200px)"}}>
                        <div style={{display: "flex",flexWrap:"wrap",rowGap:"1rem",paddingTop:"1rem",paddingBottom:"1rem"}}>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> 2FA <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["H2FA"]}
                                    onChange={handleOnChange("H2FA")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Dependabot <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NDEP"]}
                                    onChange={handleOnChange("NDEP")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>   
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Code Scan <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NCODE"]}
                                    onChange={handleOnChange("NCODE")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Secret Scan <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NSEC"]}
                                    onChange={handleOnChange("NSEC")}
                                />
                            </div>  
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> 2FA <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["N2FA"]}
                                    onChange={handleOnChange("N2FA")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Dependabot <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HDEP"]}
                                    onChange={handleOnChange("HDEP")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Code Scan <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HCODE"]}
                                    onChange={handleOnChange("HCODE")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Secret Scan <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HSEC"]}
                                    onChange={handleOnChange("HSEC")}
                                />
                            </div>
                        </div>
                </div>
                : 
                <div ref={dropdownRef} style={{
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)",
                    padding: "0.25rem",
                    display: "block",
                    width: "37rem",
                    zIndex: "50",
                    maxHeight: "calc(100vh - 152px)",
                    position: "absolute",
                    marginTop: "0.5rem",
                    backgroundColor: "white",
                    border: "1px solid",
                    transform: "translateX(-200px)"}}>
                        <div style={{display: "flex",flexWrap:"wrap",rowGap:"1rem",paddingTop:"1rem",paddingBottom:"1rem"}}>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Dependabot <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NDEP"]}
                                    onChange={handleOnChange("NDEP")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>   
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Code Scan <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NCODE"]}
                                    onChange={handleOnChange("NCODE")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Secret Scan <Icon color={'green'} name={'check'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["NSEC"]}
                                    onChange={handleOnChange("NSEC")}
                                />
                            </div>  
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Dependabot <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HDEP"]}
                                    onChange={handleOnChange("HDEP")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Code Scan <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HCODE"]}
                                    onChange={handleOnChange("HCODE")}
                                />
                            </div>
                            <div style={{display: "inline-block"}}>
                                <label style={{fontSize:"20px", marginLeft: "10px",paddingLeft: "5px"}}> Secret Scan <Icon color={'red'} name={'x'} /> </label>
                                <input
                                    type = "checkbox"
                                    checked={filters["HSEC"]}
                                    onChange={handleOnChange("HSEC")}
                                />
                            </div>
                        </div>
                </div>
                }
            </>
            )}
        </div>
    )
}
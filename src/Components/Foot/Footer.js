import React from 'react';
import logo from "../../assets/images/UltLogo.png";

class Footer extends React.Component{
    render() {
        return(
            <React.Fragment>
                <div className={"Foot"} style={{height:"60px"}}>
                    <div>
                        <img src={logo} className={"login"} alt={"missingimg"} style={{height:"60px",}}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Footer;
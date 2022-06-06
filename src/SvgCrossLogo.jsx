import React from "react";

class SvgCrossLogo extends React.Component {

    render(){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="33" 
                                    style={this.props.showForm? {display: 'block'} : {display: 'none'}}>
            <path
                fill="#B83535"
                d="M50 25c0 6.904-2.44 12.796-7.322 17.678C37.796 47.559 31.904 50 25 50c-6.904 0-12.796-2.44-17.678-7.322C2.441 37.796 0 31.904 0 25c0-6.904 2.44-12.796 7.322-17.678C12.204 2.441 18.096 0 25 0c6.904 0 12.796 2.44 17.678 7.322C47.559 12.204 50 18.096 50 25c0 .29-.005.582-.015.872"
                transform="scale(.07957 .07952) translate(69) scale(8.3)"
            ></path>
            <path
                fill="none"
                stroke="#FFF"
                strokeLinecap="square"
                strokeWidth="2"
                d="M33.839 16.661L16.16 34.34M16.2 16.712l6.076 6.077 11.6 11.6"
                transform="scale(.07957 .07952) translate(69) scale(8.3)"
            ></path>
            </svg>
        );
        }
}
    

export default SvgCrossLogo;
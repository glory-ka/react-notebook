import React from "react";

class SvgPlusLogo extends React.Component {
    render()
    {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="33"
                      style={this.props.showForm? {display: 'none'} : {display: 'block'}}>
            <path
              fill="#43B05C"
              d="M50 25c0 6.904-2.44 12.796-7.322 17.678C37.796 47.559 31.904 50 25 50c-6.904 0-12.796-2.44-17.678-7.322C2.441 37.796 0 31.904 0 25c0-6.904 2.44-12.796 7.322-17.678C12.204 2.441 18.096 0 25 0c6.904 0 12.796 2.44 17.678 7.322C47.559 12.204 50 18.096 50 25c0 .29-.005.582-.015.872"
              transform="scale(.07957 .07952) translate(69) scale(8.3)"
            ></path>
            <path
              fill="none"
              stroke="#FFF"
              strokeLinecap="round"
              strokeWidth="2"
              d="M25 13v25M37.5 25h-25"
              transform="scale(.07957 .07952) translate(69) scale(8.3)"
            ></path>
          </svg>
        );
    }
}

export default SvgPlusLogo;

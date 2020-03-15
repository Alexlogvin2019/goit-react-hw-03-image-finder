import React from "react";

const Button = ({ buttonMore }) => (
  <button className="Button" type="button" onClick={buttonMore}>
    Load more
  </button>
);

export default Button;

// window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: 'smooth',
//   });

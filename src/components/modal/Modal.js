import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      this.props.onClose();
    }
  };

  closeByClick = ({ target, currentTarget }) => {
    // console.log(currentTarget);
    // console.log(target);

    if (target !== currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url } = this.props;
    return (
      <div className="Overlay">
        <div onClick={this.closeByClick} className="Modal">
          <img src={url} alt="img" />
        </div>
      </div>
    );
  }
}

export default Modal;

// import React from "react";

// const Modal = () => (
//   <div className="Overlay">
//     <div className="Modal">
//       <img src="" alt="" />
//     </div>
//   </div>
// );

// export default Modal;

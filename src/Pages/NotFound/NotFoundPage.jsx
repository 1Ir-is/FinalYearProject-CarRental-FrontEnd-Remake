import React from "react";
import { Link } from "react-router-dom"; // Import Link
import svg from "../../assets/all-images/404.svg";
import "./PageNotFound.css";

const NotFoundPage = () => {
  return (
    <div className="cont-404">
    <img src={svg} alt="svg" />
    <Link to="/">
        <button>Back to Home</button>
    </Link>
</div>
  );
};

export default NotFoundPage;

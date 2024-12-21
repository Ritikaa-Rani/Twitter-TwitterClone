// import React from "react";
import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
const Customlink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{
          textDecoration: "none",
          color: match ? "var(--twitter-color" : "black",
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

Customlink.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
  };

export default Customlink;
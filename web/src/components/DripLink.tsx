import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const DripLink = ({ children }) => <AniLink paintDrip to="/projects/stargazing">{children}</AniLink>

export default DripLink
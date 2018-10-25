import { injectGlobal } from "styled-components";
injectGlobal`
  @font-face {
    font-family: Lato;
  }
`;

const theme = {
  fontColour: "#333333",
  highlightColour: "#35A7FF",
  backgroundColour: "#FFFFFF",
  borderColour: "#666666",
  font: 'Lato, "Helvetica Neue", Arial, sans-serif'
};

export default theme;

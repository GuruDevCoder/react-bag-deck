import { future as theme } from "mdx-deck/themes";
import okaidia from "react-syntax-highlighter/styles/prism/okaidia";

export default {
  ...theme,
  position: "relative",
  color: {
    text: "white"
  },
  prism: {
    style: okaidia
  },
  h1: {
    textTransform: "inherit",
    marginBottom: "0.2em",
    letterSpacing: 0,
    color: "white"
  },
  h3: {
    color: "white"
  },
  heading: {
    color: "white"
  }
};

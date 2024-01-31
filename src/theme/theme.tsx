import { extendTheme, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";

// eslint-disable-next-line react-refresh/only-export-components
export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles
);

export interface CustomCardProps extends HTMLChakraProps<"div">, ThemingProps {}

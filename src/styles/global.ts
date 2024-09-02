import { createGlobalStyle } from 'styled-components';
import colors from '@styles/colors';
import fonts from '@styles/fonts';
import reset from '@styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${colors}
  ${fonts}
`;

export default GlobalStyle;

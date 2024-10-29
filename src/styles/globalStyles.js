import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';

const globalStyles = createGlobalStyle`
* {
   margin: 0;
   padding: 0;
   box-sizing: boder-box;
   outline: none;
   font-family: "Poppins", sans-serif;
   font-weight: 100;
   font-style: normal;
}

   button, a {
   cursor: pointer;
}
`;

export default globalStyles
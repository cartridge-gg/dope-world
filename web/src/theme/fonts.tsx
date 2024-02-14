import { Global } from "@emotion/react";

export const fonts = {
  body: `'inter', san-serif`,
};

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'inter';
        font-weight: 400;
        font-style: normal;
        src: url('/fonts/Inter-Regular.ttf');
      }
    @font-face {
        font-family: 'inter';
        font-weight: 700;
        font-style: normal;
        src: url('/fonts/Inter-Bold.ttf');
     }

    @font-face {
      font-family: 'ibmplex';
      font-weight: 400;
      font-style: normal;
      src: url('/fonts/IBMPlexSans-Regular.ttf');
    }
  
    @font-face {
      font-family: 'ibmplex';
      font-weight: 700;
      font-style: normal;
      src: url('/fonts/IBMPlexSans-Bold.ttf');
    }
     
`}
  />
);

export default Fonts;

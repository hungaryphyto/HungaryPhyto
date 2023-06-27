import { createTheme } from '@mui/material/styles';
import { red, blue, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark', // Adicione a propriedade "mode" e defina como "dark"
    primary: {
      main: blue["A400"],
    },
    secondary: {
      main: red[500],
    },
    background: {
      default: grey[900], // Defina a cor de fundo padrão como preto
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: grey[900], // Defina a cor de fundo do body como preto
        },
      },
    },
  },
});

export default theme;
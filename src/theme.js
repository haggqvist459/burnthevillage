import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import './sass/fonts.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0976E3",
        },
        secondary: {
            main: "#D4CE71"
        }
    },
    typography: {

        fontFamily: "ComicNeue",

        h1: {
            fontFamily: "Supercell-magic-webfont",
        },
        h2: {
            fontFamily: "Supercell-magic-webfont",
        },
        h3: {
            fontFamily: "Supercell-magic-webfont",
        },
        h4: {
            fontFamily: "Supercell-magic-webfont",
        },
    },
});
const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
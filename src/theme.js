import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import './sass/fonts.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#101820",
        },
        secondary: {
            main: "#D4CE71"
        }
    },
    typography: {
        fontFamily: "ComicNeue-Regular",

        p: {
            fontFamily: "ComicNeue-Regular"
        },
        link: {
            fontFamily: "ComicNeue-Regular"
        },

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
        h5: {
            fontFamily: "Supercell-magic-webfont",
        },
        h6: {
            fontFamily: "Supercell-magic-webfont",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            warListMin: 755,
        },
    },
});


const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
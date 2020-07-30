import { withStyles, IconButton, Button } from '@material-ui/core';


export const UploadButton = withStyles(() => ({
    root: {
        opacity: 0.6,
        color: "white",
        padding: "0",
        margin: "0",
    },
}))(IconButton);

export const SignButton = withStyles(() => ({
    root: {
        height: "100px",
        width: "100%",
        marginTop: "20px",
        fontSize: "20px",
        textTransform: "none",
        '&:hover': {
            backgroundColor: "#dfdfdf",
        },
    },
}))(Button);

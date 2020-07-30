import { TextField, withStyles } from '@material-ui/core';


export const SignField = withStyles(() => ({
    root: {
      width: "100%",
      marginTop: "10px",
    }
  }))(TextField);
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
  };
});

export default useStyles;

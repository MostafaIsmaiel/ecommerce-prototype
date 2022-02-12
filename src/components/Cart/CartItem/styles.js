import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardActions: {
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "10px",
    },
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;

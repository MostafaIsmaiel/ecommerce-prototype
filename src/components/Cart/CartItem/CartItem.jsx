import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import useStyles from "./styles";

const CartItem = ({ item, handleUpdateQty, handleRemoveFromCart }) => {
  const classes = useStyles();
  const {
    id,
    name,
    quantity,
    line_total: { formatted_with_symbol },
    image: { url },
  } = item;

  return (
    <Card>
      <CardMedia image={url} alt={name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h6">{formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateQty(id, quantity - 1)}
          >
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateQty(id, quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

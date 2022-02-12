import { Container, Typography, Button, Grid, Stack } from "@mui/material";
import useStyles from "./style";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          Start adding some
        </Link>
        !
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                handleUpdateQty={handleUpdateQty}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div
          className={classes.cardDetails}
          justifycontent="space-between"
          alignitems="center"
        >
          <Typography variant="h6">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>

          <Stack
            spacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", sm: "row" }}
          >
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </Stack>
        </div>
      </>
    );
  };

  if (!cart.line_items)
    return (
      <Typography className={classes.title} variant="h4" sx={{ padding: 10 }}>
        ...Loading
      </Typography>
    );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;

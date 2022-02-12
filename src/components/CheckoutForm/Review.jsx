import { Typography, List, ListItem, ListItemText } from "@mui/material";

const Review = ({ checkoutToken }) => {
  const {
    live: {
      subtotal: { formatted_with_symbol },
    },
  } = checkoutToken;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => {
          const {
            name,
            quantity,
            line_total: { formatted_with_symbol },
          } = product;

          return (
            <ListItem style={{ padding: "10px 0" }} key={name}>
              <ListItemText
                primary={name}
                secondary={`Quantity: ${quantity}`}
              />
              <Typography variant="body2">{formatted_with_symbol}</Typography>
            </ListItem>
          );
        })}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;

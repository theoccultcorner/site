import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NoPage = () => (
  <Container maxWidth="sm" sx={{ py: 14, textAlign: "center" }}>
    <Typography className="eyebrow" component="p" sx={{ justifyContent: "center" }}>404 · Page not found</Typography>
    <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "4rem", md: "6rem" } }}>The path fades into mystery.</Typography>
    <Typography color="text.secondary" sx={{ mt: 3, lineHeight: 1.8 }}>The page you were seeking may have moved, or perhaps it was never here.</Typography>
    <Box sx={{ mt: 4 }}><Button component={Link} to="/" variant="contained">Return home</Button></Box>
  </Container>
);

export default NoPage;

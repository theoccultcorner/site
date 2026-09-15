import React from "react";
import { FacebookRounded, YouTube } from "@mui/icons-material";
import { Box, Container, Divider, Grid, IconButton, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => (
  <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", backgroundColor: "#070910", pt: 7, pb: 3 }}>
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box component="img" src="/fish.png" alt="The Gnostic Union" sx={{ width: 190, height: 90, objectFit: "contain", objectPosition: "left center" }} />
          <Typography color="text.secondary" sx={{ maxWidth: 510, mt: 1, lineHeight: 1.75 }}>
            An independent sacramental assembly devoted to the work of Christ, Holy Sophia, and the awakening of the divine within.
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Typography variant="overline" color="primary.main">Explore</Typography>
          <Stack spacing={1.2} sx={{ mt: 1.5, alignItems: "flex-start" }}>
            {[['About','/about'],['Journal','/blogs'],['Seminary','/seminary'],['Contact','/contact']].map(([label,path]) => <MuiLink key={path} component={Link} to={path} color="text.secondary" underline="hover">{label}</MuiLink>)}
          </Stack>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Typography variant="overline" color="primary.main">Connect</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <IconButton component="a" href="https://www.facebook.com/groups/1683564482015355" target="_blank" rel="noopener noreferrer" aria-label="The Gnostic Union on Facebook"><FacebookRounded /></IconButton>
            <IconButton component="a" href="https://www.youtube.com/@TheGnosticCatholicUnion" target="_blank" rel="noopener noreferrer" aria-label="The Gnostic Union on YouTube"><YouTube /></IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} The Gnostic Union. All rights reserved.</Typography>
    </Container>
  </Box>
);

export default Footer;

import React from "react";
import { ArrowForwardRounded, AutoStoriesRounded, SchoolRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const paths = [
  { icon: <AutoStoriesRounded />, title: "Foundations", text: "Study foundational Gnostic Christian texts, theology, history, and spiritual practice.", link: "/seminary/foundations" },
  { icon: <VolunteerActivismRounded />, title: "Ministry", text: "Develop the pastoral, leadership, communication, and service skills needed for ministry.", link: "/seminary/ministry" },
  { icon: <SchoolRounded />, title: "Formation", text: "Integrate scholarship, inner development, mentorship, and practical experience.", link: "/seminary/formation" },
];

const Seminary = () => (
  <>
    <Box component="header" sx={{ py: { xs: 9, md: 14 }, textAlign: "center", borderBottom: "1px solid", borderColor: "divider", background: "radial-gradient(circle at 50% 30%, rgba(121,201,190,.13), transparent 28rem)" }}>
      <Container maxWidth="md">
        <Typography className="eyebrow" component="p" sx={{ justifyContent: "center" }}>The Gnostic Union Seminary</Typography>
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "3.5rem", md: "6rem" } }}>Form the mind.<br /><Box component="span" sx={{ color: "primary.main" }}>Awaken the spirit.</Box></Typography>
        <Typography color="text.secondary" sx={{ mt: 3, mx: "auto", maxWidth: 680, fontSize: "1.08rem", lineHeight: 1.8 }}>
          Accessible theological education and personal formation for those called to study, serve, teach, and lead in the Gnostic Christian tradition.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center" sx={{ mt: 4 }}>
          <Button component={Link} to="/seminary/requirements" variant="contained" endIcon={<ArrowForwardRounded />}>View requirements</Button>
          <Button component={Link} to="/seminary/recommended" variant="outlined">Recommended reading</Button>
        </Stack>
      </Container>
    </Box>

    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 11 } }}>
      <Grid container spacing={3}>
        {paths.map((path) => (
          <Grid item xs={12} md={4} key={path.title}>
            <Card className="glass-panel" sx={{ height: "100%" }}>
              <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>{path.icon}</Box>
                <Typography variant="h4">{path.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.75 }}>{path.text}</Typography>
                <Button component={Link} to={path.link} endIcon={<ArrowForwardRounded />} sx={{ mt: 2.5 }}>Explore</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 5, md: 9 }} sx={{ mt: { xs: 7, md: 11 } }}>
        <Grid item xs={12} md={5}>
          <Typography className="eyebrow" component="p">Answering the call</Typography>
          <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: "2.8rem", md: "4.2rem" } }}>Training leaders for the 21st century</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography color="text.secondary" sx={{ fontSize: "1.07rem", lineHeight: 1.9 }}>
            Independent Gnostic Christians of all ages are being called to the way of peace and the way of Gnosis. Our programs help students deepen their understanding, strengthen their ministry, and translate spiritual insight into compassionate service.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2.5, fontSize: "1.07rem", lineHeight: 1.9 }}>
            Certificate and ecclesiastical degree paths include bachelor’s, master’s, and doctoral-level work. Degree-by-thesis and dissertation options are rigorous and guided, producing work of meaningful depth and potential publishable quality.
          </Typography>
          <Button href="mailto:BishopJasonJones@TheGnosticCatholicUnion.org" variant="contained" color="secondary" sx={{ mt: 4 }}>Ask about enrollment</Button>
        </Grid>
      </Grid>
    </Container>
  </>
);

export default Seminary;

import React from "react";
import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  Groups2Rounded,
  MenuBookRounded,
} from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: <AutoAwesomeRounded />,
    title: "Inner knowing",
    text: "Gnosis is lived spiritual knowledge—a direct and transforming relationship with the Divine within.",
  },
  {
    icon: <MenuBookRounded />,
    title: "Ancient wisdom",
    text: "We study the teachings of Jesus, the Nag Hammadi library, and the many voices of early Christianity.",
  },
  {
    icon: <Groups2Rounded />,
    title: "Open community",
    text: "We welcome sincere seekers from every background and honor the individual path of spiritual development.",
  },
];

const Home = () => (
  <>
    <Box
      component="section"
      sx={{
        position: "relative",
        isolation: "isolate",
        minHeight: { xs: 680, md: 760 },
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: -2,
          inset: 0,
          background: "radial-gradient(circle at 72% 48%, rgba(121,201,190,.16), transparent 22rem), radial-gradient(circle at 72% 48%, transparent 0 12rem, rgba(215,181,109,.18) 12.08rem 12.16rem, transparent 12.24rem 18rem, rgba(215,181,109,.08) 18.08rem 18.16rem, transparent 18.24rem)",
        },
        "&::after": {
          content: '"✦"',
          position: "absolute",
          zIndex: -1,
          right: { xs: "50%", md: "12%" },
          top: { xs: "68%", md: "50%" },
          transform: { xs: "translate(50%, -50%)", md: "translateY(-50%)" },
          color: "primary.main",
          fontSize: { xs: "9rem", md: "15rem" },
          lineHeight: 1,
          opacity: 0.16,
          textShadow: "0 0 70px rgba(215,181,109,.32)",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Typography className="eyebrow" component="p">A living Gnostic Christian tradition</Typography>
            <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "3.7rem", sm: "5.2rem", md: "6.6rem" }, maxWidth: 820 }}>
              Seek the light.<br />Know the <Box component="span" sx={{ color: "primary.main" }}>divine within.</Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 3, maxWidth: 650, lineHeight: 1.7, fontWeight: 400 }}>
              The Gnostic Union is an independent sacramental assembly devoted to Christ, Holy Sophia, spiritual freedom, and the direct experience of God.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 4, alignItems: { xs: "stretch", sm: "center" } }}>
              <Button component={Link} to="/about" variant="contained" size="large" endIcon={<ArrowForwardRounded />}>Discover our tradition</Button>
              <Button component={Link} to="/seminary" variant="outlined" size="large">Explore the seminary</Button>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 4 }}>
              {["Independent", "Sacramental", "Inclusive", "International"].map((label) => <Chip key={label} label={label} variant="outlined" size="small" />)}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid", borderColor: "divider", backgroundColor: "rgba(255,255,255,.015)" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="start">
          <Grid item xs={12} md={5}>
            <Typography className="eyebrow" component="p">Our purpose</Typography>
            <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: "2.8rem", md: "4.2rem" } }}>A sanctuary for spiritual discovery</Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.08rem", lineHeight: 1.9 }}>
              We uphold Gnostic Christian traditions and encourage the work of Christ and Holy Sophia in the world. Independent, autonomous, and non-political, we depend on no authority outside our own administration. Our bishops, priests, and deacons serve as guides—helping each person build a direct relationship with God, the Monad, the Father.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2.5, fontSize: "1.08rem", lineHeight: 1.9 }}>
              Our community looks to early Christianity and teachings preserved in works such as the Gospel of Thomas and the Nag Hammadi writings. We welcome all people, regardless of their former religious background or present stage of the journey.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2.5} sx={{ mt: { xs: 5, md: 8 } }}>
          {pillars.map((pillar) => (
            <Grid item xs={12} md={4} key={pillar.title}>
              <Card className="glass-panel" sx={{ height: "100%", transition: "transform .25s ease, border-color .25s ease", "&:hover": { transform: "translateY(-6px)", borderColor: "primary.main" } }}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, "&:last-child": { pb: { xs: 3, md: 4 } } }}>
                  <Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", color: "primary.main", borderRadius: "50%", backgroundColor: "rgba(215,181,109,.1)", mb: 3 }}>{pillar.icon}</Box>
                  <Typography variant="h4" sx={{ mb: 1.5 }}>{pillar.title}</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>{pillar.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", position: "relative", p: { xs: 3, sm: 6 }, borderBlock: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ color: "primary.main", fontSize: "2rem", lineHeight: 1 }}>✦</Typography>
          <Typography variant="h3" sx={{ mt: 2, fontSize: { xs: "2.25rem", md: "3.4rem" } }}>
            “Gnosis is not merely knowledge about the Divine. It is the awakening of divine knowledge within.”
          </Typography>
          <Button component={Link} to="/blogs" color="secondary" endIcon={<ArrowForwardRounded />} sx={{ mt: 3 }}>Visit the journal</Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Home;

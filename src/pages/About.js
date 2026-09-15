import React from "react";
import { AutoStoriesRounded, ChurchRounded, HubRounded, LightbulbRounded } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

const sections = [
  { title: "A welcoming communion", content: "We are a world church and communion of churches in the tradition of independent Gnostic faiths. We welcome people of every background who sincerely seek spiritual understanding.", icon: <ChurchRounded /> },
  { title: "Our mission", content: "The Gnostic Union is an independent sacramental assembly of Gnostic communities and individuals, created to uphold the tradition and further the work of Christ and Holy Sophia in the world.", icon: <LightbulbRounded /> },
  { title: "Unity with independence", content: "Our international, autonomous, and non-political organization provides a network for communication and fellowship while honoring the integrity and spiritual freedom of its communities.", icon: <HubRounded /> },
  { title: "A living tradition", content: "Our apostolic lineages follow several paths, most notably the older Gnostic traditions and the French Gnostic Church. We approach lineage as a responsibility to serve, teach, and preserve.", icon: <AutoStoriesRounded /> },
];

const About = () => (
  <>
    <Box component="header" sx={{ py: { xs: 9, md: 14 }, borderBottom: "1px solid", borderColor: "divider", textAlign: "center", position: "relative" }}>
      <Container maxWidth="md">
        <Typography className="eyebrow" component="p" sx={{ justifyContent: "center" }}>Who we are</Typography>
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "3.6rem", md: "6rem" } }}>Many paths.<br /><Box component="span" sx={{ color: "primary.main" }}>One sacred purpose.</Box></Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3, mx: "auto", maxWidth: 720, lineHeight: 1.75, fontWeight: 400 }}>
          A contemporary expression of an ancient current—rooted in inner knowing, sacramental life, compassionate service, and spiritual liberty.
        </Typography>
      </Container>
    </Box>

    <Box component="section" className="page-shell">
      <Grid container spacing={2.5}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} key={section.title}>
            <Card className="glass-panel" sx={{ height: "100%" }}>
              <CardContent sx={{ p: { xs: 3, md: 4.5 }, "&:last-child": { pb: { xs: 3, md: 4.5 } } }}>
                <Box sx={{ color: index % 2 ? "secondary.main" : "primary.main", mb: 2.5 }}>{section.icon}</Box>
                <Typography variant="h4" sx={{ mb: 1.5 }}>{section.title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{section.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 5, md: 9 }} sx={{ mt: { xs: 6, md: 10 } }}>
        <Grid item xs={12} md={5}>
          <Typography className="eyebrow" component="p">Gnosis</Typography>
          <Typography variant="h2" sx={{ mt: 2, fontSize: { xs: "2.8rem", md: "4rem" } }}>Knowledge that transforms the knower</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography color="text.secondary" sx={{ fontSize: "1.07rem", lineHeight: 1.9 }}>
            Gnosis is more than intellectual information. It is deep spiritual knowledge—an awakening to the Divine through direct experience. Gnostic Christian theology emerged among Hellenistic Jewish and Christian communities and flourished in diverse forms during Christianity’s formative centuries.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2.5, fontSize: "1.07rem", lineHeight: 1.9 }}>
            The discovery of the Nag Hammadi library in 1945 brought many ancient Gnostic writings back into view. Today, some Gnostics worship in sacramental churches with ordained clergy; others gather in study circles, home churches, or practice alone. We honor these expressions as parts of a living and creative tradition.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </>
);

export default About;

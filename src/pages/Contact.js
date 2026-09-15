import React, { useState } from "react";
import { ArrowForwardRounded, EmailOutlined, Groups2Outlined } from "@mui/icons-material";
import { Alert, Box, Button, Container, Grid, Link, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ open: false, severity: "success", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    const emailBody = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    try {
      const response = await fetch("https://formspree.io/f/moqgpdrk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: form.email, name: form.name, message: emailBody }),
      });
      if (!response.ok) throw new Error("Message failed");
      setForm({ name: "", email: "", message: "" });
      setStatus({ open: true, severity: "success", message: "Your message has been sent. We will be in touch soon." });
    } catch (error) {
      setStatus({ open: true, severity: "error", message: "Your message could not be sent. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 12 } }}>
      <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
        <Grid item xs={12} md={5}>
          <Typography className="eyebrow" component="p">Begin a conversation</Typography>
          <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "3.6rem", md: "5.6rem" } }}>Reach out.<br /><Box component="span" sx={{ color: "primary.main" }}>You are welcome here.</Box></Typography>
          <Typography color="text.secondary" sx={{ mt: 3, fontSize: "1.06rem", lineHeight: 1.85 }}>
            Whether you have a question about membership, Gnostic Christianity, community life, or seminary formation, we would be glad to hear from you.
          </Typography>
          <Stack spacing={2.5} sx={{ mt: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center"><EmailOutlined color="primary" /><Link href="mailto:theoccultcorner@gmail.com" underline="hover">theoccultcorner@gmail.com</Link></Stack>
            <Stack direction="row" spacing={2} alignItems="center"><Groups2Outlined color="secondary" /><Typography color="text.secondary">Open to seekers worldwide</Typography></Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper className="glass-panel" component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
            <Typography variant="h3" sx={{ mb: 1 }}>Send us a message</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>We typically respond by email.</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Name" value={form.name} onChange={update("name")} required autoComplete="name" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email" type="email" value={form.email} onChange={update("email")} required autoComplete="email" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="How can we help?" multiline minRows={6} value={form.message} onChange={update("message")} required /></Grid>
              <Grid item xs={12}><Button type="submit" variant="contained" size="large" disabled={sending} endIcon={<ArrowForwardRounded />}>{sending ? "Sending…" : "Send message"}</Button></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={status.open} autoHideDuration={6500} onClose={() => setStatus((value) => ({ ...value, open: false }))}>
        <Alert severity={status.severity} variant="filled" onClose={() => setStatus((value) => ({ ...value, open: false }))}>{status.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;

import { alpha, createTheme } from "@mui/material/styles";

const gold = "#D7B56D";
const teal = "#79C9BE";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: gold, contrastText: "#171109" },
    secondary: { main: teal, contrastText: "#071311" },
    background: { default: "#090C14", paper: "#121722" },
    text: { primary: "#F4F0E8", secondary: "#B8B3AA" },
    divider: alpha(gold, 0.18),
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", sans-serif',
    h1: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.035em" },
    h2: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em" },
    h3: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, lineHeight: 1.1 },
    h4: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600 },
    button: { fontWeight: 700, letterSpacing: "0.04em" },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { "::selection": { backgroundColor: alpha(gold, 0.32) } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, padding: "10px 20px", textTransform: "none" } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${alpha(gold, 0.14)}`,
          boxShadow: "0 22px 70px rgba(0, 0, 0, 0.24)",
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiTextField: { defaultProps: { variant: "outlined" } },
  },
});

export default theme;

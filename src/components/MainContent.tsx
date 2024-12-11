import { Container, Typography, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ListOfEmployees from "./ListOfEmployess";

function MainContent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Sample Page
        </Typography>
        <Typography variant="body1">
          This is a simple page to demonstrate the layout structure of employees app with a
          header, content, and footer.
        </Typography>

        <ListOfEmployees />
      </Container>

      <Footer />
    </Box>
  );
}

export default MainContent;

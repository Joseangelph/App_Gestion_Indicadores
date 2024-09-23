import { blue } from "@mui/material/colors";
import Layout from "../../Components/Layout"
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';

function Home() {


  return (
      <Layout>
        <Container maxWidth="md">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            sx={{ flexDirection: 'column' }}
          >
            <Card sx={{ width: '100%', backgroundColor:blue ,borderRadius:3 ,textAlign: 'center', padding: 7, boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h3" component="h1" gutterBottom>
                  Bienvenido a <strong>SIGIMI</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Gestiona tus indicadores y mide el impacto de tus plataformas tecnológicas de manera eficiente.
                </Typography>
                <Box mt={4}>
                </Box>
              </CardContent>
            </Card>
          </Box>
      </Container>
    </Layout>
  )
}

export default Home
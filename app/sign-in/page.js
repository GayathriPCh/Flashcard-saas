import { SignIn } from '@clerk/nextjs';
import { Box, Container,  Typography } from '@mui/material';
import Head from 'next/head';
import '../fonts.css'
export default function SignUpPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        padding: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          backgroundImage: 'url(/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9,
          zIndex: -1,
        }
      }}
    >
    <Container maxWidth="sm">
      <Head>
        <title>Sign In - Flashcard SaaS</title>
        <meta name="description" content="Sign in to your Flashcard SaaS account" />
      </Head>
      <br></br>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }} 
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Panforte',
            fontWeight: 'bold',
            color: '#47fcff', // Darker lavender shade matching the "Get Started" button
          }}
        >
          Sign In
        </Typography>
        <br></br>
        <SignIn routing="hash" />
      </Box>
    </Container>
    </Box>
  );
}

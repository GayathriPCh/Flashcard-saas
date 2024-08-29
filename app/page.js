'use client';
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Container, Typography, Box, Grid, Stack } from "@mui/material";
import Head from "next/head";
import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import './fonts.css';

export default function Home() {
  const [subscriptionType, setSubscriptionType] = useState(null);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!subscriptionType) {
      console.warn('No subscription type selected');
      return;
    }

    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3000',
      },
      body: JSON.stringify({ subscriptionType })
    });

    if (!checkoutSession.ok) {
      throw new Error(`HTTP error! status: ${checkoutSession.status}`);
    }

    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.log(checkoutSessionJson.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const pricingRef = useRef(null);
  const checkoutRef = useRef(null);

  const handlePricingHover = () => {
    if (checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        padding: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: '#47ffb9',
          backgroundImage: 'url(/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg">
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcard from your text" />
        </Head>
        <br />
        <Stack direction="row" spacing={3} justifyContent="flex-end">
          <SignedOut>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                },
              }}
              href="/sign-in"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                },
              }}
              href="/sign-up"
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Stack>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ fontFamily: 'Ankh Sanctuary', color: '#0dfbff' }}>
            Cardify
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              fontFamily: 'Panforte',
              fontWeight: 300,
              fontSize: '1.5rem',
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              color: '#47ffb9'
            }}
          >
            Recall with AI powered flashcards
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              mr: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              },
              padding: '12px 24px',
              fontSize: '1.2rem',
              minWidth: '150px',
            }}
            href="/generate"
          >
            Get started
          </Button>

        </Box>
        <Box
          sx={{ my: 5, textAlign: 'left' }}
          onMouseEnter={handlePricingHover}
          ref={pricingRef}
        >
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 700, mb: 5, color: '#47ffb9', textAlign: 'center' }}>
            Pricing
          </Typography>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                p: 3,
                width: 250,
                height: 250,
                border: "1px solid",
                borderColor: "grey.800",
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1.05)',
                }
              }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 'bold', textAlign: 'center', color: '#47ffb9' }}>
                  Free
                </Typography>
                <Typography sx={{ fontFamily: 'Panforte', fontWeight: 'medium', textAlign: 'center', color: 'white' }}>
                  Access to basic flashcard features with up to 10 cards storage.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    },
                  }}
                  onClick={() => router.push('/generate')}
                >
                  Choose Free
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                p: 3,
                width: 250, // Fixed width
                height: 250, // Fixed height to maintain a square shape
                border: "1px solid",
                borderColor: "grey.800",
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1.05)',
                }
              }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 'bold', textAlign: 'center', color: '#47ffb9' }}>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                  $5 / month
                </Typography>
                <Typography sx={{ fontFamily: 'Panforte', fontWeight: 'medium', textAlign: 'center', color: '#47ffb9' }}>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    },
                  }}
                  onClick={() => {
                    setSubscriptionType('Basic');
                    handleSubmit();
                  }}
                >
                  Choose Basic
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                p: 3,
                width: 250, // Fixed width
                height: 250, // Fixed height to maintain a square shape
                border: "1px solid",
                borderColor: "grey.800",
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1.05)',
                }
              }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 'bold', textAlign: 'center', color: '#47ffb9' }}>
                  Premium
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Panforte', fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                  $10 / month
                </Typography>
                <Typography sx={{ fontFamily: 'Panforte', fontWeight: 'medium', textAlign: 'center', color: '#47ffb9' }}>
                  Access to all flashcard features and unlimited storage.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    },
                  }}
                  onClick={() => {
                    setSubscriptionType('Premium');
                    handleSubmit();
                  }}
                >
                  Choose Premium
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

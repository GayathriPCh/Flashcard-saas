'use client';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { db } from '@/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionid = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionid) return;
      try {
        const res = await fetch(`/api/checkout_session?session_id=${sessionid}`);
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError('Error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [sessionid]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/" passHref>
            <Button variant="contained" color="primary">
              Return to Homepage
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      {session && session.payment_status === 'paid' ? (
        <>
          <Typography variant="h4">
            {session.subscription_type === 'pro'
              ? 'Thank you for subscribing to Pro!'
              : 'Thank you for subscribing to Basic!'}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                Go to Dashboard
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" color="error">
            Error: Payment status not found or payment incomplete.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                Return to Homepage
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading search params...</div>}>
    <ResultPage />
  </Suspense>
);

export default SuspenseWrapper;

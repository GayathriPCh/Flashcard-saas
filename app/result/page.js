'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';

// Component to show while loading
const Loading = () => (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
        </Typography>
    </Container>
);

// Component to show in case of error
const ErrorComponent = ({ error }) => (
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

// Component to show on success
const SuccessComponent = ({ session }) => (
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
            <ErrorComponent error="Error: Payment status not found or payment incomplete." />
        )}
    </Container>
);

const ResultPage = () => {
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
                    setError(sessionData.error || 'An error occurred');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchCheckoutSession();
    }, [sessionid]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return <SuccessComponent session={session} />;
};

export default ResultPage;

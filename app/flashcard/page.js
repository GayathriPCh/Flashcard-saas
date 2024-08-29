'use client';

import { Container, Card, Grid, Typography, Box, CardActionArea, CardContent } from "@mui/material";
import { doc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { db } from "@/firebase";

function FlashcardContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, 'users'), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const toggleFlip = (id) => {
    setFlipped((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card
              sx={{
                height: 200,
                perspective: '1000px',
                position: 'relative',
                backgroundColor: '#F9F7FC',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.6s',
                  transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => toggleFlip(flashcard.id)}
              >
                {/* Front Side */}
                <CardActionArea
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#C4A3C4',
                    color: '#FFFFFF',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: 'Dancing Script, cursive',
                        fontWeight: 700,
                      }}
                    >
                      {flashcard.front}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                {/* Back Side */}
                <CardActionArea
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#B48CB9',
                    color: '#FFFFFF',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: 'Dancing Script, cursive',
                        fontWeight: 700,
                      }}
                    >
                      {flashcard.back}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default function Flashcard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlashcardContent />
    </Suspense>
  );
}

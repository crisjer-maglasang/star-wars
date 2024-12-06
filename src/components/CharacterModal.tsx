import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface CharacterModalProps {
  character: any;
  show: boolean;
  onHide: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  show,
  onHide,
}) => {
  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (character) {
      fetchFilms();
    }
  }, [character]);

  const fetchFilms = async () => {
    setLoading(true);
    const filmRequests = character.films.map((url: string) => axios.get(url));
    const filmResponses = await Promise.all(filmRequests);
    setFilms(filmResponses.map((response) => response.data.title));
    setLoading(false);
  };

  return (
    <Modal open={show} onClose={onHide}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          marginTop: 4,
          width: "50%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {character.name}
        </Typography>
        <Typography variant="body1">Height: {character.height} cm</Typography>
        <Typography variant="body1">Weight: {character.mass} kg</Typography>
        <Typography variant="body1">Films:</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {films.map((film, index) => (
              <ListItem key={index}>
                <ListItemText primary={film} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};

export default CharacterModal;

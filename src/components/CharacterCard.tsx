import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";

interface CharacterCardProps {
  character: any;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  const characterId = character.url.split("/")[5];
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  return (
    <Card sx={{ width: 300 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={character.name}
          onError={(e: any) => (e.target.src = "fallback-image.jpg")}
          sx={{ transition: "filter 0.3s ease" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;

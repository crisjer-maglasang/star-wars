import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import SearchAndFilter from "./SearchAndFilter";
import { Pagination, Box, CircularProgress } from "@mui/material";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page: number) => {
    setLoading(true);
    const response = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );
    setCharacters(response.data.results);
    setTotalPages(Math.ceil(response.data.count / 10));
    setLoading(false);
  };

  const handleCharacterClick = (character: any) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const displayedCharacters = characters.slice(0, 9);

  return (
    <Box>
      <SearchAndFilter setCharacters={setCharacters} />
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          displayedCharacters.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              onClick={() => handleCharacterClick(character)}
            />
          ))
        )}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => setCurrentPage(page)}
        color="primary"
        sx={{ marginTop: 4, justifyContent: "center", display: "flex" }}
      />
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </Box>
  );
};

export default CharacterList;

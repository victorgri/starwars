import React, { useEffect, useState } from "react";
import { getHeroes } from "./api/apiMain";
import { HeroesList } from "./components/HeroesList/HeroesListMain";
import { HeroDetails } from "./components/HeroDetails/HeroDetailsMain";
import { Person } from "./Types";

const AppMain: React.FC = () => {
  const [details, setDetails] = useState(false);
  const [heroes, setHeroes] = useState<Person[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [heroId, setHeroId] = useState<number>(0);

  useEffect(() => {
    const fetchHeroes = async () => {
      if (page > 9) {
        setPage(1);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getHeroes(page);
        if (response && response.data && response.data.results) {
          setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch heroes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroes();
  }, [page]);

  return (
    <>
      {details && heroId !== null ? (
        <HeroDetails
          heroId={heroId}
          setDetails={setDetails}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <HeroesList
          isLoading={isLoading}
          setPage={setPage}
          heroes={heroes}
          setDetails={setDetails}
          setHeroId={setHeroId}
        />
      )}
    </>
  );
};

export default AppMain;

import React, { useEffect, useRef, useState } from "react";
import { Background, Edge, ReactFlow, type Node } from "@xyflow/react";
import { ClipLoader } from "react-spinners";
import { Film, Person, Starship } from "../../Types";
import { getFilms, getHeroDetails, getStarshipDetails } from "../../api/api";
import "./HeroDetails.scss";
import "@xyflow/react/dist/style.css";
import classNames from "classnames";

type Props = {
  setDetails: React.Dispatch<React.SetStateAction<boolean>>;
  heroId: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeroDetails: React.FC<Props> = ({
  setDetails,
  heroId,
  isLoading,
  setIsLoading,
}) => {
  const [hero, setHero] = useState<Person | undefined>();
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  const updateNodesAndEdges = () => {
    if (ref.current && hero) {
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;

      // Create hero node
      const heroNode = {
        id: "name",
        position: { x: width / 2 - 100, y: height / 4 },
        data: { label: hero.name || "" },
      };

      // Create film nodes
      const filmNodes = films
        .filter((film) => hero.films.includes(+film.episode_id))
        .map((film, index) => ({
          id: `film-${film.episode_id}`,
          position: {
            x: (width / (films.length + 1)) * (index + 1),
            y: height / 2,
          },
          data: { label: film.title },
        }));

      // Create starship nodes and edges
      const starshipNodes: Node[] = [];
      const starshipEdges: Edge[] = [];

      films
        .filter((film) => hero.films.includes(+film.episode_id))
        .forEach((film, filmIndex) => {
          starships
            .filter((starship) => starship.films.includes(film.id))
            .forEach((starship, starshipIndex) => {
              const starshipId = `starship-${film.episode_id}-${starshipIndex}`;
              starshipNodes.push({
                id: starshipId,
                position: {
                  x: (width / (films.length + 1)) * (filmIndex + 1) - 100,
                  y: height / 1.5,
                },
                data: { label: starship.name },
              });

              starshipEdges.push({
                type: "default",
                id: `${film.episode_id}-${starshipIndex}`,
                source: `film-${film.episode_id}`,
                target: starshipId,
              });
            });
        });

      // Update nodes and edges
      setNodes((prevNodes) => [
        ...prevNodes.filter(
          (node) =>
            !node.id.startsWith("film-") && !node.id.startsWith("starship-")
        ),
        heroNode,
        ...filmNodes,
        ...starshipNodes,
      ]);
      setEdges((prevEdges) => [
        ...prevEdges.filter((edge) => !edge.id.startsWith("link-")),
        ...films
          .filter((film) => hero.films.includes(+film.episode_id))
          .map((film) => ({
            type: "default",
            id: `link-${film.episode_id}`,
            source: "name",
            target: `film-${film.episode_id}`,
          })),
        ...starshipEdges,
      ]);
    }
  };

  useEffect(() => {
    const fetchHeroDetails = async () => {
      setIsLoading(true);
      try {
        const res = await getHeroDetails(heroId);
        if (res && res.data) {
          setHero(res.data);
        } else {
          console.error("Invalid response structure:", res);
        }
      } catch (error) {
        console.error("Failed to fetch hero details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroDetails();
  }, [heroId, setIsLoading]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getFilms();
        if (res && res.data && res.data.results) {
          setFilms(res.data.results);
        } else {
          console.error("Invalid response structure:", res);
        }
      } catch (error) {
        console.error("Failed to fetch films", error);
      }
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    const fetchStarships = async () => {
      if (hero?.starships.length) {
        try {
          const starshipPromises = hero.starships.map((id) =>
            getStarshipDetails(id)
          );
          const starshipResults = await Promise.all(starshipPromises);
          setStarships(starshipResults.map((res) => res.data));
        } catch (error) {
          console.error("Failed to fetch starships", error);
        }
      }
    };
    fetchStarships();
  }, [hero]);

  useEffect(() => {
    updateNodesAndEdges();
  }, [hero, films, starships]);

  return (
    <section className={classNames("details", { details__active: isLoading })}>
      {isLoading ? (
        <ClipLoader size={100} color="green" data-testid="spinner" />
      ) : (
        <>
          <div style={{ width: "100%", height: "600px" }} ref={ref}>
            <ReactFlow nodes={nodes} edges={edges}>
              <Background />
            </ReactFlow>
          </div>
          <button onClick={() => setDetails(false)}>Back</button>
        </>
      )}
    </section>
  );
};

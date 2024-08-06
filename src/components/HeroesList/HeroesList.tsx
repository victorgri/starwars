import React from "react";
import { Person } from "../../Types";
import ClipLoader from "react-spinners/ClipLoader";
import "./HeroesList.scss";
import classNames from "classnames";

type Props = {
  setDetails: React.Dispatch<React.SetStateAction<boolean>>;
  heroes: Person[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setHeroId: React.Dispatch<React.SetStateAction<number>>;
};

export const HeroesList: React.FC<Props> = ({
  setDetails,
  heroes,
  setPage,
  isLoading,
  setHeroId,
}) => {
  return (
    <section className={classNames("heroes", { 'heroes__isLoading': isLoading })}>
      {isLoading ? (
        <ClipLoader size={100} color="green" data-testid="spinner" />
      ) : (
        <table id="heroes">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {heroes.map((hero) => (
              <tr key={hero.id}>
                <td>
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
                    alt={hero.name}
                  />
                </td>
                <td>{hero.name}</td>
                <td>{hero.gender}</td>
                <td style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      setHeroId(hero.id);
                      setDetails(true);
                    }}
                  >
                    Learn More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && (
        <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
      )}
    </section>
  );
};

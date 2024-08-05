import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeroesList } from "./HeroesListMain";
import { Person } from "../../Types";

const heroes: Person[] = [
  {
    id: 1,
    name: "Luke Skywalker",
    gender: "male",
    films: [],
    starships: [],
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    birth_year: "",
    homeworld: 0,
    species: [],
    vehicles: [],
    created: "",
    edited: "",
    url: "",
  },
  {
    id: 2,
    name: "Leia Organa",
    gender: "female",
    films: [],
    starships: [],
    height: "",
    mass: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    birth_year: "",
    homeworld: 0,
    species: [],
    vehicles: [],
    created: "",
    edited: "",
    url: "",
  },
];

test("renders heroes list and handles click event", () => {
  const setDetails = jest.fn();
  const setHeroId = jest.fn();
  const setPage = jest.fn();

  render(
    <HeroesList
      setDetails={setDetails}
      heroes={heroes}
      setPage={setPage}
      isLoading={false}
      setHeroId={setHeroId}
    />
  );

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("Leia Organa")).toBeInTheDocument();

  const learnMoreButtons = screen.getAllByText("Learn More");
  fireEvent.click(learnMoreButtons[0]);

  expect(setHeroId).toHaveBeenCalledWith(1);
  expect(setDetails).toHaveBeenCalledWith(true);
});

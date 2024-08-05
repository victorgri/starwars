"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom");
const HeroesList_1 = require("./HeroesList");
const heroes = [
    {
        id: 1, name: "Luke Skywalker", gender: "male", films: [], starships: [],
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
        url: ""
    },
    {
        id: 2, name: "Leia Organa", gender: "female", films: [], starships: [],
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
        url: ""
    },
];
test("renders heroes list and handles click event", () => {
    const setDetails = jest.fn();
    const setHeroId = jest.fn();
    const setPage = jest.fn();
    (0, react_2.render)(react_1.default.createElement(HeroesList_1.HeroesList, { setDetails: setDetails, heroes: heroes, setPage: setPage, isLoading: false, setHeroId: setHeroId }));
    expect(react_2.screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(react_2.screen.getByText("Leia Organa")).toBeInTheDocument();
    const learnMoreButtons = react_2.screen.getAllByText("Learn More");
    react_2.fireEvent.click(learnMoreButtons[0]);
    expect(setHeroId).toHaveBeenCalledWith(1);
    expect(setDetails).toHaveBeenCalledWith(true);
});

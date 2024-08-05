"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom");
const HeroDetails_1 = require("./HeroDetails");
test("renders hero details and handles loading state", () => {
    const setDetails = jest.fn();
    const setIsLoading = jest.fn();
    (0, react_2.render)(react_1.default.createElement(HeroDetails_1.HeroDetails, { setDetails: setDetails, heroId: 1, isLoading: false, setIsLoading: setIsLoading }));
    expect(react_2.screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(react_2.screen.getByText("A New Hope")).toBeInTheDocument();
    expect(react_2.screen.getByText("X-Wing")).toBeInTheDocument();
    const backButton = react_2.screen.getByText("Back");
    react_2.fireEvent.click(backButton);
    expect(setDetails).toHaveBeenCalledWith(false);
});

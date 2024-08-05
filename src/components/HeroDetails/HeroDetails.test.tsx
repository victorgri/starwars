import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeroDetails } from "./HeroDetails";

test("renders hero details and handles loading state", () => {
  const setDetails = jest.fn();
  const setIsLoading = jest.fn();

  render(
    <HeroDetails
      setDetails={setDetails}
      heroId={1}
      isLoading={false}
      setIsLoading={setIsLoading}
    />
  );

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("A New Hope")).toBeInTheDocument();
  expect(screen.getByText("X-Wing")).toBeInTheDocument();

  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);

  expect(setDetails).toHaveBeenCalledWith(false);
});

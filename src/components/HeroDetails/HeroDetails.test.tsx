import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HeroDetails } from "./HeroDetails";
import React from "react";
import { validFilms, validPersonNames } from "../../test/constants";

test("renders hero details and handles loading state", async () => {
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

  // Ensure the component renders name and film are checked
  await waitFor(() => {
    const nameIsPresent = validPersonNames.some((name) =>
      screen.queryByText(name)
    );
      const filmIsPresent = validFilms.some((title) => screen.queryByText(title));
      expect(nameIsPresent).toBe(true);
      expect(filmIsPresent).toBe(true);
  });

  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);

  expect(setDetails).toHaveBeenCalledWith(false);
});

// api.ts
import apiClient from "./apiClientMain";
import { Film, Person, Starship } from "../Types";

interface GetHeroesResponse {
  results: Person[];
}

interface GetFilmsResponse {
  results: Film[];
}

export const getHeroes = (page: number) =>
  apiClient.get<GetHeroesResponse>(`/people?page=${page}`);

export const getHeroDetails = (id: number) =>
  apiClient.get<Person>(`/people/${id}`);

export const getFilms = () => apiClient.get<GetFilmsResponse>(`/films`);

export const getStarshipDetails = (id: number) =>
  apiClient.get<Starship>(`/starships/${id}`);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStarshipDetails = exports.getFilms = exports.getHeroDetails = exports.getHeroes = void 0;
// api.ts
const apiClient_1 = __importDefault(require("./apiClient"));
const getHeroes = (page) => apiClient_1.default.get(`/people?page=${page}`);
exports.getHeroes = getHeroes;
const getHeroDetails = (id) => apiClient_1.default.get(`/people/${id}`);
exports.getHeroDetails = getHeroDetails;
const getFilms = () => apiClient_1.default.get(`/films`);
exports.getFilms = getFilms;
const getStarshipDetails = (id) => apiClient_1.default.get(`/starships/${id}`);
exports.getStarshipDetails = getStarshipDetails;

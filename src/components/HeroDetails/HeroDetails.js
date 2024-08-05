"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroDetails = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@xyflow/react");
const react_spinners_1 = require("react-spinners");
const api_1 = require("../../api/api");
require("./HeroDetails.scss");
require("@xyflow/react/dist/style.css");
const classnames_1 = __importDefault(require("classnames"));
const HeroDetails = ({ setDetails, heroId, isLoading, setIsLoading, }) => {
    const [hero, setHero] = (0, react_1.useState)();
    const [films, setFilms] = (0, react_1.useState)([]);
    const [starships, setStarships] = (0, react_1.useState)([]);
    const [nodes, setNodes] = (0, react_1.useState)([]);
    const [edges, setEdges] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)(null);
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
            const starshipNodes = [];
            const starshipEdges = [];
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
                ...prevNodes.filter((node) => !node.id.startsWith("film-") && !node.id.startsWith("starship-")),
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
    (0, react_1.useEffect)(() => {
        const fetchHeroDetails = () => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const res = yield (0, api_1.getHeroDetails)(heroId);
                if (res && res.data) {
                    setHero(res.data);
                }
                else {
                    console.error("Invalid response structure:", res);
                }
            }
            catch (error) {
                console.error("Failed to fetch hero details", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchHeroDetails();
    }, [heroId, setIsLoading]);
    (0, react_1.useEffect)(() => {
        const fetchFilms = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield (0, api_1.getFilms)();
                if (res && res.data && res.data.results) {
                    setFilms(res.data.results);
                }
                else {
                    console.error("Invalid response structure:", res);
                }
            }
            catch (error) {
                console.error("Failed to fetch films", error);
            }
        });
        fetchFilms();
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchStarships = () => __awaiter(void 0, void 0, void 0, function* () {
            if (hero === null || hero === void 0 ? void 0 : hero.starships.length) {
                try {
                    const starshipPromises = hero.starships.map((id) => (0, api_1.getStarshipDetails)(id));
                    const starshipResults = yield Promise.all(starshipPromises);
                    setStarships(starshipResults.map((res) => res.data));
                }
                catch (error) {
                    console.error("Failed to fetch starships", error);
                }
            }
        });
        fetchStarships();
    }, [hero]);
    (0, react_1.useEffect)(() => {
        updateNodesAndEdges();
    }, [hero, films, starships]);
    return (react_1.default.createElement("section", { className: (0, classnames_1.default)("details", { details__active: isLoading }) }, isLoading ? (react_1.default.createElement(react_spinners_1.ClipLoader, { size: 100, color: "green", "data-testid": "spinner" })) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { width: "100%", height: "600px" }, ref: ref },
            react_1.default.createElement(react_2.ReactFlow, { nodes: nodes, edges: edges },
                react_1.default.createElement(react_2.Background, null))),
        react_1.default.createElement("button", { onClick: () => setDetails(false) }, "Back")))));
};
exports.HeroDetails = HeroDetails;

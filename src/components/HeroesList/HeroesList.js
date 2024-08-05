"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroesList = void 0;
const react_1 = __importDefault(require("react"));
const ClipLoader_1 = __importDefault(require("react-spinners/ClipLoader"));
require("./HeroesList.scss");
const classnames_1 = __importDefault(require("classnames"));
const HeroesList = ({ setDetails, heroes, setPage, isLoading, setHeroId, }) => {
    return (react_1.default.createElement("section", { className: (0, classnames_1.default)("heroes", { heroes__isLoading: isLoading }) },
        isLoading ? (react_1.default.createElement(ClipLoader_1.default, { size: 100, color: "green", "data-testid": "spinner" })) : (react_1.default.createElement("table", { id: "heroes" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Image"),
                    react_1.default.createElement("th", null, "Name"),
                    react_1.default.createElement("th", null, "Gender"),
                    react_1.default.createElement("th", null, "Details"))),
            react_1.default.createElement("tbody", null, heroes.map((hero) => (react_1.default.createElement("tr", { key: hero.id },
                react_1.default.createElement("td", null,
                    react_1.default.createElement("img", { src: `https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`, alt: hero.name })),
                react_1.default.createElement("td", null, hero.name),
                react_1.default.createElement("td", null, hero.gender),
                react_1.default.createElement("td", { style: { position: "relative" } },
                    react_1.default.createElement("button", { onClick: () => {
                            setHeroId(hero.id);
                            setDetails(true);
                        } }, "Learn More")))))))),
        !isLoading && (react_1.default.createElement("button", { onClick: () => setPage((prev) => prev + 1) }, "Next Page"))));
};
exports.HeroesList = HeroesList;

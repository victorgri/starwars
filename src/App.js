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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const api_1 = require("./api/api");
const HeroesList_1 = require("./components/HeroesList/HeroesList");
const HeroDetails_1 = require("./components/HeroDetails/HeroDetails");
const App = () => {
    const [details, setDetails] = (0, react_1.useState)(false);
    const [heroes, setHeroes] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [heroId, setHeroId] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const fetchHeroes = () => __awaiter(void 0, void 0, void 0, function* () {
            if (page > 9) {
                setPage(1);
                return;
            }
            setIsLoading(true);
            try {
                const response = yield (0, api_1.getHeroes)(page);
                if (response && response.data && response.data.results) {
                    setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
                }
                else {
                    console.error("Invalid response structure:", response);
                }
            }
            catch (error) {
                console.error("Failed to fetch heroes", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchHeroes();
    }, [page]);
    return (react_1.default.createElement(react_1.default.Fragment, null, details && heroId !== null ? (react_1.default.createElement(HeroDetails_1.HeroDetails, { heroId: heroId, setDetails: setDetails, isLoading: isLoading, setIsLoading: setIsLoading })) : (react_1.default.createElement(HeroesList_1.HeroesList, { isLoading: isLoading, setPage: setPage, heroes: heroes, setDetails: setDetails, setHeroId: setHeroId }))));
};
exports.default = App;

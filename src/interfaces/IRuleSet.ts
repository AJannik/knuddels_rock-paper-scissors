import { GameResult } from "../enums/GameResult";
import { IPlayable } from "./IPlayable";

export interface IRuleSet {
    evaluate(played : IPlayable, otherPlayed : IPlayable) : GameResult;
    getNpcSet() : IPlayable[];
}
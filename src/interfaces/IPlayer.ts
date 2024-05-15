import { GameResult } from "../enums/GameResult";
import { IPlayable } from "./IPlayable";

export interface IPlayer {
    setPlayed(playable: IPlayable): void;
    getPlayed() : IPlayable;
    hasWon(other: IPlayable): GameResult;
}
import { GameResult } from "../enums/GameResult";
import { IPlayable } from "../interfaces/IPlayable";
import { IPlayer } from "../interfaces/IPlayer";
import { IRuleSet } from "../interfaces/IRuleSet";
import { Undecided } from "./playables/Undecided";

export class Player implements IPlayer {
    private played: IPlayable;
    private ruleSet: IRuleSet;
    private score: number = 0;

    constructor(ruleSet: IRuleSet) {
        this.played = new Undecided();
        this.ruleSet = ruleSet;
    }
    getScore(): number {
        return this.score;
    }
    incrementScore(): void {
        this.score++;
    }

    hasWon(other: IPlayable): GameResult {
        return this.ruleSet.evaluate(this.played, other);
    }

    public setPlayed(playable: IPlayable) {        
        this.played = playable;
    }

    public getPlayed() : IPlayable {
        return this.played;
    }
}
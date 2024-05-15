import { GameResult } from "../enums/GameResult";
import { IPlayable } from "../interfaces/IPlayable";
import { IPlayer } from "../interfaces/IPlayer";
import { IRuleSet } from "../interfaces/IRuleSet";
import { Undecided } from "./playables/Undecided";

export class Player implements IPlayer {
    private played: IPlayable;
    private ruleSet: IRuleSet;

    constructor(ruleSet: IRuleSet) {
        this.played = new Undecided();
        this.ruleSet = ruleSet;
    }

    hasWon(other: IPlayable): GameResult {
        console.log(this.played);
        console.log(other);
        
        return this.ruleSet.evaluate(this.played, other);
    }

    public setPlayed(playable: IPlayable) {        
        this.played = playable;
    }

    public getPlayed() : IPlayable {
        return this.played;
    }
}
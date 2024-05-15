import { GameResult } from "../enums/GameResult";
import { IPlayable } from "../interfaces/IPlayable";
import { IPlayer } from "../interfaces/IPlayer";
import { IRuleSet } from "../interfaces/IRuleSet";
import { Undecided } from "./playables/Undecided";

export class NPC implements IPlayer {
    private played: IPlayable;
    private playables: IPlayable[];
    private ruleSet: IRuleSet;

    constructor(ruleSet: IRuleSet) {
        this.ruleSet = ruleSet;
        this.played = new Undecided();
        this.playables = this.ruleSet.getNpcSet();
    }

    hasWon(other: IPlayable): GameResult {
        return this.ruleSet.evaluate(this.played, other);
    }
    
    public setPlayed(playable: IPlayable) {
    }

    public getPlayed() : IPlayable {
        var selection = Phaser.Math.Between(0, this.playables.length - 1);        
        this.played = this.playables[selection];        

        return this.played;
    }
}
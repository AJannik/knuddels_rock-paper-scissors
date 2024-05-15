import { GameResult } from "../enums/GameResult";
import { IPlayable } from "../interfaces/IPlayable";
import { IRuleSet } from "../interfaces/IRuleSet";
import { Paper } from "./playables/Paper";
import { Rock } from "./playables/Rock";
import { Scissors } from "./playables/Scissors";

export class BasicRockPaperScissorsRuleSet implements IRuleSet {
    private npcSet: IPlayable[] = [new Rock(), new Paper(), new Scissors()];

    public evaluate(played: IPlayable, otherPlayed: IPlayable) : GameResult {                        
        if (otherPlayed instanceof played.constructor) {
            return GameResult.Tie;
        }
        
        if (played instanceof Rock) {
            if(otherPlayed instanceof Paper) {
                return GameResult.Lost;
            }
            else {
                return GameResult.Won;
            }
        }

        if (played instanceof Paper) {
            if (otherPlayed instanceof Scissors) {
                return GameResult.Lost;
            }
            else {
                return GameResult.Won;
            }
        }

        if (played instanceof Scissors) {
            if (otherPlayed instanceof Rock) {
                return GameResult.Lost;
            }
            else {
                return GameResult.Won;
            }
        }

        throw new Error('Tried to play "' + played.name + '" against "' + otherPlayed.name + '"!');
    }

    public getNpcSet() : IPlayable[]{
        return this.npcSet;
    }
}
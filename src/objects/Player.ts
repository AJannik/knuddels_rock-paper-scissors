import { Undecided } from "./playables/Undecided";

export class Player implements IPlayer{
    private played: IPlayable;

    // TODO: make player and npc classes separat
    constructor() {
        this.played = new Undecided();
    }

    public setPlayed(playable: IPlayable) {
        this.played = playable;
    }

    public getPlayed() : IPlayable {
        return this.played;
    }
}
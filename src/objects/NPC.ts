export class NPC implements IPlayer {
    private possiblePlays: IPlayable[];

    constructor(potentialPlays: IPlayable[]) {
        this.possiblePlays = potentialPlays;
    }
    
    public setPlayed(playable: IPlayable) {
    }

    public getPlayed() : IPlayable {
        var selection = Phaser.Math.Between(0, this.possiblePlays.length);

        return this.possiblePlays[selection];
    }
}
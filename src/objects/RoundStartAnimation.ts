import { Game, Scene, Time } from "phaser";

export class RoundStartAnimation extends Phaser.GameObjects.Sprite {
    private animatinoStep: number = 0;
    private speed: number = 0.02;
    private selectedSprite: string = "";
    public onComplete?: () => void;

    constructor(scene: Scene, x: number, y: number, sprite: string, scale: number) {
        super(scene, x, y, sprite);

        this.scale = scale;
    }

    public startAnimation(selectedSprite: string) {
        this.animatinoStep = 200;
        this.selectedSprite = selectedSprite;
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        
        if (this.animatinoStep > 0) {
            this.y = Math.sin(time * this.speed) * 200 + 30;
            this.animatinoStep--;
            
            if (this.animatinoStep == 0) {
                this.y = 200;
                this.setTexture(this.selectedSprite);
                if (this.onComplete) {
                    this.onComplete();
                }                
            }
        }
    }
}
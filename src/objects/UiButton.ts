import { Scene } from "phaser";

export class UiButton extends Phaser.GameObjects.Container {
    private overImage: Phaser.GameObjects.Image;
    private upImage: Phaser.GameObjects.Image;
    
    constructor(scene: Scene, x: number, y: number, overTexture: string, upTexture: string){
        super(scene, x, y);

        this.overImage = scene.add.image(0, 0, overTexture);
        this.upImage = scene.add.image(0, 0, upTexture);

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                //this.tint = 0x150022;
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        
    }
}
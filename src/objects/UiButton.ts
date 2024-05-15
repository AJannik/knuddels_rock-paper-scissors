import { Scene } from "phaser";

export class UiButton extends Phaser.GameObjects.Container {
    private overImage: Phaser.GameObjects.Image;
    private upImage: Phaser.GameObjects.Image;
    private overTint: number;
    private pressedTint: number;
    private textField: Phaser.GameObjects.Text;
    
    constructor(scene: Scene, x: number, y: number, overTexture: string, upTexture: string, btnText?: string){
        super(scene, x, y);

        this.overImage = scene.add.image(0, 0, overTexture);
        this.upImage = scene.add.image(0, 0, upTexture);
        this.textField = scene.add.text(0, 0, '');

        this.overTint = 0x555555;
        this.pressedTint = 0x111111;

        this.setSize(this.upImage.width, this.upImage.height);
        this.add(this.upImage);
        this.add(this.textField);

        this.textField.setActive(false);

        if(btnText != undefined) {
            this.textField.text = btnText;
            this.textField.setActive(true);
        }

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.upImage.tint = this.overTint;
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.upImage.tint = 0xffffff;
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.upImage.tint = this.pressedTint;
            });
    }
}
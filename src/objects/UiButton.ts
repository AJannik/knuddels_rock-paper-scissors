import { Scene } from "phaser";

export class UiButton extends Phaser.GameObjects.Container {
    private upImage: Phaser.GameObjects.Image;
    private overTint: number;
    private pressedTint: number;
    private textField: Phaser.GameObjects.Text;
    
    constructor(scene: Scene, x: number, y: number, texture: string, scale: number, btnText?: string){
        super(scene, x, y);

        this.upImage = scene.add.image(0, 0, texture);
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

        this.scale = scale;

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.upImage.tint = this.overTint;
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if(this.active) {
                    this.upImage.clearTint();
                }                
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.upImage.tint = this.pressedTint;
            });
    }

    public deactivate() {
        this.setActive(false);
        this.disableInteractive();
        this.alpha = 0.5;
        this.upImage.tint = 0x777777;
    }

    public activate() {
        this.setActive(true);
        this.setInteractive();
        this.alpha = 1;
        this.upImage.clearTint();
    }
}
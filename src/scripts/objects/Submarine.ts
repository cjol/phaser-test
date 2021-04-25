import { CollisionCategories } from "./CollisionCategories";
import { gameManager } from "./GameManager";
import { MechanicalArm } from "./MechanicalHook";

type Key = "up" | "down" | "left" | "right";
export const WATER_LEVEL = 220;
// make it so we go up faster than down
const BUOYANCY = 1.8;

export default class Submarine extends Phaser.Physics.Matter.Image {
	keys: Record<Key, Phaser.Input.Keyboard.Key>;
	hook: MechanicalArm;

	// Constructor for submarine
	constructor(scene: Phaser.Scene, x: number, y: number = WATER_LEVEL - 20) {
		// Create submarine
		super(scene.matter.world, x, y, "submarine", undefined, {
			frictionAir: 0.05,
			mass: 500
		});

		scene.add.existing(this);
		this.setupKeys();

		this.setCollisionCategory(CollisionCategories.SUBMARINE);
		this.setCollidesWith(
			CollisionCategories.WALLS |
				CollisionCategories.MECHANICAL_HOOK |
				CollisionCategories.HAZARD
		);

		this.hook = new MechanicalArm(
			scene,
			this,
			gameManager.getUpgradeValue("chain")
		);

		this.displayWidth = this.width * 0.25;
		this.displayHeight = this.height * 0.25;
		this.setIgnoreGravity(true);
	}

	setupKeys() {
		this.keys = this.scene.input.keyboard.addKeys(
			{
				up: "W",
				down: "S",
				left: "A",
				right: "D"
			},
			true,
			true
		) as Record<string, Phaser.Input.Keyboard.Key>;
	}

	// Update loop - game physics based on acceleration
	update() {
		this.updateKeys();
		this.updateArm();
		this.updateDepth();
		if (gameManager.submarineIsDead)
			this.killSubmarine();

	}

	updateDepth() {
		// Update the max depth if it needs it
		const depth = (this.y - WATER_LEVEL) / 10;
		gameManager.currentDepth = depth;
		if (depth > gameManager.maxDepthReached)
			gameManager.maxDepthReached = depth;
	}

	updateArm() {
		this.hook.update();
	}

	updateKeys() {
		if (gameManager.submarine.isDead)
			return;

		const speed = gameManager.getUpgradeValue("shipSpeed");
		// X direction - assume no key pressed
		// Check for left and right keys
		let flipX = this.flipX;
		if (this.keys.left.isDown) {
			this.setVelocityX(-speed);
			flipX = true;
		} else if (this.keys.right.isDown) {
			this.setVelocityX(speed);
			flipX = false;
		}

		// Force the sub not to rotate
		this.setFlip(flipX, false);
		this.setRotation(0);

		// Y direction - assume no key pressed
		// Check for up and down keys
		if (this.keys.up.isDown) {
			this.setVelocityY(-speed * BUOYANCY);
			this.setRotation(flipX ? 0.1 : -0.1);
		} else if (this.keys.down.isDown) {
			this.setVelocityY(speed);
			this.setRotation(flipX ? -0.1 : 0.1);
		}

		// stop moving up past the water level
		if (this.y < WATER_LEVEL)
			this.y = WATER_LEVEL;

		if (this.y < WATER_LEVEL + 20)
			gameManager.submarine.isAtSurface = true;
		else {
			if (gameManager.submarine.isAtSurface)
				gameManager.submarine.isAtSurface = false;
		}
	}

	// Function to run if you kill the submarine
	killSubmarine() {
		gameManager.submarine.isDead = true;
		this.setFrictionAir(0.5);
		this.setAngularVelocity(0.1);
		this.setIgnoreGravity(false);
	}

	checkUpgrades() {
		if (gameManager.getUpgradeValue("chain") !== this.hook.getLength())
			this.upgradeArm();
	}
	upgradeArm() {
		this.hook.destroy();
		this.hook = new MechanicalArm(
			this.scene,
			this,
			gameManager.getUpgradeValue("chain")
		);
	}
}

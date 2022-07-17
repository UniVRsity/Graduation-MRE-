/* 
array pop and find based on the question number we're on 
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// export all info to databse file then put databse items in array
// and reference array points easy to push aand pop new qs
//working now for late joiners

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Creation } from './Creation';

/**  
 * The main class of this app. All the logic goes here.
 */
export default class Graduation {

	private assets: MRE.AssetContainer;
	private cap: MRE.Actor = null;
	private capPos: MRE.Vector3 = new MRE.Vector3(0, .1, 0.00);
	private capScale: MRE.Vector3 = new MRE.Vector3(.3, .3, .3);
	private scrollScale: MRE.Vector3 = new MRE.Vector3(.15, .15, .15);
	private capRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -215.0 * MRE.DegreesToRadians);

	private scroll: MRE.Actor = null;

	private attachedHats = new Map<MRE.Guid, MRE.Actor>();


	constructor(private context: MRE.Context, private baseUrl: string) {
		this.assets = new MRE.AssetContainer(context);
		// Hook the context events we're interested in.
		this.context.onStarted(() => this.started());
		this.context.onUserJoined(user => this.onUserJoined(user));
		this.context.onUserLeft(user => this.userLeft(user));
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// Check whether code is running in a debuggable watched filesystem
		// environment and if so delay starting the app by 1 second to give
		// the debugger time to detect that the server has restarted and reconnect.
		// The delay value below is in milliseconds so 1000 is a one second delay.
		// You may need to increase the delay or be able to decrease it depending
		// on the speed of your PC.
	
		this.scroll = Creation.createKit(this.context, "Graduation > Scroll", true, "2047641287510721202", 
		this.capPos, this.scrollScale, this.capRot);

	}

	
	
	private userLeft(user: MRE.User) {
		// If the user was wearing a hat, destroy it. Otherwise it would be
		// orphaned in the world.
		this.removeHats(user);
	}
	private onUserJoined(user: MRE.User) {
		this.showHatMenu(user);
	}

	private showHatMenu(userStuff: MRE.User) {
		// Create a parent object for all the menu items.
		const menu = MRE.Actor.Create(this.context, {});
	
		let y = 0.3;
		let temp = "a" + userStuff.id;
		// Create menu button
		const buttonMesh = this.assets.createBoxMesh('button', 0.3, 0.3, 0.01);

		// Create button for graduation hat 
		const button = MRE.Actor.Create(this.context, {
			actor: {
				parentId: menu.id,
				name: "Grad Cap" + temp,
				appearance: { meshId: buttonMesh.id },
				collider: { geometry: { shape: MRE.ColliderType.Auto } },
				transform: {
					local: { position: { x: 0, y, z: 0 } }
				}
			}
		});
		// Set a click handler on the button.
		button.setBehavior(MRE.ButtonBehavior)
			.onClick(userStuff => this.wearHat("this sucks > Cap No Colid", userStuff.id));

			// Create a label for the menu entry.
			MRE.Actor.Create(this.context, {
				actor: {
					parentId: menu.id,
					name: 'label',
					text: {
						contents: "Grad Cap",
						height: 0.5,
						anchor: MRE.TextAnchorLocation.MiddleLeft
					},
					transform: {
						local: { position: { x: 0.5, y, z: 0 } }
					}
				}
			});

		// Create a label for the menu title.
		// MRE.Actor.Create(this.context, {
		// 	actor: {
		// 		parentId: menu.id,
		// 		name: 'label',
		// 		text: {
		// 			contents: ''.padStart(8, ' ') + "Wear Graduation Hat",
		// 			height: 0.8,
		// 			anchor: MRE.TextAnchorLocation.MiddleCenter,
		// 			color: MRE.Color3.Yellow()
		// 		},
		// 		transform: {
		// 			local: { position: { x: 0.5, y: y + 0.25, z: 0 } }
		// 		}
		// 	}
		// });
	}
	private wearHat(hatId: string, userId: MRE.Guid) {
		// If the user is wearing a hat, destroy it.
		this.removeHats(this.context.user(userId));

		this.attachedHats.set( userId, Creation.createAttachedKit(this.context, 
			"this sucks > Cap No Colid", true, "2047641287376503473", 
		this.capPos, this.capScale, this.capRot, userId));
	}
	
	private removeHats(user: MRE.User) {
		if (this.attachedHats.has(user.id)) { this.attachedHats.get(user.id).destroy(); }
		this.attachedHats.delete(user.id);
	}

			
	
	
	
}
//array pop and find based on the question number we're on 

/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
//export all info to databse file then put databse items in array
//and reference array points easy to push aand pop new qs

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export class Creation {

	private temp: MRE.Actor = null;
	private buttonRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -180.0 * MRE.DegreesToRadians);

	constructor(private context: MRE.Context, private baseUrl: string) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private started() {
		
	}
	
	//returns an MRE actor given the arguments below 
	private createKit(name: string, artifactID: string, kitPos: MRE.Vector3,
		kitScale: MRE.Vector3, kitRotation: MRE.Quaternion): MRE.Actor {
		this.temp = MRE.Actor.CreateFromLibrary(this.context, {
			resourceId: artifactID,
			actor: {
				name: name,

				transform: {
					local: {
						position: kitPos,
						rotation: kitRotation,
						scale: kitScale
					}
				}
			}
		});
		return this.temp;
	}
	//returns an MRE actor for text 
	private createText(name: string, textPos: MRE.Vector3, content: string): MRE.Actor {
		this.temp = MRE.Actor.Create(this.context, {
			actor: {
				name: name,
				transform: {
					app: {
						position: textPos,
						rotation: this.buttonRot
					}
				},
				text: {
					contents: content,
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				}
			}
		});
		return this.temp;
	}

	
}
//array pop and find based on the question number we're on 

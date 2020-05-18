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

	//returns an MRE actor given the arguments below 
    public static createKit(context: MRE.Context,name: string, isGrababble: boolean, 
        artifactID: string, kitPos: MRE.Vector3,
		kitScale: MRE.Vector3, kitRotation: MRE.Quaternion): MRE.Actor {
		return MRE.Actor.CreateFromLibrary(context, {
			resourceId: "artifact:" + artifactID,
			actor: {
				name: name,
				grabbable: isGrababble,

				transform: {
					local: {
						position: kitPos,
						rotation: kitRotation,
						scale: kitScale
                    }
                    
				}
			}
		});
    }
    
    public static createAttachedKit(context: MRE.Context,name: string, isGrababble: boolean, 
        artifactID: string, kitPos: MRE.Vector3,
		kitScale: MRE.Vector3, kitRotation: MRE.Quaternion, userId: MRE.Guid): MRE.Actor {
		return MRE.Actor.CreateFromLibrary(context, {
			resourceId: "artifact:" + artifactID,
			actor: {
				name: name,
				grabbable: isGrababble,

				transform: {
					local: {
						position: kitPos,
						rotation: kitRotation,
						scale: kitScale
                    }                    
                },
                attachment: {
					attachPoint: 'head',
					userId
				}
			}
		});
	}
	//returns an MRE actor for text 
    public static createText(context: MRE.Context, name: string, textPos: MRE.Vector3,
         textRot: MRE.Vector3, content: string): MRE.Actor {
		return MRE.Actor.Create(context, {
			actor: {
				name: name,
				transform: {
					app: {
						position: textPos,
						rotation: textRot
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
	}

	
}
//array pop and find based on the question number we're on 
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
//export all info to databse file then put databse items in array
//and reference array points easy to push aand pop new qs

// import * as MRE from '@microsoft/mixed-reality-extension-sdk';
// import { Creation } from './Creation';

/**
 * The main class of this app. All the logic goes here.
 */
// export default class Graduation {

// 	private cap: MRE.Actor = null;
// 	private capPos: MRE.Vector3 = new MRE.Vector3(-4, .5, -0.1);
// 	private capScale: MRE.Vector3 = new MRE.Vector3(.1, .1, .1);
// 	private capRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -180.0 * MRE.DegreesToRadians);


// 	constructor(private context: MRE.Context, private baseUrl: string) {
// 		this.context.onStarted(() => this.started());
// 	}

// 	/**
// 	 * Once the context is "started", initialize the app.
// 	 */
// 	private started() {
// 		this.cap = Creation.createKit(this.context, "Graduation > Grad Cap", true, "1428444450165621707", 
// 		this.capPos, this.capScale, this.capRot);
// 	}
	
	
	
// }
// //array pop and find based on the question number we're on 

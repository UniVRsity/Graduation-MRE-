/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export default class VRQuiz2 {



	private choice1Pos: MRE.Vector3 = new MRE.Vector3(0, .0, -0);


	private choice2: MRE.Actor = null;
	private choice1Cube: MRE.Actor = null;
	private choice1Count = 0;

	private adminID: any = null;

	questionNumber = 0;
	isAnwser = false;



	constructor(private context: MRE.Context, private baseUrl: string) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private started() {
		this.choice2 = MRE.Actor.Create(this.context, {
			actor: {
				name: 'choice1',
				transform: {
					app: { position: this.choice1Pos }
				},
				text: {
					contents: this.choice1Count.toString(),
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				}
			}
		});
	}
}

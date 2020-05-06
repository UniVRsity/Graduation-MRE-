/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

interface Question {
	name: string;
	ID: string;
}

interface QuestionDatabase {
	[key: string]: Question;
}

const Qdatabase: QuestionDatabase = require('../public/QuestionDatabase.json');
//console.log(Qdatabase);
/**
 * The main class of this app. All the logic goes here.
 */
export class Creation {

	public static Q1: Question = {
		name: "Controller Demonstration > 1447318670182187876 Full Demoo",
		ID: "artifact:1450169649340613008"
	};



	constructor(private context: MRE.Context, private baseUrl: string) {
		console.log("aauyyy");
		this.context.onStarted(() => this.started());
	}

	/**hg
	 * Once the context is "started", initialize the app.
	 */
	private started() {

		//const keys = Object.keys(Qdatabase);
		console.log(Qdatabase["Q5"].name);
		//for (const bodyName of keys) {
		//	console.log(bodyName);
		//	console.log( Qdatabase[bodyName]);
		//}
	}
}

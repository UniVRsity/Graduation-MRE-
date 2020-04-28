/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';


/**
 * The main class of this app. All the logic goes here.
 */


//var currentQu: number = 0;
export default class HelloWorld {

	private next: MRE.Actor = null;
	private previous: MRE.Actor = null;
	private showAnwser: MRE.Actor = null;
	private anwserBackground: MRE.Actor = null;
	private start: MRE.Actor = null;
	private light: MRE.Actor = null;

	private anwserBackgroundPos: MRE.Vector3 = MRE.Vector3.FromArray([-1.75, 0.0, -0.2]);
	private anwserPos: MRE.Vector3 = MRE.Vector3.FromArray([-1.75, 0.0, -0.1]);
	private nextPos: MRE.Vector3 = MRE.Vector3.FromArray([-.4, 0.0, -0.1]);
	private prevPos: MRE.Vector3 = MRE.Vector3.FromArray([0, 0.0, -0.1]);
	private startPos: MRE.Vector3 = MRE.Vector3.FromArray([-.4, 0.0, -0.1]);

	private buttonRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -180.0 * MRE.DegreesToRadians);

	private buttonScale: MRE.Vector3 = MRE.Vector3.FromArray([0.08, 0.08, 0.08]);

	private animPos: MRE.Vector3 = MRE.Vector3.FromArray([-.7, 1.0,-0.1]);
	private animScale: MRE.Vector3 = MRE.Vector3.FromArray([.4, .4, .4]);
	private animRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians);

	private temp: MRE.Actor = null;

	private Q1: MRE.Actor = null;
	private Q2: MRE.Actor = null;
	private Q3: MRE.Actor = null;
	private Q4: MRE.Actor = null;
	private Q5: MRE.Actor = null;
	private Q6: MRE.Actor = null;
	private Q7: MRE.Actor = null;
	private Q8: MRE.Actor = null;

	private Q1A: MRE.Actor = null;
	private Q2A: MRE.Actor = null;
	private Q3A: MRE.Actor = null;
	private Q4A: MRE.Actor = null;
	private Q5A: MRE.Actor = null;
	private Q6A: MRE.Actor = null;
	private Q7A: MRE.Actor = null;
	private Q8A: MRE.Actor = null;
	



	questionNumber = 0;
	isAnwser = false;
	currentQuestion = this.next;



	constructor(private context: MRE.Context, private baseUrl: string) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private started() {
		//create start icon 
		this.start = this.createKit('Next Button > Start', "artifact:1459632933429052299",
			this.startPos, this.buttonScale, this.buttonRot);
		//make start a button
		const startButtonBehavior = this.start.setBehavior(MRE.ButtonBehavior);
		// When clicked trigger quiz interface and put up first question 
		startButtonBehavior.onClick(_ => {
			this.start.destroy();
			//change question number to 1
			this.questionNumber++;
			this.beginQuiz();
		});
	}
	private beginQuiz() {
		//create next icon  
		this.next = this.createKit('Next Button > Next Button', "artifact:1459550776266326323",
			this.nextPos, this.buttonScale, this.buttonRot);

		//create previous icon 
		this.previous = this.createKit('Next Button > Prev', "artifact:1459576871355154850",
			this.prevPos, this.buttonScale, this.buttonRot);

		this.showAnwser = this.createKit('Next Button > Show Anwser', "artifact:1460403930600046846",
			this.anwserPos, this.buttonScale, this.buttonRot);

		this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205",
			this.anwserBackgroundPos, this.buttonScale, this.buttonRot);

		//display first question animation by default 
		this.Q1 = this.createKit('IUMeetup5 > Vector3static', "artifact:1456639080749072774",
			this.animPos, this.animScale, this.animRot);
		this.currentQuestion = this.Q1;
		this.updateQuestion();
	}

	//updates state based on user input 
	private updateQuestion() {

		//make next, previous, and Anwser icon into button 
		const nextButtonBehavior = this.next.setBehavior(MRE.ButtonBehavior);
		const previousButtonBehavior = this.previous.setBehavior(MRE.ButtonBehavior);
		const showAnwserButtonBehavior = this.showAnwser.setBehavior(MRE.ButtonBehavior);

		//if previous is pressed subtract 1 to question number, set isAnwser to false, and update animation. 
		nextButtonBehavior.onClick(_ => {
			if (this.questionNumber < 3) {
				this.isAnwser = false;
				this.anwserBackground.destroy();
				this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205",
					this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
				this.questionNumber++;
				this.currentQuestion.destroy();
				this.updateAnim();
			}
		});
		//if previous is pressed, subtract 1 to question number, set isAnwser to false, and update animation. 
		previousButtonBehavior.onClick(_ => {
			if (this.questionNumber > 1) {
				this.isAnwser = false;
				this.anwserBackground.destroy();
				this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205",
					this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
				this.questionNumber--;
				this.currentQuestion.destroy();
				this.updateAnim();
			}
		});
		//if anwserOff is pressed destroy it and enable anwserOn icon and update the animation 
		showAnwserButtonBehavior.onClick(_ => {
			this.isAnwser = !this.isAnwser;
			this.anwserBackground.destroy();
			if (this.isAnwser) {
				this.anwserBackground = this.createKit('Next Button > Anwser On Back', "artifact:1460401277274948054",
					this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
			}
			else {
				this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205",
					this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
			}
			this.currentQuestion.destroy();
			this.updateAnim();
		});

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

	private updateAnim() {
		//if we are at question 1 and not looking for the anwser animation
		//display question 1 animation and update currentQuestion pointer
		if (this.questionNumber === 1 && !this.isAnwser) {
			this.Q1 = this.createKit('IUMeetup5 > Vector3static', "artifact:1456639080749072774",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q1;
		}
		else if (this.questionNumber === 1 && this.isAnwser) {
			this.Q1A = this.createKit('IUMeetup5 > Vector3anim', "artifact:1456639073140605316",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q1A;
		}
		//if we are at question 2 and not looking for the anwser animation
		//display question 2 animation and update currentQuestion pointer
		else if (this.questionNumber === 2 && !this.isAnwser) {
			this.Q2 = this.createKit('IUMeetup5 > Trans Static', "artifact:1461016044742115537",
			this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q2;
		}

		else if (this.questionNumber === 2 && this.isAnwser) {
			this.Q2A = this.createKit('IUMeetup5 > Trans Amin', "artifact:1456650296703844553",
			this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q2A;
		}

		else if (this.questionNumber === 3 && !this.isAnwser) {
			this.Q3 = this.createKit('IUMeetup5 > Prefab Static', "artifact:1456774319194505946",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q3;
		}

		else if (this.questionNumber === 3 && this.isAnwser) {
			this.Q3A = this.createKit('IUMeetup5 > Prefab Anim', "artifact:1456782914212593752",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q3A;
		}

		else if (this.questionNumber === 4 && !this.isAnwser) {
			this.Q4 = this.createKit('IUMeetup5 > Instance Static', "artifact:1456872393480864276",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q4;
		}
		else if (this.questionNumber === 4 && this.isAnwser) {
			this.Q4A = this.createKit('IUMeetup5 > Instance Anim', "artifact:1456872393740911125",
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q4A;
		}

	}
}

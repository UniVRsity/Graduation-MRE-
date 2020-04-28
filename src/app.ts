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

		//if next is pressed add 1 to question number, destroy the current animation,
		//and update it to the new animation. 
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
		//if previous is pressed subtract 1 to question number, set isAnwser to false,
		//destroy the current animation, and update it to the new animation. 
		previousButtonBehavior.onClick(_ => {
			//only if there is another question to go to
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
			this.Q1 = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456639080749072774",
				actor: {
					name: 'IUMeetup5 > Vector3static',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q1;
		}
		else if (this.questionNumber === 1 && this.isAnwser) {
			this.Q1A = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456639073140605316",
				actor: {
					name: 'IUMeetup5 > Vector3anim',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q1A;
		}
		//if we are at question 2 and not looking for the anwser animation
		//display question 2 animation and update currentQuestion pointer
		else if (this.questionNumber === 2 && !this.isAnwser) {
			this.Q2 = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456650297098109130",
				actor: {
					name: 'IUMeetup5 > Trans Static',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q2;
		}

		else if (this.questionNumber === 2 && this.isAnwser) {
			this.Q2A = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456650296703844553",
				actor: {
					name: 'IUMeetup5 > Trans Amin',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q2A;
		}

		else if (this.questionNumber === 3 && !this.isAnwser) {
			this.Q3 = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456774319194505946",
				actor: {
					name: 'IUMeetup5 > Prefab Static',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q3;
		}

		else if (this.questionNumber === 3 && this.isAnwser) {
			this.Q3A = MRE.Actor.CreateFromLibrary(this.context, {
				resourceId: "artifact:1456782914212593752",
				actor: {
					name: 'IUMeetup5 > Prefab Anim',

					transform: {
						local: {
							position: { x: -.7, y: 1.0, z: -0.1 },
							rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
							scale: { x: 0.4, y: 0.4, z: 0.4 }
						}
					}
				}
			});
			this.currentQuestion = this.Q3A;
		}

		//if (this.questionNumber === 4 && this.isAnwser) {
		//	this.Q1 = MRE.Actor.CreateFromLibrary(this.context, {
		//		resourceId: "artifact:1456755778072347000",
		//		actor: {
		//			name: 'IUMeetup5 > E Speed Anim',

		//			transform: {
		//				local: {
		//					position: { x: -.7, y: 1.0, z: -0.1 },
		//					rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians),
		//					scale: { x: 0.4, y: 0.4, z: 0.4 }
		//				}
		//			}
		//		}
		//	});
		//}

	}
}

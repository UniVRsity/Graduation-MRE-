/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
//export all info to databse file then put databse items in array
//and reference array points easy to push aand pop new qs

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Creation } from './Creation';

interface Question {
	name: string;
	ID: string;
	//position: MRE.Vector3;
	//rotation: MRE.Quaternion;
	//scale: MRE.Vector3;
}

interface QuestionDatabase {
	[key: string]: Question;
}

const QDatabase: QuestionDatabase = require('../public/QuestionDatabase.json');
/**
 * The main class of this app. All the logic goes here.
 */
export default class VRQuiz {

	private next: MRE.Actor = null;
	private previous: MRE.Actor = null;
	private showAnwser: MRE.Actor = null;
	private anwserBackground: MRE.Actor = null;
	private start: MRE.Actor = null;
	private light: MRE.Actor = null;

	private anwserBackgroundPos: MRE.Vector3 = MRE.Vector3.FromArray([-1.75, -1, -0.2]);
	private anwserPos: MRE.Vector3 = MRE.Vector3.FromArray([-1.75, -1, -0.1]);
	private nextPos: MRE.Vector3 = MRE.Vector3.FromArray([-.4, -1, -0.1]);
	private prevPos: MRE.Vector3 = MRE.Vector3.FromArray([0, -1, -0.1]);
	private startPos: MRE.Vector3 = MRE.Vector3.FromArray([-.4, -1, -0.1]);

	private buttonRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -180.0 * MRE.DegreesToRadians);

	private buttonScale: MRE.Vector3 = MRE.Vector3.FromArray([0.08, 0.08, 0.08]);

	private animPos: MRE.Vector3 = MRE.Vector3.FromArray([-.7, 0, -0.1]);
	private animScale: MRE.Vector3 = MRE.Vector3.FromArray([.4, .4, .4]);
	private animRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians);
	private Q12Rot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -410 * MRE.DegreesToRadians);
	private Q8Rot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -60 * MRE.DegreesToRadians); 
	private Q8Scale: MRE.Vector3 = MRE.Vector3.FromArray([.3, .3, .3]);
	private Q9Rot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -87 * MRE.DegreesToRadians);
	private Q9Scale: MRE.Vector3 = new MRE.Vector3(1.1, 1.1, 1.1);
	private Q9Pos: MRE.Vector3 = new MRE.Vector3(1, .4, -0.1);

	private contrRot: MRE.Quaternion = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 90 * MRE.DegreesToRadians);
	private contrScale: MRE.Vector3 = new MRE.Vector3(3.1, 3.1, 3.1);
	private contrPos: MRE.Vector3 = MRE.Vector3.FromArray([-.7, 1.4, -0.1]);


	private C1TextPos: MRE.Vector3 = new MRE.Vector3(-4, .5, -0.1);
	private ATextPos: MRE.Vector3 = new MRE.Vector3(-4, -.5, .2);
	private C1ButtonPos: MRE.Vector3 = new MRE.Vector3(-4, -.5, -0.1);

	private C2TextPos: MRE.Vector3 = new MRE.Vector3(-5, .5, -0.1);
	private BTextPos: MRE.Vector3 = new MRE.Vector3(-5, -.5, .2);
	private C2ButtonPos: MRE.Vector3 = new MRE.Vector3(-5, -.5, -0.1);

	private C3TextPos: MRE.Vector3 = new MRE.Vector3(-6, .5, -0.1);
	private CTextPos: MRE.Vector3 = new MRE.Vector3(-6, -.5, .2);
	private C3ButtonPos: MRE.Vector3 = new MRE.Vector3(-6, -.5, -0.1);

	private C4TextPos: MRE.Vector3 = new MRE.Vector3(-7, .5, -0.1);
	private DTextPos: MRE.Vector3 = new MRE.Vector3(-7, -.5, .2);
	private C4ButtonPos: MRE.Vector3 = new MRE.Vector3(-7, -.5, -0.1);


	private temp: MRE.Actor = null;

	private Q1: MRE.Actor = null;
	private Q2: MRE.Actor = null;
	private Q3: MRE.Actor = null;
	private Q4: MRE.Actor = null;
	private Q5: MRE.Actor = null;
	private Q6: MRE.Actor = null;
	private Q7: MRE.Actor = null;
	private Q8: MRE.Actor = null;
	private Q9: MRE.Actor = null;
	private Q10: MRE.Actor = null;

	private Q1A: MRE.Actor = null;
	private Q2A: MRE.Actor = null;
	private Q3A: MRE.Actor = null;
	private Q4A: MRE.Actor = null;
	private Q5A: MRE.Actor = null;
	private Q6A: MRE.Actor = null;
	private Q7A: MRE.Actor = null;
	private Q8A: MRE.Actor = null;
	private Q9A: MRE.Actor = null;
	private Q10A: MRE.Actor = null;

	private choice1Text: MRE.Actor = null;
	private AText: MRE.Actor = null;
	private choice1Button: MRE.Actor = null;
	private choice1Count = 0;

	private choice2Text: MRE.Actor = null;
	private BText: MRE.Actor = null;
	private choice2Button: MRE.Actor = null;
	private choice2Count = 0;

	private choice3Text: MRE.Actor = null;
	private CText: MRE.Actor = null;
	private choice3Button: MRE.Actor = null;
	private choice3Count = 0;

	private choice4Text: MRE.Actor = null;
	private DText: MRE.Actor = null;
	private choice4Button: MRE.Actor = null;
	private choice4Count = 0;

	private adminID: any = null;
	
	private stopVotes = false;
	questionNumber = 0;
	isAnwser = false;
	currentQuestion = this.next;
	private usersVoted: MRE.Guid[] = [MRE.ZeroGuid];
	QuestionList = [QDatabase[0]];


	constructor(private context: MRE.Context, private baseUrl: string) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private started() {
		const keys = Object.keys(QDatabase);
		this.QuestionList.pop();
		for (const bodyName of keys) {
			this.QuestionList.push(QDatabase[bodyName]);
		}
		for (var i = 0; i< this.QuestionList.length; i++) {
			console.log(this.QuestionList[i]);
		}
		//create start icon 
		this.start = this.createKit('Next Button > Start', "artifact:1459632933429052299",
			this.startPos, this.buttonScale, this.buttonRot);
		//make start a button
		const startButtonBehavior = this.start.setBehavior(MRE.ButtonBehavior);
		// When clicked trigger quiz interface and put up first question 
		startButtonBehavior.onClick(user => {
			this.start.destroy();
			//change question number to 1
			this.questionNumber++;
			this.beginQuiz();
			this.adminID = user.id;
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
		this.Q1 = this.createKit(this.QuestionList[0].name, this.QuestionList[0].ID,
			this.animPos, this.Q8Scale, this.Q8Rot);
		this.currentQuestion = this.Q1;


		this.choice1Text = this.createText('choice 1', this.C1TextPos, this.choice1Count.toString());
		this.AText = this.createText('Choice 1', this.ATextPos, "A");
		//this.choice1Text.appearance.material.color = MRE.Color4.FromColor3(MRE.Color3.Green(), 4);
		this.choice1Button = this.createKit('IUMeetup5 > Choice 1', "artifact:1462468918881813077",
			this.C1ButtonPos, this.animScale, this.buttonRot);
		

		this.choice2Text = this.createText('choice 2', this.C2TextPos, this.choice1Count.toString());
		this.BText = this.createText('Choice 2', this.BTextPos, "B");
		this.choice2Button = this.createKit('IUMeetup5 > Choice1', "artifact:1462468918881813077",
			this.C2ButtonPos, this.animScale, this.buttonRot);

		this.choice3Text = this.createText('choice 3', this.C3TextPos, this.choice1Count.toString());
		this.CText = this.createText('Choice 3', this.CTextPos, "C");
		this.choice3Button = this.createKit('IUMeetup5 > Choice1', "artifact:1462468918881813077",
			this.C3ButtonPos, this.animScale, this.buttonRot);

		this.choice4Text = this.createText('choice 4', this.C4TextPos, this.choice1Count.toString());
		this.DText = this.createText('Choice 4', this.DTextPos, "D");
		this.choice4Button = this.createKit('IUMeetup5 > Choice1', "artifact:1462468918881813077",
			this.C4ButtonPos, this.animScale, this.buttonRot);

		this.setNavButtons();
		this.setChoicesButtons();
	}

	//updates state based on user input 
	private setNavButtons() {

		//make next, previous, and Anwser icon into button 
		const nextButtonBehavior = this.next.setBehavior(MRE.ButtonBehavior);
		const previousButtonBehavior = this.previous.setBehavior(MRE.ButtonBehavior);
		const showAnwserButtonBehavior = this.showAnwser.setBehavior(MRE.ButtonBehavior);


		//if previous is pressed subtract 1 to question number, set isAnwser to false, and update animation,
		//and reset the choices count
		nextButtonBehavior.onClick(user => {
			if (this.questionNumber < 10 && user.id === this.adminID) {
				this.resetChoices();
				this.stopVotes = false; 
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
		previousButtonBehavior.onClick(user => {
			if (this.questionNumber > 0 && user.id === this.adminID) {
				this.resetChoices();
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
		showAnwserButtonBehavior.onClick(user => {
			if (user.id === this.adminID) {
				this.isAnwser = !this.isAnwser;
				this.anwserBackground.destroy();
				if (this.isAnwser) {
					this.anwserBackground = this.createKit('Next Button > Anwser On Back',
						"artifact:1460401277274948054", this.anwserBackgroundPos,
						this.buttonScale, this.buttonRot);
				}
				else {
					this.anwserBackground = this.createKit('Next Button > Anwser Off Back',
						"artifact:1460401277014901205", this.anwserBackgroundPos,
						this.buttonScale, this.buttonRot);
				}
				this.currentQuestion.destroy();
				this.updateAnim();
			}
		});
		this.setChoicesButtons();
	}

	private setChoicesButtons() {
		const choice1ButtonBehavior = this.choice1Button.setBehavior(MRE.ButtonBehavior);
		const choice2ButtonBehavior = this.choice2Button.setBehavior(MRE.ButtonBehavior);
		const choice3ButtonBehavior = this.choice3Button.setBehavior(MRE.ButtonBehavior);
		const choice4ButtonBehavior = this.choice4Button.setBehavior(MRE.ButtonBehavior);

		choice1ButtonBehavior.onClick(user => {
			if (user.id === this.adminID && !this.stopVotes) {
				this.stopVotes = true;
				this.choice1Text.destroy();
				this.choice1Text = this.createText('choice 1', this.C1TextPos, this.choice1Count.toString());
				this.choice1Text.text.color = new MRE.Color3(0, 1, 0);
			}
			if (!this.usersVoted.includes(user.id) && !this.stopVotes) {
				this.usersVoted.push(user.id);
				this.choice1Count++;
			}
		});
		choice2ButtonBehavior.onClick(user => {
			if (user.id === this.adminID && !this.stopVotes) {
				this.choice2Text.destroy();
				this.choice2Text = this.createText('choice 2', this.C2TextPos, this.choice2Count.toString());
				this.choice2Text.text.color = new MRE.Color3(0, 1, 0);
				this.stopVotes = true;
			}
			if (!this.usersVoted.includes(user.id) && !this.stopVotes) {
				this.usersVoted.push(user.id);
				this.choice2Count++;
			}
		});

		choice3ButtonBehavior.onClick(user => {
			if (user.id === this.adminID && !this.stopVotes) {
				this.choice3Text.destroy();
				this.choice3Text = this.createText('choice 3', this.C3TextPos, this.choice3Count.toString());
				this.choice3Text.text.color = new MRE.Color3(0, 1, 0);
				this.stopVotes = true;
			}
			if (!this.usersVoted.includes(user.id) && !this.stopVotes) {
				this.usersVoted.push(user.id);
				this.choice3Count++;
			}
		});

		choice4ButtonBehavior.onClick(user => {
			if (user.id === this.adminID && !this.stopVotes) {
				this.choice4Text.destroy();
				this.choice4Text = this.createText('choice 4', this.C4TextPos, this.choice4Count.toString());
				this.choice4Text.text.color = new MRE.Color3(0, 1, 0);
				this.stopVotes = true;
			}
			if (!this.usersVoted.includes(user.id) && !this.stopVotes) {
				this.usersVoted.push(user.id);
				this.choice4Count++;
			}
		});

	}

	//want to set all the counters for the choices to zero and reset the user voters list 
	private resetChoices() {
		this.choice1Count = 0;
		this.choice2Count = 0;
		this.choice3Count = 0;
		this.choice4Count = 0;

		this.choice1Text.destroy();
		this.choice2Text.destroy();
		this.choice3Text.destroy();
		this.choice4Text.destroy();

		this.choice1Text = this.createText('choice 1', this.C1TextPos, this.choice1Count.toString());
		this.choice2Text = this.createText('choice 2', this.C2TextPos, this.choice2Count.toString());
		this.choice3Text = this.createText('choice 3', this.C3TextPos, this.choice3Count.toString());
		this.choice4Text = this.createText('choice 4', this.C4TextPos, this.choice4Count.toString());

		this.usersVoted = [MRE.ZeroGuid];

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


	private updateAnim() {

		if (this.questionNumber === 1 && !this.isAnwser) {
			this.Q1 = this.createKit(this.QuestionList[0].name, this.QuestionList[0].ID,
				this.animPos, this.Q8Scale, this.Q8Rot);
			this.currentQuestion = this.Q1;
		}
		else if (this.questionNumber === 1 && this.isAnwser) {
			this.Q1A = this.createKit(this.QuestionList[1].name, this.QuestionList[1].ID,
				this.animPos, this.Q8Scale, this.Q8Rot);
			this.currentQuestion = this.Q1A;
		}
		else if (this.questionNumber === 2 && !this.isAnwser) {
			this.Q2 = this.createKit(this.QuestionList[2].name, this.QuestionList[2].ID,
				this.Q9Pos, this.Q9Scale, this.Q9Rot);
			this.currentQuestion = this.Q2;
		}
		else if (this.questionNumber === 2 && this.isAnwser) {
			this.Q2A = this.createKit(this.QuestionList[3].name, this.QuestionList[3].ID,
				this.Q9Pos, this.Q9Scale, this.Q9Rot);
			this.currentQuestion = this.Q2A;
		}
		else if (this.questionNumber === 3 && !this.isAnwser) {
			this.Q3 = this.createKit(this.QuestionList[4].name, this.QuestionList[4].ID,
				this.animPos, this.Q8Scale, this.Q8Rot);
			this.currentQuestion = this.Q3;
		}
		else if (this.questionNumber === 3 && this.isAnwser) {
			this.Q3A = this.createKit(this.QuestionList[5].name, this.QuestionList[5].ID,
				this.animPos, this.Q8Scale, this.Q8Rot);
			this.currentQuestion = this.Q3A;
		}

		if (this.questionNumber === 4 && !this.isAnwser) {
			this.Q4 = this.createKit(this.QuestionList[6].name, this.QuestionList[6].ID,
				this.contrPos, this.contrScale, this.contrRot);
			this.currentQuestion = this.Q4;
		}
		else if (this.questionNumber === 4 && this.isAnwser) {
			this.Q4A = this.createKit(this.QuestionList[7].name, this.QuestionList[7].ID,
				this.animPos, this.animScale, this.Q12Rot);
			this.currentQuestion = this.Q4A;
		}
		//if we are at question 2 and not looking for the anwser animation
		//display question 2 animation and update currentQuestion pointer
		if (this.questionNumber === 5 && !this.isAnwser) {
			this.Q5 = this.createKit(this.QuestionList[8].name, this.QuestionList[8].ID,
				this.animPos, this.animScale, this.Q12Rot);
			this.currentQuestion = this.Q5;
		}

		else if (this.questionNumber === 5 && this.isAnwser) {
			this.Q5A = this.createKit(this.QuestionList[9].name, this.QuestionList[9].ID,
				this.animPos, this.animScale, this.Q12Rot);
			this.currentQuestion = this.Q5A;
		}

		if (this.questionNumber === 6 && !this.isAnwser) {
			this.Q6 = this.createKit(this.QuestionList[10].name, this.QuestionList[10].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q6;
		}

		else if (this.questionNumber === 6 && this.isAnwser) {
			this.Q6A = this.createKit(this.QuestionList[11].name, this.QuestionList[11].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q6A;
		}


		if (this.questionNumber === 7 && !this.isAnwser) {
			this.Q7 = this.createKit(this.QuestionList[12].name, this.QuestionList[12].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q7;
		}
		else if (this.questionNumber === 7 && this.isAnwser) {
			this.Q7A = this.createKit(this.QuestionList[13].name, this.QuestionList[13].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q7A;
		}
		else if (this.questionNumber === 8 && !this.isAnwser) {
			this.Q8 = this.createKit(this.QuestionList[14].name, this.QuestionList[14].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q8;
		}
		else if (this.questionNumber === 8 && this.isAnwser) {
			this.Q8A = this.createKit(this.QuestionList[15].name, this.QuestionList[15].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q8A;
		}
		else if (this.questionNumber === 9 && !this.isAnwser) {
			this.Q9 = this.createKit(this.QuestionList[16].name, this.QuestionList[16].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q9;
		}
		else if (this.questionNumber === 9 && this.isAnwser) {
			this.Q9A = this.createKit(this.QuestionList[17].name, this.QuestionList[17].ID,
				this.animPos, this.animScale, this.animRot);
			this.currentQuestion = this.Q9A;
		}
	}
}
//array pop and find based on the question number we're on 

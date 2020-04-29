"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
/**
 * The main class of this app. All the logic goes here.
 */
//var currentQu: number = 0;
class HelloWorld {
    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
        this.next = null;
        this.previous = null;
        this.showAnwser = null;
        this.anwserBackground = null;
        this.start = null;
        this.light = null;
        this.anwserBackgroundPos = MRE.Vector3.FromArray([-1.75, 0.0, -0.2]);
        this.anwserPos = MRE.Vector3.FromArray([-1.75, 0.0, -0.1]);
        this.nextPos = MRE.Vector3.FromArray([-.4, 0.0, -0.1]);
        this.prevPos = MRE.Vector3.FromArray([0, 0.0, -0.1]);
        this.startPos = MRE.Vector3.FromArray([-.4, 0.0, -0.1]);
        this.buttonRot = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -180.0 * MRE.DegreesToRadians);
        this.buttonScale = MRE.Vector3.FromArray([0.08, 0.08, 0.08]);
        this.animPos = MRE.Vector3.FromArray([-.7, 1.0, -0.1]);
        this.animScale = MRE.Vector3.FromArray([.4, .4, .4]);
        this.animRot = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -267.0 * MRE.DegreesToRadians);
        this.Q5Name = "IUMeetup5 > Enemy Dir Static";
        this.Q5ID = "artifact:1456732643608494774";
        this.Q5AName = 'IUMeetup5 > Enemy Dir';
        this.Q5AID = "artifact:1456732643340059317";
        this.Q6Name = "IUMeetup5 > E Speed Static";
        this.Q6ID = "artifact:1456755778206564729";
        this.Q6AName = "IUMeetup5 > E Speed Anim";
        this.Q6AID = "artifact:1456755778072347000";
        this.Q7Name = "IUMeetup5 > E Speed Sol";
        this.Q7ID = "artifact:1456774319068676825";
        this.temp = null;
        this.Q1 = null;
        this.Q2 = null;
        this.Q3 = null;
        this.Q4 = null;
        this.Q5 = null;
        this.Q6 = null;
        this.Q7 = null;
        this.Q8 = null;
        this.Q1A = null;
        this.Q2A = null;
        this.Q3A = null;
        this.Q4A = null;
        this.Q5A = null;
        this.Q6A = null;
        this.Q7A = null;
        this.Q8A = null;
        this.questionNumber = 0;
        this.isAnwser = false;
        this.currentQuestion = this.next;
        this.context.onStarted(() => this.started());
    }
    /**
     * Once the context is "started", initialize the app.
     */
    started() {
        //create start icon 
        this.start = this.createKit('Next Button > Start', "artifact:1459632933429052299", this.startPos, this.buttonScale, this.buttonRot);
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
    beginQuiz() {
        //create next icon  
        this.next = this.createKit('Next Button > Next Button', "artifact:1459550776266326323", this.nextPos, this.buttonScale, this.buttonRot);
        //create previous icon 
        this.previous = this.createKit('Next Button > Prev', "artifact:1459576871355154850", this.prevPos, this.buttonScale, this.buttonRot);
        this.showAnwser = this.createKit('Next Button > Show Anwser', "artifact:1460403930600046846", this.anwserPos, this.buttonScale, this.buttonRot);
        this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
        //display first question animation by default 
        this.Q1 = this.createKit('IUMeetup5 > Vector3static', "artifact:1456639080749072774", this.animPos, this.animScale, this.animRot);
        this.currentQuestion = this.Q1;
        this.updateQuestion();
    }
    //updates state based on user input 
    updateQuestion() {
        //make next, previous, and Anwser icon into button 
        const nextButtonBehavior = this.next.setBehavior(MRE.ButtonBehavior);
        const previousButtonBehavior = this.previous.setBehavior(MRE.ButtonBehavior);
        const showAnwserButtonBehavior = this.showAnwser.setBehavior(MRE.ButtonBehavior);
        //if previous is pressed subtract 1 to question number, set isAnwser to false, and update animation. 
        nextButtonBehavior.onClick(_ => {
            if (this.questionNumber < 7) {
                this.isAnwser = false;
                this.anwserBackground.destroy();
                this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
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
                this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
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
                this.anwserBackground = this.createKit('Next Button > Anwser On Back', "artifact:1460401277274948054", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
            }
            else {
                this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
            }
            this.currentQuestion.destroy();
            this.updateAnim();
        });
    }
    //returns an MRE actor given the arguments below 
    createKit(name, artifactID, kitPos, kitScale, kitRotation) {
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
    updateAnim() {
        //if we are at question 1 and not looking for the anwser animation
        //display question 1 animation and update currentQuestion pointer
        if (this.questionNumber === 1 && !this.isAnwser) {
            this.Q1 = this.createKit('IUMeetup5 > Vector3static', "artifact:1456639080749072774", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q1;
        }
        else if (this.questionNumber === 1 && this.isAnwser) {
            this.Q1A = this.createKit('IUMeetup5 > Vector3anim', "artifact:1456639073140605316", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q1A;
        }
        //if we are at question 2 and not looking for the anwser animation
        //display question 2 animation and update currentQuestion pointer
        else if (this.questionNumber === 2 && !this.isAnwser) {
            this.Q2 = this.createKit('IUMeetup5 > Trans Static', "artifact:1461270206671224975", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q2;
        }
        else if (this.questionNumber === 2 && this.isAnwser) {
            this.Q2A = this.createKit('IUMeetup5 > Trans Amin', "artifact:1456650296703844553", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q2A;
        }
        else if (this.questionNumber === 3 && !this.isAnwser) {
            this.Q3 = this.createKit('IUMeetup5 > Prefab Static', "artifact:1456774319194505946", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q3;
        }
        else if (this.questionNumber === 3 && this.isAnwser) {
            this.Q3A = this.createKit('IUMeetup5 > Prefab Anim', "artifact:1456782914212593752", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q3A;
        }
        else if (this.questionNumber === 4 && !this.isAnwser) {
            this.Q4 = this.createKit('IUMeetup5 > Instance Static', "artifact:1456872393480864276", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q4;
        }
        else if (this.questionNumber === 4 && this.isAnwser) {
            this.Q4A = this.createKit('IUMeetup5 > Instance Anim', "artifact:1456872393740911125", this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q4A;
        }
        else if (this.questionNumber === 5 && !this.isAnwser) {
            this.Q5 = this.createKit(this.Q5Name, this.Q5ID, this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q5;
        }
        else if (this.questionNumber === 5 && this.isAnwser) {
            this.Q5A = this.createKit(this.Q5AName, this.Q5AID, this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q5A;
        }
        else if (this.questionNumber === 6 && !this.isAnwser) {
            this.Q6 = this.createKit(this.Q6Name, this.Q6ID, this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q6;
        }
        else if (this.questionNumber === 6 && this.isAnwser) {
            this.Q6A = this.createKit(this.Q6AName, this.Q6AID, this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q6A;
        }
        else if (this.questionNumber === 7 && !this.isAnwser) {
            this.Q7 = this.createKit(this.Q7Name, this.Q7ID, this.animPos, this.animScale, this.animRot);
            this.currentQuestion = this.Q7;
        }
        //questions how do read data from database file
    }
}
exports.default = HelloWorld;
//# sourceMappingURL=app.js.map
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
        //if next is pressed add 1 to question number, destroy the current animation,
        //and update it to the new animation. 
        nextButtonBehavior.onClick(_ => {
            if (this.questionNumber < 3) {
                this.isAnwser = false;
                this.anwserBackground.destroy();
                this.anwserBackground = this.createKit('Next Button > Anwser Off Back', "artifact:1460401277014901205", this.anwserBackgroundPos, this.buttonScale, this.buttonRot);
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
exports.default = HelloWorld;
//# sourceMappingURL=app.js.map
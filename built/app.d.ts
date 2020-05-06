/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
/**
 * The main class of this app. All the logic goes here.
 */
export default class VRQuiz {
    private context;
    private baseUrl;
    private next;
    private previous;
    private showAnwser;
    private anwserBackground;
    private start;
    private light;
    private anwserBackgroundPos;
    private anwserPos;
    private nextPos;
    private prevPos;
    private startPos;
    private buttonRot;
    private buttonScale;
    private animPos;
    private animScale;
    private animRot;
    private Q12Rot;
    private Q8Rot;
    private Q8Scale;
    private Q9Rot;
    private Q9Scale;
    private Q9Pos;
    private contrRot;
    private contrScale;
    private contrPos;
    private C1TextPos;
    private ATextPos;
    private C1ButtonPos;
    private C2TextPos;
    private BTextPos;
    private C2ButtonPos;
    private C3TextPos;
    private CTextPos;
    private C3ButtonPos;
    private C4TextPos;
    private DTextPos;
    private C4ButtonPos;
    private Q5Name;
    private Q5ID;
    private Q5AName;
    private Q5AID;
    private Q6Name;
    private Q6ID;
    private Q6AName;
    private Q6AID;
    private Q7Name;
    private Q7ID;
    private Q8Name;
    private Q8ID;
    private Q8AName;
    private Q8AID;
    private Q9Name;
    private Q9ID;
    private Q9AName;
    private Q9AID;
    private Q10Name;
    private Q10ID;
    private Q10AName;
    private Q10AID;
    private temp;
    private Q1;
    private Q2;
    private Q3;
    private Q4;
    private Q5;
    private Q6;
    private Q7;
    private Q8;
    private Q9;
    private Q10;
    private Q1A;
    private Q2A;
    private Q3A;
    private Q4A;
    private Q5A;
    private Q6A;
    private Q7A;
    private Q8A;
    private Q9A;
    private Q10A;
    private choice1Text;
    private AText;
    private choice1Button;
    private choice1Count;
    private choice2Text;
    private BText;
    private choice2Button;
    private choice2Count;
    private choice3Text;
    private CText;
    private choice3Button;
    private choice3Count;
    private choice4Text;
    private DText;
    private choice4Button;
    private choice4Count;
    private adminID;
    private stopVotes;
    questionNumber: number;
    isAnwser: boolean;
    currentQuestion: MRE.Actor;
    private usersVoted;
    constructor(context: MRE.Context, baseUrl: string);
    /**
     * Once the context is "started", initialize the app.
     */
    private started;
    private beginQuiz;
    private setNavButtons;
    private setChoicesButtons;
    private resetChoices;
    private createKit;
    private createText;
    private updateAnim;
}
//# sourceMappingURL=app.d.ts.map
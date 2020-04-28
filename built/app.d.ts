/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
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
    private temp;
    private Q1;
    private Q2;
    private Q3;
    private Q4;
    private Q5;
    private Q6;
    private Q7;
    private Q8;
    private Q1A;
    private Q2A;
    private Q3A;
    private Q4A;
    private Q5A;
    private Q6A;
    private Q7A;
    private Q8A;
    questionNumber: number;
    isAnwser: boolean;
    currentQuestion: MRE.Actor;
    constructor(context: MRE.Context, baseUrl: string);
    /**
     * Once the context is "started", initialize the app.
     */
    private started;
    private beginQuiz;
    private updateQuestion;
    private createKit;
    private updateAnim;
}
//# sourceMappingURL=app.d.ts.map
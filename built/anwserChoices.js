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
class VRQuiz2 {
    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
        this.choice1Pos = new MRE.Vector3(0, .0, -0);
        this.choice2 = null;
        this.choice1Cube = null;
        this.choice1Count = 0;
        this.adminID = null;
        this.questionNumber = 0;
        this.isAnwser = false;
        this.context.onStarted(() => this.started());
    }
    /**
     * Once the context is "started", initialize the app.
     */
    started() {
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
exports.VRQuiz2 = VRQuiz2;
//# sourceMappingURL=anwserChoices.js.map
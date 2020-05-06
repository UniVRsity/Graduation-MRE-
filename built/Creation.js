"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Qdatabase = require('../public/QuestionDatabase.json');
//console.log(Qdatabase);
/**
 * The main class of this app. All the logic goes here.
 */
class Creation {
    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
        console.log("aauyyy");
        this.context.onStarted(() => this.started());
    }
    /**hg
     * Once the context is "started", initialize the app.
     */
    started() {
        //const keys = Object.keys(Qdatabase);
        console.log(Qdatabase["Q5"].name);
        //for (const bodyName of keys) {
        //	console.log(bodyName);
        //	console.log( Qdatabase[bodyName]);
        //}
    }
}
exports.Creation = Creation;
Creation.Q1 = {
    name: "Controller Demonstration > 1447318670182187876 Full Demoo",
    ID: "artifact:1450169649340613008"
};
//# sourceMappingURL=Creation.js.map
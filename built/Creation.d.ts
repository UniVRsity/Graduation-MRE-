/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
/**
 * The main class of this app. All the logic goes here.
 */
export declare class Creation {
    private context;
    private baseUrl;
    private choice1Pos;
    private choice2;
    private choice1Cube;
    private choice1Count;
    private adminID;
    questionNumber: number;
    isAnwser: boolean;
    constructor(context: MRE.Context, baseUrl: string);
    /**
     * Once the context is "started", initialize the app.
     */
    private started;
}
//# sourceMappingURL=Creation.d.ts.map
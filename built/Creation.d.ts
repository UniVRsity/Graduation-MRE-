/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
interface Question {
    name: string;
    ID: string;
}
/**
 * The main class of this app. All the logic goes here.
 */
export declare class Creation {
    private context;
    private baseUrl;
    static Q1: Question;
    constructor(context: MRE.Context, baseUrl: string);
    /**hg
     * Once the context is "started", initialize the app.
     */
    private started;
}
export {};
//# sourceMappingURL=Creation.d.ts.map
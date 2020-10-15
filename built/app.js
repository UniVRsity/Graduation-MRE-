"use strict";
/*
array pop and find based on the question number we're on
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// export all info to databse file then put databse items in array
// and reference array points easy to push aand pop new qs
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
const Creation_1 = require("./Creation");
/**
 * The main class of this app. All the logic goes here.
 */
class Graduation {
    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
        this.cap = null;
        this.capPos = new MRE.Vector3(0, .12, 0.00);
        this.capScale = new MRE.Vector3(.3, .3, .3);
        this.scrollScale = new MRE.Vector3(.15, .15, .15);
        this.capRot = MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), -215.0 * MRE.DegreesToRadians);
        this.scroll = null;
        this.attachedHats = new Map();
        // use () => {} syntax here to get proper scope binding when called via setTimeout()
        // if async is required, next line becomes private startedImpl = async () => {
        this.startedImpl = async () => {
            // Show the hat menu.
            this.showHatMenu();
        };
        this.assets = new MRE.AssetContainer(context);
        // Hook the context events we're interested in.
        this.context.onStarted(() => this.started());
        this.context.onUserLeft(user => this.userLeft(user));
    }
    /**
     * Once the context is "started", initialize the app.
     */
    async started() {
        // Check whether code is running in a debuggable watched filesystem
        // environment and if so delay starting the app by 1 second to give
        // the debugger time to detect that the server has restarted and reconnect.
        // The delay value below is in milliseconds so 1000 is a one second delay.
        // You may need to increase the delay or be able to decrease it depending
        // on the speed of your PC.
        const delay = 1000;
        const argv = process.execArgv.join();
        const isDebug = argv.includes('inspect') || argv.includes('debug');
        // // version to use with non-async code
        // if (isDebug) {
        // 	setTimeout(this.startedImpl, delay);
        // } else {
        // 	this.startedImpl();
        // }
        // version to use with async code
        if (isDebug) {
            await new Promise(resolve => setTimeout(resolve, delay));
            await this.startedImpl();
        }
        else {
            await this.startedImpl();
        }
        this.scroll = Creation_1.Creation.createKit(this.context, "Graduation > Scroll", true, "1428444440862655433", this.capPos, this.scrollScale, this.capRot);
    }
    userLeft(user) {
        // If the user was wearing a hat, destroy it. Otherwise it would be
        // orphaned in the world.
        this.removeHats(user);
    }
    showHatMenu() {
        // Create a parent object for all the menu items.
        const menu = MRE.Actor.Create(this.context, {});
        let y = 0.3;
        // Create menu button
        const buttonMesh = this.assets.createBoxMesh('button', 0.3, 0.3, 0.01);
        // Create button for graduation hat 
        const button = MRE.Actor.Create(this.context, {
            actor: {
                parentId: menu.id,
                name: "Grad Cap",
                appearance: { meshId: buttonMesh.id },
                collider: { geometry: { shape: MRE.ColliderType.Auto } },
                transform: {
                    local: { position: { x: 0, y, z: 0 } }
                }
            }
        });
        // Set a click handler on the button.
        button.setBehavior(MRE.ButtonBehavior)
            .onClick(user => this.wearHat("this sucks > Cap No Colid", user.id));
        // Create a label for the menu entry.
        MRE.Actor.Create(this.context, {
            actor: {
                parentId: menu.id,
                name: 'label',
                text: {
                    contents: "Grad Cap",
                    height: 0.5,
                    anchor: MRE.TextAnchorLocation.MiddleLeft
                },
                transform: {
                    local: { position: { x: 0.5, y, z: 0 } }
                }
            }
        });
        // Create a label for the menu title.
        // MRE.Actor.Create(this.context, {
        // 	actor: {
        // 		parentId: menu.id,
        // 		name: 'label',
        // 		text: {
        // 			contents: ''.padStart(8, ' ') + "Wear Graduation Hat",
        // 			height: 0.8,
        // 			anchor: MRE.TextAnchorLocation.MiddleCenter,
        // 			color: MRE.Color3.Yellow()
        // 		},
        // 		transform: {
        // 			local: { position: { x: 0.5, y: y + 0.25, z: 0 } }
        // 		}
        // 	}
        // });
    }
    wearHat(hatId, userId) {
        // If the user is wearing a hat, destroy it.
        this.removeHats(this.context.user(userId));
        this.attachedHats.set(userId, Creation_1.Creation.createAttachedKit(this.context, "this sucks > Cap No Colid", true, "1474117174535651825", this.capPos, this.capScale, this.capRot, userId));
    }
    removeHats(user) {
        if (this.attachedHats.has(user.id)) {
            this.attachedHats.get(user.id).destroy();
        }
        this.attachedHats.delete(user.id);
    }
}
exports.default = Graduation;
//array pop and find based on the question number we're on 
//# sourceMappingURL=app.js.map
/**
 * ChatActions.js
 * @flow
 */

import AppDispatcher from "../dispatcher/AppDispatcher"
import {ChatConstants} from "../constants/ChatConstants"
import request from "superagent"
import io from "socket.io-client"


/**
 * Current Host using window location
 * this is a hack obviously, because we need a
 * separate host to serve the socket server side
 */

const currentLocation = window.location.origin
// const socket = io(`${currentLocation}/chat`)
const chat = io.connect(`${currentLocation}/chat`)

export const ChatActions = {
	get() {
		AppDispatcher.dispatch({
			actionType: ChatConstants.MESSAGE_LOAD,
			loading: true,
			message: ""
		})
		chat.on("connect", () => {
			chat.on("intro", (serverPayload) => {
				AppDispatcher.dispatch({
					actionType: ChatConstants.MESSAGE_LOAD_COMPLETE,
					loading: false,
					message: serverPayload.message
				})
			})
		})
	},

	create(payload) {
		return new Promise((resolve, reject) => {
			if (payload) {
				console.info(`i'm here with the payload ${payload}`)
				chat.emit("message:create", payload)
				AppDispatcher.dispatch({
					actionType: ChatConstants.MESSAGE_CREATE,
					message: payload
				})
				resolve(payload)
			} else {
				console.info(`because you were empty`)
				reject("You have no message")
			}
		})
		// this.get(payload)
	},

	updateThread() {
		AppDispatcher.dispatch({
			actionType: ChatConstants.THREAD_UPDATE,
			loading: true
		})
		chat.on("message:received", (serverPayload) => {
			console.info(`message received ${serverPayload.message}`)
			AppDispatcher.dispatch({
				actionType: ChatConstants.THREAD_UPDATE_SUCCESS,
				loading: false,
				message: serverPayload.message
			})
		})
	}

}

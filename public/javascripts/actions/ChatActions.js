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
	get(payload) {
		chat.on("connect", () => {
			chat.on("intro", (serverPayload) => {
				console.info(`"${serverPayload.message}" came from server`)
			})
		})
		payload = payload ? payload : null
		console.info("ChatActions GET Triggered", payload)
		AppDispatcher.dispatch({
			actionType: ChatConstants.MESSAGE_LOAD,
			message: payload,
			loading: true
		})
	},
	create(payload) {
		socket.emit("message:create", payload)
		AppDispatcher.dispatch({
			actionType: ChatConstants.MESSAGE_CREATE,
			message: payload
		})
		// this.get(payload)
	}

}

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
const socket = io(`${currentLocation}/chat`)

export const ChatActions = {
	get(payload) {
		payload = payload ? payload : null
		console.info("ChatActions GET Triggered", payload)
		AppDispatcher.dispatch({
			actionType: ChatConstants.MESSAGE_LOAD,
			message: payload,
			loading: true
		})
	},
	create(payload) {
		socket.emit("chat message", payload)
		AppDispatcher.dispatch({
			actionType: ChatConstants.MESSAGE_CREATE,
			message: payload
		})
		// this.get(payload)
	}

}

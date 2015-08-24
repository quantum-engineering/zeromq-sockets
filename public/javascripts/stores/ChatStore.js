/**
 * UserStore.js
 * @flow
 */

import AppDispatcher from "../dispatcher/AppDispatcher" // notice we don't use the braces, because it's a class import
import {ChatConstants} from "../constants/ChatConstants"
import assign from "object-assign"
import {EventEmitter} from "events"

let CHANGE_EVENT = "change"

let _messages = []

function update(data) {
	console.info("UPDATE", data)
	return _messages.push(data)
}

function create(message) {
	console.info("CREATE", message)
	var messageThread = []
	return messageThread.push(message)
}

export const ChatStore = assign({}, EventEmitter.prototype, {

	/**
	 * Get entire collection of messages
	 */

	loadMessages: function() {
		console.info("load messages")
		return _messages
		this.emitChange()
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * @param {function} callback
	 */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
})

AppDispatcher.register(function(action) {
	var messages;
	switch(action.actionType) {

		case ChatConstants.MESSAGE_LOAD:
			console.info("LOAD MESSAGE TRIGGERED", action)
			update(action.message)
			ChatStore.emitChange()
			break;

		case ChatConstants.MESSAGE_LOAD_COMPLETE:
			console.info("LOAD MESSAGE COMPLETED", action)
			update(action.message)
			ChatStore.emitChange()
		break;

		case ChatConstants.MESSAGE_CREATE:
			console.info("CREATE Message TRIGGERED", action)
			create(action.message)
			ChatStore.emitChange()
			break;


		default:
		// no op
	}
})

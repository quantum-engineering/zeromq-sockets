import React from "react"
import {ChatStore} from "./stores/ChatStore"
import {ChatActions} from "./actions/ChatActions"
import io from "socket.io-client"
const socket = io()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: ChatStore.loadMessages()
    }
  }
  componentDidMount() {
    console.info("rendered")
    ChatActions.get()
    ChatStore.addChangeListener(this._onChange.bind(this))
  }
  componentWillUnmount() {
    ChatStore.removeChangeListener(this._onChange.bind(this))
  }
  render() {
    var messages = this.state.messages ? this.state.messages : [];
    console.info(messages)
    return (
      <main>
        <section className="chat-message-container">
          <h4 style={{"display": "block"}}>Messages</h4>

          {messages.map((msg) => {
            return <p>{msg}</p>
          })}

        </section>
        <form onSubmit={this._onSubmit.bind(this)}>
          <input type="text" ref="message" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </main>
    )
  }

  _onSubmit(e) {
    e.preventDefault()
    let message = React.findDOMNode(this.refs.message).value
    ChatActions.create(message)
    // socket.emit("chat message", message)
  }

  _onChange() {
    this.setState({messages: ChatStore.loadMessages()})
  }

}

React.render(<App />, document.getElementById("main-react-wrapper"))

import React from "react"
import {ChatStore} from "./stores/ChatStore"
import {ChatActions} from "./actions/ChatActions"
import io from "socket.io-client"


/**
 * Current Host using window location
 * this is a hack obviously, because we need a
 * separate host to serve the socket server side
 */
 
// const ioHost = window.location.origin
// const chat = io.connect(`${ioHost}/chat`)

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

          <ul>
            {messages.map((msg) => {
              return <li>{msg}</li>
            })}
          </ul>

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
    ChatActions.create(message).then(() => {
      ChatActions.get()
    })
    // socket.emit("chat message", message)
  }

  _onChange() {
    this.setState({messages: ChatStore.loadMessages()})
  }

}

React.render(<App />, document.getElementById("main-react-wrapper"))

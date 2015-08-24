import React from "react"
import io from "socket.io-client"
const socket = io()

class App extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <main>
        <section className="chat-message-container">

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
    socket.emit("chat message", message)
  }
}

React.render(<App />, document.getElementById("main-react-wrapper"))

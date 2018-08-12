import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import io from 'socket.io-client'


class Controller extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      connected: false
    }
  }

  componentDidMount(){
    this.socket = io("http://" + this.props.ip);
    console.log(this.props.ip);
    this.socket.on('connect', () => {
      this.setState({connected: true})
      this.socket.on('message', message => {
        this.setState({ status: message });
        console.log('setting status to: ', message);
      });
     });

     this.socket.on('disconnect', () => {
       this.setState({connected: false})
     });
  }

  handleStatusChange = () => {
    if(this.state.connected){
      this.setState({ status: !this.state.status });
      this.socket.emit('statusChange', !this.state.status);
    }
  }

  render() {
    return (
        <p className="App-intro">
          <Button variant="raised" color="primary" onClick={this.handleStatusChange}>
            {this.state.connected ? this.state.status  ? "ON" : "OFF" : "Connecting..."}
          </Button>
        </p>
    );
  }
}

export default Controller;
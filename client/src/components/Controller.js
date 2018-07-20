import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import io from 'socket.io-client'


class Controller extends Component {
    
  constructor() {
    super();

    this.state = {
      connected: false
    }
  }

  componentDidMount(){
    this.socket = io('http://192.168.0.24:8000');
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

  handleClick = () => {
    if(this.state.connected){
      this.setState({ status: !this.state.status });
      this.socket.emit('statusChange', !this.state.status);
    }
  }

  render() {
    return (
      <div className="App">

       

        <p className="App-intro">
          <Button variant="raised" color="primary" onClick={this.handleClick}>
            {this.state.connected ? this.state.status  ? "ON" : "OFF" : "Connecting..."}
          </Button>
        </p>
        
      </div>
    );
  }
}

export default Controller;
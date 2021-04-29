import React, {Component} from 'react';
import axios from 'axios';
import './assets/css/App.css';

export default class App extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {
    return (
      <>
        { this.state.users.map(user => 
            <ul>
                <li>{user.name}</li>
                <li>{user.username}</li>
                <li>{user.img}</li>
            </ul>     
        )}
      </>
    )
  }
}

/*render () (
  <ul>
    {Object.keys(this.props.data).map((propKey) => {
      <li key={propKey}>
        {this.props.data[propKey]}

        <ul>            
          {Object.keys(this.props.data[propKey]).map((childPropKey) => {
            <li key={childPropKey}>
              {this.props.data[propKey][childPropKey]}
            </li>
          })}
        </ul>
      </li>
    })}
  </ul>
);*/


/*
class App extends Component {

    state = {
        users:[]
    }
    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            this.setState({ data   })
        })
        .catch(console.log)
    }
    render () {
        return (
            <>
                <p>Olá</p>
                <ul>
                    {this.state.users.map(user => <li>{user}</li>)}                 
                </ul>
            </>
            
        );
    }
}
*/
//export default App;
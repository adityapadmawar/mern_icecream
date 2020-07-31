import React, { Component } from 'react';
import axios from 'axios';

export default class EditIcecream extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeConewafer = this.onChangeConewafer.bind(this);
    this.onChangeBaseflavour = this.onChangeBaseflavour.bind(this);
    this.onChangeToppings = this.onChangeToppings.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      conewafer: '',
      baseflavour: '',
      toppings: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/icecreams/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          conewafer: response.data.conewafer,
          baseflavour: response.data.baseflavour,
          toppings: response.data.toppings
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeConewafer(e) {
    this.setState({
      conewafer: e.target.value
    })
  }

  onChangeBaseflavour(e) {
    this.setState({
      baseflavour: e.target.value
    })
  }

  onChangeToppings(e) {
    this.setState({
      toppings: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const icecream = {
      username: this.state.username,
      conewafer: this.state.conewafer,
      baseflavour: this.state.baseflavour,
      toppings: this.state.toppings
    }

    console.log(icecream);

    axios.post('http://localhost:5000/icecreams/update/' + this.props.match.params.id, icecream)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Icecream Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Conewafer: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.conewafer}
              onChange={this.onChangeConewafer}
              />
        </div>
        <div className="form-group">
          <label>Baseflavour : </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.baseflavour}
              onChange={this.onChangeBaseflavour}
              />
        </div>
        <div className="form-group">
          <label>Toppings : </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.toppings}
              onChange={this.onChangeToppings}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Icecream Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
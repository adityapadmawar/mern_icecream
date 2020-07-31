import React, { Component } from 'react';
import axios from 'axios';

export default class CreateIcecream extends Component {
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
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
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

        axios.post('http://localhost:5000/icecreams/add', icecream)
            .then(res => console.log(res.data));        
    
        window.location = '/';
    }    

    render() {
        return(
            <div>
                <h3>Customize New Icecream</h3>
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
                    <select
                        required
                        className="form-control"
                        value={this.state.conewafer}
                        onChange={this.onChangeConewafer}>
                            <option value="plain">plain</option>
                            <option value="chocolate">chocolate</option>
                            <option value="waffle">waffle</option>
                    </select>
                    </div>
                    <div className="form-group">


                    <label>Baseflavour: </label>
                    <select 
                        required
                        className="form-control"
                        value={this.state.baseflavour}
                        onChange={this.onChangeBaseflavour}>
                            <option value="Vanilla">Vanilla</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Mango">Mango</option>
                            <option value="Strawberry">Strawberry</option>
                            <option value="Coconut">Coconut</option>
                    </select>
                    </div>


                    <div className="form-group">
                    <label>Toppings: </label>
                    <select  
                        className="form-control"
                        value={this.state.toppings}
                        onChange={this.onChangeToppings}>
                            <option value="Tutti Fruti">Tutti Fruti</option>
                            <option value="Chocolate Chips">Chocolate Chips</option>
                            <option value="Roasted Almonds">Roasted Almonds</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Add to Cart" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
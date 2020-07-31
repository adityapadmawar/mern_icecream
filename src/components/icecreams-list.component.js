import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//implemented as a fuctional react component

const Icecream = props => (
    <tr>
      <td>{props.icecream.username}</td>
      <td>{props.icecream.conewafer}</td>
      <td>{props.icecream.baseflavour}</td>
      <td>{props.icecream.toppings}</td>
      <td>
        <Link to={"/edit/"+props.icecream._id}>edit</Link> | <a href="#" onClick={() => { props.deleteIcecream(props.icecream._id) }}>delete</a> | <Link to={"/checkout/"+props.icecream._id}>checkout</Link>
      </td>
    </tr>
  )

//implemented as a class component

export default class IcecreamsList extends Component {
    constructor(props) {
        super(props);
    
        this.deleteIcecream = this.deleteIcecream.bind(this)
    
        this.state = {icecreams: []};
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/icecreams/')
          .then(response => {
            this.setState({ icecreams: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    deleteIcecream(id) {
        axios.delete('http://localhost:5000/icecreams/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          icecreams: this.state.icecreams.filter(el => el._id !== id)
        })
    }
    
    icecreamList() {
        return this.state.icecreams.map(currenticecream => {
          return <Icecream icecream={currenticecream} deleteIcecream={this.deleteIcecream} key={currenticecream._id}/>;
        })
    }
    

    render() {
        return(
            <div>
                <h3>Cart</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Cone Wafer</th>
                    <th>Base Flavour</th>
                    <th>Toppings</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.icecreamList() }
                </tbody>
                </table>
            </div>
        )
    }
}
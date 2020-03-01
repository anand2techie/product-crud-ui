import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddProductComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            brand: '',
            price: '',
            currency: '',
            description: '',
            message: null
        }
        this.saveProduct = this.saveProduct.bind(this);
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {name: this.state.name, brand: this.state.brand, price: this.state.price, currency: this.state.currency, description: this.state.description};
        ApiService.addProduct(product)
            .then(res => {
                this.setState({message : 'Product added successfully.'});
                this.props.history.push('/products');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add product</h2>
                <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" placeholder="brand" name="brand" className="form-control" value={this.state.brand} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" placeholder="price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Currency:</label>
                    <input type="text" placeholder="currency" name="currency" className="form-control" value={this.state.currency} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                </div>
                <button className="btn btn-success" onClick={this.saveProduct}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddProductComponent;
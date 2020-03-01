import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditProductComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            brand: '',
            price: '',
            currency: '',
            description: ''
        }
        this.saveProduct = this.saveProduct.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        ApiService.fetchProductById(window.localStorage.getItem("productId"))
            .then((res) => {
                let product = res.data.data[0];
                this.setState({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                currency: product.currency,
                description: product.description,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveProduct = (e) => {
        e.preventDefault();
        let product = {id: this.state.id, name: this.state.name, brand: this.state.brand, price: this.state.price, currency: this.state.currency, description: this.state.description};
        ApiService.editProduct(product)
            .then(res => {
                this.setState({message : 'Product added successfully.'});
                this.props.history.push('/products');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Product</h2>
                <form>

                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" placeholder="name" name="name" className="form-control" readonly="true" defaultValue={this.state.name}/>
                    </div>

                    <div className="form-group">
                        <label>Brand:</label>
                        <input type="text" placeholder="brand" name="brand" className="form-control" value={this.state.brand} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" placeholder="Price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
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

export default EditProductComponent;
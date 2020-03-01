import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListProductComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            message: null
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.reloadProductList = this.reloadProductList.bind(this);
    }

    componentDidMount() {
        this.reloadProductList();
    }

    reloadProductList() {
        ApiService.fetchProducts()
            .then((res) => {
                this.setState({products: res.data.data})
            });
    }

    deleteProduct(productId) {
        ApiService.deleteProduct(productId)
           .then(res => {
               this.setState({message : 'Product deleted successfully.'});
               this.setState({products: this.state.products.filter(product => product.id !== productId)});
           })

    }

    editProduct(id) {
        window.localStorage.setItem("productId", id);
        this.props.history.push('/edit-product');
    }

    addProduct() {
        window.localStorage.removeItem("productId");
        this.props.history.push('/add-product');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Product Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addProduct()}> Add Product</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Currency</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map(
                        product =>
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td>{product.currency}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteProduct(product.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editProduct(product.id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListProductComponent;
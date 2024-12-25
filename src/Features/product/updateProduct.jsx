import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://yourserver.com/api/products/update', product);
            console.log('Product updated:', response.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={product.description} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={product.email} onChange={handleChange} />
            </div>
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProduct;
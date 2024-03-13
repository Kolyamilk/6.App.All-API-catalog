import { useState, useEffect } from "react"
import axios from 'axios'
// const URL = 'https://jsonplaceholder.typicode.com/users'
const URL = 'https://api.publicapis.org/entries'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filter, setFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(10)

    useEffect(() => {
        axios.get(URL)
            .then(response => {
                console.log(response.data.entries);
                setProducts(response.data.entries)
                setFilteredProducts(response.data.entries)
            })
            .catch(error => {
                console.log(error);
            })
    })

    useEffect(() => {
        setFilteredProducts(products.filter(product => product.API.toLowerCase().includes(filter.toLowerCase())))
    }, [filter, products])
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);




    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (indexOfLastProduct < filteredProducts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <h1>Список товаров</h1>
            <input type="text" placeholder="Фильтр по названию товара"
                value={filter} onChange={handleFilterChange}
            />
            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>URL</th>
                </tr>
                {currentProducts.map((product, key) => (
                    <tr key={key}>
                        <td>{product.API}</td>
                        <td>{product.Description}</td>
                        <td>{product.Category}</td>
                        <td>{product.Link}</td>
                    </tr>
                ))}
            </table>
            {/* <ul>
                {currentProducts.map((product, key) => (
                    <li key={key}>
                        <p>{key}: {product.API}</p>
                    </li>
                ))}
            </ul> */}

            <div className="pagination">
                <button onClick={handlePrevPage}>{'<'}</button>
                {/* <button onClick={() => paginate(currentPage - 2)}>{currentPage - 2}</button> */}
                <button onClick={() => paginate(currentPage === 1 ? null : currentPage - 1)}>{currentPage - 1}</button>
                <button className="active">{currentPage}</button>
                <button onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</button>
                <button onClick={() => paginate(currentPage + 2)}>{currentPage + 2}</button>
                {/* {Array(Math.ceil(filteredProducts.length / productsPerPage)).fill().map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))} */}
                <button onClick={handleNextPage}>{'>'}</button>
            </div>

        </div>
    )
}
export default ProductList

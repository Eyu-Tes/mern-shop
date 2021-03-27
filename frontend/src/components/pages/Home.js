import { useContext, useEffect } from 'react'
import queryString from 'query-string'
import { Col, Pagination, Row } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import Paginate from '../layout/Paginate'
import Product from '../products/Product'
import { ProductContext } from '../../context/product/ProductContext'

const Home = ({ match, location }) => {
    const keyword = match.params.keyword
    
    const { page, limit } = queryString.parse(location.search)

    const { products, pageObj, error, loading, fetchProducts } = useContext(ProductContext)

    useEffect(() => {
        fetchProducts(keyword, page, limit)
    }, [keyword, page, limit])

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader /> :
                (error ? <Message type="danger">{error}</Message> :
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    {/* Pagination */}
                    <Paginate pageObj={pageObj} keyword={keyword} />
                </>
                )
            }
        </>
    )
}

export default Home

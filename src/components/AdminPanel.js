
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice.js";
import { toggleFavorite } from "../redux/slices/favoriteSlice.js";
import { setPage } from "../redux/slices/paginationSlice.js";
import {
  InputGroup,
  FormControl,
  Card,
  ListGroup,
  Badge,
  Spinner,
  Container,
  Row,
  Col,
  Pagination,
  Button,
} from "react-bootstrap";
export default function AdminPanel() {
  const [products,setProducts]=useState([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
   useEffect(()=>{
    (async()=>{
      const response = await axios.get("http://localhost:5000/api/v1/react/products");
      setProducts(response.data)
    })()
},[])


const handleUpdate = (product) => {
  setSelectedProduct(product);
  setShowUpdateModal(true);
};

const handleDelete=(id)=>{

}
/*const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <BsStarFill key={index} style={{ color: "#FFC107" }} />
      ))}
      {halfStar && <BsStarHalf style={{ color: "#FFC107" }} />}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <BsStar key={index} style={{ color: "#FFC107" }} />
      ))}
    </>
  );
};*/
  return(<>
    <Col md={9}>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={6} lg={4} className="mb-4">
                <Card >
                  <Card.Img
                    variant="top"
                    src={product.photo}
                    alt={product.productName}
                    style={{ cursor: "pointer",width:"100%",height:"200px",objectFit:"contain"}}
                 
                  />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <ListGroup variant="flush" className="mb-2">
                      <ListGroup.Item>
                        Price:{" "}
                        <Badge bg="success" className="ms-2">
                          {product.price}$
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Rating: {product.ratingsAvg}
                        {/* {renderStars(product.ratingsAvg)} */}
                      </ListGroup.Item>
                   
                    </ListGroup>
                   <Button onClick={()=>handleUpdate(product.id)}>update</Button><Button  onClick={() => handleDelete(product.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            </Row>
            </Col>
  </>)
}
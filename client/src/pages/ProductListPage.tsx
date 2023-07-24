import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader.";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { ProductCreateActionTypes } from "../types/";
import { ReduxState } from "../types/ReduxState";

const ProductListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const params = useParams();
  const keyword = params.keyword as string;
  const pageNumber = (params.pageNumber as string) || "1";

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state: ReduxState) => state.productCreate);
  const {
    product,
    error: errorCreate,
    success: successCreate,
    loading: loadingCreate,
  } = productCreate;

  const productList = useSelector((state: ReduxState) => state.productList);
  const { products, error, loading, page, pages } = productList;

  const productDelete = useSelector((state: ReduxState) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_RESET });
    if (!userInfo?.isAdmin) {
      navigate("../login");
    }
    if (successCreate) {
      navigate(`../admin/product/${product?._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    navigate,
    userInfo,
    dispatch,
    successDelete,
    product,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            variant="dark"
            striped
            bordered
            hover
            responsive
            className="table-sm"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`../admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fa fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListPage;

import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader.";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { UserUpdateProfileActionTypes } from "../types/";
import { ReduxState } from "../types/ReduxState";

const ProfilePage = () => {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>('');
  
    const dispatch = useDispatch<any>();

    const { user, loading, error } = useSelector(
        (state: ReduxState) => state.userDetails
      );
    
      const { userInfo } = useSelector((state: ReduxState) => state.userLogin);
    
      const { success } = useSelector(
        (state: ReduxState) => state.userUpdateProfile
      );
    
      const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
        (state: ReduxState) => state.orderListMy
      );
    
      
      const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          setMessage("Passwords must match");
        } else {
          if (user) {
            dispatch(
              updateUserProfile({
                _id: user._id,
                name,
                email,
                password,
                isAdmin: user.isAdmin,
              })
            );
          }
        }
      };
    
      useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
          if (!user?.name || success) {
            dispatch({
              type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET,
            });
            dispatch(getUserDetails("profile"));
            dispatch(listMyOrders());
          } else {
            setName(user.name);
            setEmail(user.email);
          }
        }
      }, [dispatch, navigate, userInfo, user, success]);
    
      return (
        <>
          <Meta title="My Profile" />
          <Row>
            <Col md={3}>
              <h2>User Profile</h2>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            </Col>
            <Col md={9}>
              <h2>My Orders</h2>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </>
      );
    };
    
    export default ProfilePage;
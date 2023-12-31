import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader.";
import Message from "../components/Message";
import { ReduxState } from "../types/";

const OrderListPage = () => {
    const navigate = useNavigate();
  
    const dispatch = useDispatch<any>();
  
    const orderList = useSelector((state: ReduxState) => state.orderList);
    const { error: errorOrders, orders, loading: loadingOrders } = orderList;
  
    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;
  
    useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
        dispatch(listOrders());
      } else {
        navigate(`/login`);
      }
    }, [dispatch, userInfo, navigate]);
  
    return (
      <>
        <h1>Users</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table
            variant='dark'
            striped
            bordered
            hover
            responsive
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <p>{order.paidAt ? order.paidAt.substring(0, 10) : ''}</p>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <p>{order.deliveredAt?.substring(0, 10)}</p>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
  
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
  };

  export default OrderListPage
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
            setOrders(response.data.data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('Failed to load orders. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return '#4CAF50' // Green
            case 'out for delivery':
                return '#2196F3' // Blue
            case 'food processing':
                return '#FF9800' // Orange
            default:
                return '#9E9E9E' // Grey
        }
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    if (loading) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="loading">Loading your orders...</div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="no-orders">
                    <img src={assets.empty_cart} alt="No orders" />
                    <p>You haven't placed any orders yet.</p>
                    <button onClick={() => window.location.href = '/'}>Start Ordering</button>
                </div>
            </div>
        )
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div className="order-id">Order #{order._id.slice(-6).toUpperCase()}</div>
                            <div className="order-date">{formatDate(order.createdAt)}</div>
                            <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                                {order.status}
                            </div>
                        </div>
                        
                        <div className="order-summary">
                            <div className="order-items">
                                {order.items.slice(0, 3).map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="item-price">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                                {order.items.length > 3 && (
                                    <div className="more-items">+{order.items.length - 3} more items</div>
                                )}
                            </div>
                            <div className="order-total">
                                <span>Total Amount:</span>
                                <span>₹{order.amount}</span>
                            </div>
                        </div>

                        <div className="order-footer">
                            <div className="delivery-address">
                                <strong>Delivery to:</strong>
                                <p>{order.address.street}, {order.address.city}</p>
                                <p>{order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                                <p>Phone: {order.address.phone}</p>
                            </div>
                            <button 
                                className="track-order-btn"
                                onClick={() => setSelectedOrder(order)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="order-details-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Order Details</h3>
                            <button onClick={() => setSelectedOrder(null)}>&times;</button>
                        </div>
                        <div className="order-details">
                            <div className="order-info">
                                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span style={{ color: getStatusColor(selectedOrder.status) }}>
                                        {selectedOrder.status}
                                    </span>
                                </p>
                            </div>
                            
                            <div className="order-items-details">
                                <h4>Order Items</h4>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="order-item-detail">
                                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        <div className="item-info">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-quantity">Quantity: {item.quantity}</div>
                                            <div className="item-price">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="order-address">
                                <h4>Delivery Address</h4>
                                <p>{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                <p>{selectedOrder.address.street}</p>
                                <p>{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                                <p>{selectedOrder.address.country} - {selectedOrder.address.zipcode}</p>
                                <p>Phone: {selectedOrder.address.phone}</p>
                                {selectedOrder.address.email && <p>Email: {selectedOrder.address.email}</p>}
                            </div>
                            
                            <div className="order-summary-details">
                                <div className="summary-row">
                                    <span>Subtotal ({selectedOrder.items.length} items):</span>
                                    <span>₹{selectedOrder.amount - 2}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Delivery Fee:</span>
                                    <span>₹2.00</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total Amount:</span>
                                    <span>₹{selectedOrder.amount}</span>
                                </div>
                            </div>
                            
                            <div className="order-timeline">
                                <h4>Order Status</h4>
                                <div className="timeline">
                                    <div className={`timeline-step ${selectedOrder.status === 'Food Processing' || selectedOrder.status === 'Out for delivery' || selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                                        <div className="step-number">1</div>
                                        <div className="step-label">Order Placed</div>
                                    </div>
                                    <div className={`timeline-connector ${selectedOrder.status === 'Out for delivery' || selectedOrder.status === 'Delivered' ? 'completed' : ''}`}></div>
                                    <div className={`timeline-step ${selectedOrder.status === 'Out for delivery' || selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                                        <div className="step-number">2</div>
                                        <div className="step-label">Processing</div>
                                    </div>
                                    <div className={`timeline-connector ${selectedOrder.status === 'Delivered' ? 'completed' : ''}`}></div>
                                    <div className={`timeline-step ${selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                                        <div className="step-number">3</div>
                                        <div className="step-label">Delivered</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="close-btn"
                                onClick={() => setSelectedOrder(null)}
                            >
                                Close
                            </button>
                            {selectedOrder.status !== 'Delivered' && (
                                <button 
                                    className="contact-support-btn"
                                    onClick={() => window.location.href = '/contact'}
                                >
                                    Need Help?
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyOrders

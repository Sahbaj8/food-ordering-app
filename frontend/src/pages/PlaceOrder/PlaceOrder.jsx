import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        
        // Basic form validation
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'phone'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            toast.error('Please fill in all required fields', { position: 'top-center' });
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Prepare order items
            let orderItems = [];
            food_list.forEach((item) => {
                if (cartItems[item._id] > 0) {
                    orderItems.push({
                        ...item,
                        quantity: cartItems[item._id]
                    });
                }
            });

            // In a real app, you would send this to your backend
            // await axios.post(`${url}/api/order/place`, {
            //     address: data,
            //     items: orderItems,
            //     amount: getTotalCartAmount() + 2,
            // }, { headers: { token } });

            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newOrderId = 'FF-' + Math.floor(Math.random() * 1000000);
            setOrderId(newOrderId);
            setOrderPlaced(true);
            
            // Clear the cart (you'll need to implement this in your context)
            // clearCart();
            
            toast.success('🎉 Order placed successfully!', { position: 'top-center' });
            
        } catch (error) {
            console.error('Order error:', error);
            toast.error('Failed to place order. Please try again.', { position: 'top-center' });
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, navigate, getTotalCartAmount]);

    if (orderPlaced) {
        return (
            <div className="order-success-container">
                <div className="order-success">
                    <div className="success-animation">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h2>Order Confirmed! 🎉</h2>
                    <p className="order-id">Order #: <span>{orderId}</span></p>
                    <div className="order-details">
                        <p>We're preparing your order now.</p>
                        <p>You'll receive a confirmation email shortly.</p>
                        <p className="delivery-time">Estimated delivery: <span>30-45 minutes</span></p>
                    </div>
                    <button 
                        onClick={() => navigate('/')} 
                        className="continue-shopping-btn"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="place-order-container">
            <h1 className="page-title">Complete Your Order</h1>
            <form onSubmit={placeOrder} className="place-order">
                <div className="place-order-left">
                    <h2 className="section-title">Delivery Information</h2>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="form-field">
                                <label>First Name *</label>
                                <input 
                                    name='firstName' 
                                    onChange={onChangeHandler} 
                                    value={data.firstName} 
                                    type="text" 
                                    required 
                                />
                            </div>
                            <div className="form-field">
                                <label>Last Name *</label>
                                <input 
                                    name='lastName' 
                                    onChange={onChangeHandler} 
                                    value={data.lastName} 
                                    type="text" 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="form-field">
                            <label>Email *</label>
                            <input 
                                name='email' 
                                onChange={onChangeHandler} 
                                value={data.email} 
                                type="email" 
                                required 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label>Street Address *</label>
                            <input 
                                name='street' 
                                onChange={onChangeHandler} 
                                value={data.street} 
                                type="text" 
                                required 
                                placeholder='123 Main St' 
                            />
                        </div>
                        
                        <div className="form-row">
                            <div className="form-field">
                                <label>City *</label>
                                <input 
                                    name='city' 
                                    onChange={onChangeHandler} 
                                    value={data.city} 
                                    type="text" 
                                    required 
                                    placeholder='New York' 
                                />
                            </div>
                            <div className="form-field">
                                <label>State *</label>
                                <input 
                                    name='state' 
                                    onChange={onChangeHandler} 
                                    value={data.state} 
                                    type="text" 
                                    required 
                                    placeholder='NY' 
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-field">
                                <label>ZIP Code *</label>
                                <input 
                                    name='zipcode' 
                                    onChange={onChangeHandler} 
                                    value={data.zipcode} 
                                    type="text" 
                                    required 
                                    placeholder='10001' 
                                />
                            </div>
                            <div className="form-field">
                                <label>Country</label>
                                <input 
                                    name='country' 
                                    onChange={onChangeHandler} 
                                    value={data.country} 
                                    type="text" 
                                    placeholder='United States' 
                                />
                            </div>
                        </div>
                        
                        <div className="form-field">
                            <label>Phone Number *</label>
                            <input 
                                name='phone' 
                                onChange={onChangeHandler} 
                                value={data.phone} 
                                type="tel" 
                                required 
                                placeholder='+1 (555) 123-4567' 
                            />
                        </div>
                    </div>
                </div>
                
                <div className="place-order-right">
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{getTotalCartAmount().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span>₹{getTotalCartAmount() === 0 ? '0.00' : '2.00'}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>₹{(getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)).toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <div className="payment-method">
                            <h4>Payment Method</h4>
                            <div className="payment-option">
                                <input type="radio" id="cod" name="payment" defaultChecked />
                                <label htmlFor="cod">Cash on Delivery</label>
                            </div>
                        </div>
                        
                        <button type="submit" className="place-order-btn" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                        
                        <p className="secure-checkout">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1L3 5V11C3 16.55 6.16 21.74 12 23C17.84 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                            </svg>
                            Secure Checkout
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;
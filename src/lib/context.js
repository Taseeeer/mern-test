import { createContext, useEffect, useState } from "react"

export const AppContext = createContext();
export const StateContext = ({ children }) => {

    const [ total, setTotal ] = useState(useLocalStorage('total', 0));
    const [ cartItems, setCartItems ] = useState(useLocalStorage('cartItems', []));
    
    function useLocalStorage(key, fallbackValue) {
        let value;
        try {
            value = JSON.parse(localStorage.getItem(key) ||fallbackValue);
        } catch(e) {
            value = [];
        }
        return value;
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('total', total);
    }, [cartItems, total]);

    //functions
    const addToCart = (index, item) => {
        console.log(index)
        setCartItems(prevState => [...prevState, item]);
        setTotal(prevState => prevState + parseInt(item.price));
    }

    const removeFromCart = ({ id, price }) => {
        const cart = cartItems.filter(item => item.id !== id);
        setCartItems(cart);
        setTotal(prevTotal => prevTotal - parseInt(price));
    }

    const removeItem = (id) => {
        const reqOpt = {
            method: "DELETE"
        }
        fetch(`http://localhost:3000/items/${id}`, reqOpt);
    }

    return <AppContext.Provider value={{ total, cartItems, addToCart, removeFromCart, removeItem }}>{ children }</AppContext.Provider>
}
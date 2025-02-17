import { useMemo, useState } from "react"
import { MenuItem, OrderItem } from "../types"

export const useOrder = () => {
    
    const MIN_ITEMS = 1;

    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tipPercentage, setTipPercentage] = useState(0);

    const subtotalOrder = useMemo(() => order.reduce((total, order) => total + order.quantity * order.price, 0), [order])

    const totalTip = useMemo(() => subtotalOrder * (tipPercentage / 100), [subtotalOrder, tipPercentage]);

    const addItem = (menu: MenuItem) => {
        const indexItem = order.findIndex(order => order.id === menu.id);
        if(indexItem === -1) {
            const newItem: OrderItem = {...menu, quantity: 1}
            setOrder([...order, newItem]);
        }else{
            const updateOrder = [...order];
            updateOrder[indexItem].quantity ++;
            setOrder(updateOrder);
        }        
    }

    const incrementQuantity = (id: OrderItem['id']) => {
        const updateOrder = order.map(item => {
            if(item.id === id){
                return {...item, quantity: item.quantity + 1}
            }

            return item
        })
        setOrder(updateOrder);
    }

    const decrementQuantity = (id: OrderItem['id']) => {
        const updateOrder = order.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {...item, quantity: item.quantity - 1}
            }

            return item
        })
        setOrder(updateOrder);
    }

    const removeItem = (id: OrderItem['id']) => {
        const updateOrder = order.filter(item => item.id !== id);
        setOrder(updateOrder);
    }

    const clearOrder = () => {
        setOrder([]);
    }

    return {
        addItem,
        order,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        subtotalOrder,
        totalTip,
        setTipPercentage,
        clearOrder
    }
}
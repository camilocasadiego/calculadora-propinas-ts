import { OrderItem } from "../types";

type OrderProps = {
    order: OrderItem
    incrementQuantity(id: OrderItem['id']): void
    decrementQuantity(id: OrderItem['id']): void
    removeItem(id: OrderItem['id']): void
}

export default function OrderCard({order, incrementQuantity, decrementQuantity, removeItem} : OrderProps) {

    const {id, name, price, quantity} = order;

    return (
        <div className="flex justify-between items-center border-b border-gray-200 py-3">
            <div className="">
                <p>{name} - ${price}</p>
                <p className="font-black">Cantidad: {quantity} - ${price * quantity}</p>
            </div>
            
            <div className="flex space-x-3 mr-3">
                <div>
                    <button onClick={() => decrementQuantity(id)}>-</button>
                </div>
                <div>
                    <p>{quantity}</p>
                </div>
                <div>
                    <button onClick={() => incrementQuantity(id)}>+</button>
                </div>
                <div>
                    <button 
                        className="bg-red-600 rounded-full w-8 h-8 text-white text-sm"
                        onClick={() => removeItem(id)}
                        >X
                    </button>
                </div>
            </div>
        </div>
    )
}

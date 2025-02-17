import { useState } from 'react'
import { Header } from './components/Header'
import { menuItems } from './data/db'
import { MenuCard } from './components/MenuCard';
import { useOrder } from './hooks/useOrder';
import OrderCard from './components/OrderCard';

function App() {

  const [menu] = useState(menuItems);

  const {
    order, 
    addItem,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    subtotalOrder,
    totalTip,
    setTipPercentage,
    clearOrder
  } = useOrder();
  
  const tip = {
    '0': 0,
    '10': 10,
    '20': 20,
    '50': 50,
  }

  // TODO: definir las propinas (tip) y mostrarlos con un map
  return (
    <>
    <Header/>
      <div className='grid md:grid-cols-2 max-w-7xl mx-auto md:space-x-10 p-6'>
        {/* Menú */}
        <div>
          <h2 className='font-bold text-3xl my-6'>Menú</h2>
          {menu.map(menuItem => 
            <MenuCard
              key={menuItem.id}
              menuItem={menuItem}
              addItem={addItem}
            />
          )}
        </div>

        {/* Consumo */}
        <div className='border border-gray-400 p-5 border-dotted'>
          <h2 className='text-3xl font-bold border-b border-gray-200 pb-5'>Consumo</h2>
          {order.length === 0 ? (
            <h2 className='text-center my-3'>La orden está vacía</h2>
          ) : (
            <>
                {order.map(order => (
                  <OrderCard
                  key={order.id}
                  order={order}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  removeItem={removeItem}
                  />
                ))}

              <div className='mt-5'>
                <h2 className='text-xl font-bold'>Propina:</h2>
                <form>
                {Object.entries(tip).map(([key, value]) => (
                  <label className='flex space-x-2' onClick={() => setTipPercentage(value)}>
                      <input type='radio' name="propina" value={value} />
                      <span>{key}%</span>
                  </label>
                ))}
                </form>
              </div>

              <div className='space-y-2 mt-5'>
                <h2 className='text-xl font-bold'>Totales y Propina:</h2>
                <p>Subtotal a pagar: <span className='font-bold'>${subtotalOrder}</span></p>
                <p>Propina: <span className='font-bold'>${totalTip}</span></p>
                <p>Total a pagar: <span className='font-bold'>${subtotalOrder + totalTip}</span></p>
              </div>

              <div 
                className='flex justify-center bg-black font-bold cursor-pointer text-white uppercase p-3 mt-5'
                onClick={clearOrder}
              >
                Guardar Orden
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App

import { MenuItem } from '../types/index';

type MenuProps = {
  menuItem: MenuItem
  addItem: (menu: MenuItem) => void
}

export const MenuCard = ({menuItem, addItem} : MenuProps) => {
  
  const {name, price} = menuItem;

  return (
    <div 
      className='border border-teal-400 flex justify-between p-2 mb-3 cursor-pointer hover:bg-teal-200 rounded-lg'
      onClick={() => addItem(menuItem)}
    >
      <p>{name}</p>
      <p className='font-black'>${price}</p>
    </div>
  )
}

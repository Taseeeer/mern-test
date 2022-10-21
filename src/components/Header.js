import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../lib/context'

export default function Header() {
  const { cartItems } = useContext(AppContext);

  return (
    <header className='bg-blue-500 p-4 text-white'>
        <ul className='flex justify-around text-xl'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/items">List All</Link>
            </li>
            <li>
              <Link to="/additem">Add Item</Link>
            </li>
            <li className='relative'>
              <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full p-4 bg-red-500 absolute left-[35px] bottom-[10px] text-center text-[20px]'>{ cartItems.length }</div>
              <Link to="/cart">Cart</Link>
            </li>
        </ul>
    </header>
  )
}

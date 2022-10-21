import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import { AppContext } from '../lib/context'

export default function Cart() {

  const { total, cartItems, removeFromCart } = useContext(AppContext);
  console.log(cartItems)

  return (
      <Layout>
        <div className='p-4'>
          <p className='text-2xl'>Your current cart :</p>
          <div>
              { cartItems.map(item => (
                  <dl key={item.id} className='py-2 flex gap-8 border-b'>
                      <dt className='w-[12rem]'>{ item.name }</dt>
                      <dd className='w-[5rem]'>${ item.price }</dd>
                      <button onClick={() => removeFromCart(item)}>❌</button>
                  </dl>
              ))}
          </div>

          <p className='text-2xl pt-6'>Total : { total } </p>
        </div>
      </Layout>
  )
}

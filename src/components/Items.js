import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout'
import { AppContext } from '../lib/context';

export default function Items() {

    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ sortItems, setSortItems ] = useState(false);

    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ updateItemState, setUpdateItemState ] = useState({
      id:0,
      name: "",
      price: 0
    });

    const { addToCart } = useContext(AppContext);

  useEffect(() => {

    let isCurrent = true;
    async function getAll() {
      const res = await fetch('http://localhost:3000/items');
      const itemsData = await res.json();
      if(isCurrent) setData(itemsData);
    }
    getAll();

    return () => {
        isCurrent = false;
    }

  }, []); 

  const removeItem = (id) => { 
    fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
    const items = data.filter(item => item.id !== id);
    setData(items);
  }

  const handleItemUpdate = (id) => {
    setIsUpdate(!isUpdate);
    updateItemState.id = id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateItemState)
    };

    const res = fetch(`http://localhost:3000/items/${updateItemState.id}`, requestOptions);
  }

    const handleSortItems = () => {
      const sortedData = data.sort((a,b) => a.price - b.price);
      setSortItems(sortedData);
    }

  const renderAllItems = (search) => {

    return  (
        <dl className='flex flex-wrap gap-4 p-4'>
            { (sortItems ? sortItems : data).filter(items => {
              if(search === '') {
                return items;
              } else if(items.name.toLowerCase().includes(search.toLowerCase())) {
                return items;
              }
            }).map((item, index) => (
                <div key={item.id} className='flex w-[15rem] flex-col gap-2 shadow-inner p-4'>
                    <div className='bg-blue-400 p-4 rounded-md'>
                        <dt>{ item.name }</dt>  
                        <dd>Price: ${ item.price }</dd>
                    </div>
                    <button className='bg-blue-300 p-2 rounded-md' onClick={() => addToCart(index, item)}>Add to cart</button>
                    <button className='bg-red-300 p-2 rounded-md' onClick={() => removeItem(item.id)}>Remove Item</button>
                    <button className='bg-orange-300 p-2 rounded-md' onClick={() => handleItemUpdate(item.id)}>Update Item</button>
                </div>
            )) }
        </dl>

    )
  }; 

  return (
      <Layout>
        <div className='flex justify-center'>
          <input placeholder='Search for item' value={search} onChange={e => setSearch(e.target.value)} className='bg-gray-100 border rounded-md p-2 w-[20rem] my-4' />
        </div>

        <div className='flex justify-center'>
          <button className='p-2 bg-blue-300 rounded-md' onClick={handleSortItems}>Sort by price</button>
        </div>

        {renderAllItems(search)}
        {
          isUpdate
          &&
          (
          <form className='flex justify-center flex-col items-center gap-2 pb-10'>
            <p>Upate Item</p>
            <input name="name" type="text" value={updateItemState.name} onChange={e => setUpdateItemState({ ...updateItemState, name: e.target.value})} placeholder='Name' className='bg-gray-100 p-2 rounded-md ' />
            <input name="name" type="number" value={updateItemState.price} onChange={e => setUpdateItemState({ ...updateItemState, price: e.target.value})} placeholder='Name' className='bg-gray-100 p-2 rounded-md ' />
            <button className='bg-blue-300 p-2 rounded-md' onClick={handleSubmit}>Update Item</button>
          </form>
          )
        }
      </Layout>
  )
}

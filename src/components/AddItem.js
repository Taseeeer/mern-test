import Layout from '../Layout/Layout'
import useForm from '../lib/useForm'

export default function AddItem() {
    const intialState = {
        name: "",
        price: 0
    }
    const { inputs, handleChange, resetForm } = useForm(intialState);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs) 
        };

        fetch('http://localhost:3000/items', requestOptions);

        resetForm();
    }

  return (
      <Layout>
          <form className='flex flex-col p-4 items-center gap-2'>
              <label htmlFor='name' className='pr-[10.4rem]'>Name</label>
              <input name='name' type="text" value={inputs.name} onChange={handleChange} required placeholder='Item name' className='p-4 bg-gray-100' />

              <label htmlFor='price' className='pr-[10.4rem]'>Price</label>
              <input name='price' type="number" value={inputs.price} onChange={handleChange} required placeholder='Item name' className='p-4 bg-gray-100' />
              <button type='submit' className='bg-blue-300 p-2 rounded-md' onClick={handleSubmit}>Add Item</button>
          </form>
      </Layout>
  )
}

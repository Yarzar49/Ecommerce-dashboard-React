import Header from './Header';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const formRef = useRef(null); // Ref for the form element

    const navigate = useNavigate();

 

    const addProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('name', name);

        // let result = await fetch("http://127.0.0.1:8000/api/addProduct", {
        //     method: 'POST',            
        //     body: formData
        // });
        try {
            const result = await fetch("http://127.0.0.1:8000/api/addProduct", {
                method: 'POST',            
                body: formData
            });
    
            if (result.ok) {
              navigate('/');
    
            } else {
                alert("Failed to add data");
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
        alert("Data has been added successfully")
        setName('');
        setFile(null);
        setDescription('');
        setPrice('');
        formRef.current.reset();

    }
  return (
    <div>
        <Header />
        <h1>Add Product</h1>
        <form ref={formRef} className='col-sm-6 offset-sm-3' onSubmit={ addProduct }>
            <input type="text" className="form-control mt-2" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required/>
            <input type="file"  onChange={ e => setFile(e.target.files[0])} className="form-control  mt-2" placeholder="File" required />
            <input type="text" value={price} onChange={ e => setPrice(e.target.value)} className="form-control  mt-2" placeholder="Price" required />
            <input type="text" value={description} onChange={ e => setDescription(e.target.value)} className="form-control mt-2" placeholder="Description" required />
            <button type='submit' className="btn btn-primary  mt-3">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct;
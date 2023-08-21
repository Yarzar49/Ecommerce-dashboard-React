import React from 'react'
import { Button} from 'react-bootstrap'
import Header from './compoents/Header'
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './compoents/Login';
import Register from './compoents/Register';
import AddProduct from './compoents/AddProduct';
import UpdateProduct from './compoents/UpdateProduct';
import Protected from './compoents/Protected';
import ProductList from './compoents/ProductList';
import SearchProducts from './compoents/SearchProducts';


const App = () => {
  return (
    <>      
      {/* <Header /> */}
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/' element={ <Protected component={ProductList} /> } />
        <Route path='/add' element={ <Protected component={AddProduct} /> } />
        <Route path='/update/:id' element={ <Protected component={UpdateProduct}/> } />
        <Route path='/search' element={ <Protected component={SearchProducts}/> } />
      </Routes>
    </>
    
  )
}

export default App
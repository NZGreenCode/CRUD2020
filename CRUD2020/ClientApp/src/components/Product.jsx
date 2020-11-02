import React,{useState,Component } from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import { Button, Modal } from 'semantic-ui-react'
import AddProModal from './Pro/AddProModal'
import EditProModal from './Pro/EditProModal'
import DeleteProModal from './Pro/EditProForm'


export class Product extends Component {
  constructor(props) {

  
   super(props);
   this.state = { 

    loading:true,
    products:[],
    }
  }


  componentDidMount(){
    this.getAllProducts();
   }
      

    getAllProducts=()=>{
  
      // Make a request for a user with a given ID
      axios.get(`https://localhost:44376/Products/GetProduct`)
      .then((res)=> {
        this.setState({products:res.data})
      })
      .catch((err)=> {
        console.log(err);
      });
      
    }

    render () {
      const {products}=this.state;

  return (
  
<div>
    <AddProModal/>
    <br/>
    <br/>
    <table className="table">
      <thead>
        <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
        <th>Action</th>

        </tr>
      </thead>
      <tbody>
          {products.map((pro)=>{
            return(
                <tr key={pro.id}>
                  <th >{pro.name}</th>
                  <th>{pro.price}</th>
                  <th>
                      <EditProModal product={pro}/>
                  </th>
                  <th>
                      <DeleteProModal proid={pro.id} />
                  </th>
                </tr>
                )
              })
              }
          </tbody>
      
    </table>
      
</div>
    )
  }
}

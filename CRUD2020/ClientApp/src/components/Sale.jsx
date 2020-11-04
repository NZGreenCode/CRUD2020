import React,{useState,Component } from 'react'
import axios from "axios"
import ReactDOM from 'react-dom'
import { Button, Modal } from 'semantic-ui-react'
import AddSale from './Sal/AddSale'
import EditSale from './Sal/EditSale'
import DeleteSale from './Sal/DeleteSale'


export class Sale extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 

     loading: true,
     sales:[],
    };
  }


 componentDidMount(){
  this.getAllSales();
 }
    

  getAllSales=()=>{

    // Make a request for a user with a given ID
        axios.get(`https://localhost:44376/Sales/GetSales`)
        .then( (res)=> {
          console.log(res.data);
          this.setState({sales:res.data})
        })
        .catch((err)=> {
          console.log(err);
        });
    
  }

  render () {
    const {sales}=this.state;

  return (
  
<div>
    <AddSale  Sales={this.getAllSales}/>
   
    <br/>
    <br/>
    <table class='table'>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Store</th>
          <th>Date Sold</th>

          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {sales.map((sal)=>{
          return(
              <tr key={sal.id} >
                <th >{sal.Customer.Name}</th>
                <th>{sal.Product.Name}</th>
                <th>{sal.Store.Name}</th>
                <th>{sal.DateSold}</th>
                <th>
                  <EditSale sale={sal} sales={this.getAllSales}/>
                </th>
                <th>
                  <DeleteSale salid={sal.id} sales={this.getAllSales}/>
                </th>

              </tr>
          )
        })
        }
    </tbody>

    </table>

</div>
  );

  }
}

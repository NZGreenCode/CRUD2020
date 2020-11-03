import React,{useState,Component } from 'react'
import axios from "axios"
import ReactDOM from 'react-dom'
import { Button, Modal } from 'semantic-ui-react'
import AddCustomer from './Cus/AddCustomer'
import EditCustomer from './Cus/EditCustomer'
import DeleteCustomer from './Cus/DeleteCustomer'


export class Customer extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 

     loading: true,
     customers:[],
     customer:[]
    };
  }


 componentDidMount(){
  this.getAllCustomers();
 }
    

  getAllCustomers=()=>{

    // Make a request for a user with a given ID
        axios.get(`Customers/GetCustomer`)
        .then( (res)=> {
          console.log(res.data);
          this.setState({customers:res.data})
        })
        .catch((err)=> {
          console.log(err);
        });
    
  }

  render () {
    const {customers}=this.state;

  return (
  
<div>
    <AddCustomer/>
   
    <br/>
    <br/>
    <table span class='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {customers.map((cust)=>{
          return(
              <tr key={cust.id} >
                <th >{cust.name}</th>
                <th>{cust.address}</th>
                <th>
                  <EditCustomer customer={cust}/>
                </th>
                <th>
                  <DeleteCustomer cusid={cust.id} />
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

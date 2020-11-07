import React,{useState,Component } from 'react'
import axios from "axios"
import ReactDOM from 'react-dom'
import { Button, Modal } from 'semantic-ui-react'
import AddStore from './Sto/AddStore'
import EditStore from './Sto/EditStore'
import DeleteStore from './Sto/DeleteStore'
import  Pagination  from './Pagination'


export class Store extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 
    // addModalShow: false,
    // editModalShow:false,
    // deleteModalShow:false,

     loading: true,
     stores:[],
    };
  }


 componentDidMount(){
  this.getAllStores();
 }
    

  getAllStores=()=>{

    // Make a request for a user with a given ID
        axios.get(`Stores/GetStore`)
        .then( (res)=> {
          console.log(res.data);
          this.setState({stores:res.data})
        })
        .catch((err)=> {
          console.log(err);
        });
    
  }

  render () {
    const {stores}=this.state;

  return (
  
<div>
    <AddStore  stores={this.getAllStores}/>
   
    <br/>
    <br/>
    <table class='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {stores.map((sto)=>{
          return(
              <tr key={sto.id} >
                <th >{sto.name}</th>
                <th>{sto.address}</th>
                <th>
                  <EditStore store={sto} stores={this.getAllStores}/>
                </th>
                <th>
                  <DeleteStore stoid={sto.id} stores={this.getAllStores} />
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

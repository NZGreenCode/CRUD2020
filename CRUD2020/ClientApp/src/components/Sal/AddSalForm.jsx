import React, {useState,Component } from 'react'
import { Form,Icon,Header,Button,Dropdown } from 'semantic-ui-react'
import axios from 'axios'
class AddSalForm extends Component {

    constructor(props){

    super(props)
    this.state={
      
      customers:[],
      products:[],
      stores:[],
      Id:'',
      ProductId:'',
      CustomerId:'',
      StoreId:'',
      DateSold:''

    }

}


handleChangeCusDrop = event => {
this.setState({CustomerId:event.target.value})
  }

handleChangeProDrop = event => {
  this.setState({ProductId:event.target.value})
  }

handleChangeStoDrop = event => {
    this.setState({StoreId:event.target.value})
  }

handleChangeDate = event => {
  this.setState({Date:event.target.value})
}
      

handleSubmit=event=>{
  
  event.preventDefault()

      console.log(this.state)

  axios.post('https://localhost:44376/Sales/PostSale/',
  JSON.stringify({
  ProductId:this.state.ProductId,
  CustomerId:this.state.CustomerId,
  StoreId:this.state.StoreId,
  DateSold:this.state.Date,

  }),
  { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
    .then(prediction=>{
      console.log(prediction);
    })

    this.setState({
    Name:'',
    Address:'',
    })

    }
    componentDidMount(){
      this.getAllCustomer();
      this.getAllProduct();
      this.getAllStore();
    }

    getAllCustomer=()=>{

      // Make a request for a user with a given ID
      axios.get(`https://localhost:44376/Customers/GetCustomer`)
      .then( (res)=> {
        console.log(res.data);
        this.setState({customer:res.data})
      })
      .catch((err)=> {
        console.log(err);
      });
      
    }

    getAllProduct=()=>{
      
      // Make a request for a user with a given ID
      axios.get(`https://localhost:44376/Products/GetProduct`)
      .then( (res)=> {
        // console.log(res.data);
        this.setState({product:res.data})
      })
      .catch((err)=> {
        console.log(err);
      });
  
    }

      getAllStore=()=>{

        // Make a request for a user with a given ID
            axios.get(`Stores/GetStore`)
            .then( (res)=> {
              console.log(res.data);
              this.setState({store:res.data})
            })
            .catch((err)=> {
              console.log(err);
            });
        
      }



  render() {
    const {customer}=this.state;
    const {product}=this.state;
    const {store}=this.state;
    return (
    <div class='ui container'>
        <Form onSubmit={this.handleSubmit}>
            Date Sold 
            <br/>
            <input
            type='date'
            name='dateSold'
            pladeholder='date sold'
            onChange={this.handleChangeDate}
            />
            <br/>      
            Customer
            
            <select placeholder='Customer'
              onChange={this.handleChangeCusDrop} >
            {customer.map((cust)=>{
              return(
                  <option value={cust.Id}>{cust.name}</option>
               )
              })
            }
             </select><br/>
             Product
             <select placeholder='Product'
              onChange={this.handleChangeProDrop}>
            {product.map((pro)=>{
              return(
                  <option value={pro.Id}>{pro.name}</option>
               )
              })
            }
             </select><br/>
             Store
             <select placeholder='Store'
              onChange={this.handleChangeStoDrop}>
              {store.map((sto)=>{
                return(
                <option value={sto.Id}>{sto.name}</option>
              )
               })
             }
             </select><br/>
            <Form.Field >
              <br/>
              <Button secondary >
                  Cancel
              </Button>
              <Button type='submit' color='green' >
                  Create <Icon name='checkmark'/>
              </Button>
            </Form.Field>
        </Form>
    </div>
    )
  }
}

export default AddSalForm

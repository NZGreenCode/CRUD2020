import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal,Dropdown  } from 'semantic-ui-react'
import axios from 'axios'
import 'react-dropdown/style.css';
import moment from 'moment'


export default class AddSale extends Component{
 
  constructor(props){

    super(props)
    this.state={
      
      customer:[],
      product:[],
      store:[],
      // Id:'',
      // ProductId:'',
      // CustomerId:'',
      // StoreId:'',
      // DateSold:'',
    }

}
 
  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modalOpen:false});
  
  handleChangeCusDrop = event => {
      this.setState({ CustomerID: event.target.value })
      console.log('<<>>' + event.target.value);

    
    }
    handleChangeProDrop = event => {
      this.setState({ProductID:event.target.value})
    }
    
    handleChangeStoDrop = event => {
        this.setState({StoreID:event.target.value})
      }
    
    handleChangeDate = event => {
        this.setState({
            Date:moment(event.target.value).format("DD-MM-YYYY")
        })
    }
          
    
    handleSubmit=event=>{
      
      event.preventDefault()
      console.log(event);

          console.log("State >>>", this.state);

          axios.post('Sales/PostSales/',
      JSON.stringify({
      ProductId:this.state.ProductID,
      CustomerId:this.state.CustomerID,
      StoreId:this.state.StoreID,
      DateSold:this.state.Date,
    
      }),
      { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then(prediction=>{
          console.log('what'+prediction);
          this.props.sales();
        })
        this.setState({modalOpen:false});
        this.state.CustomerID='';
        this.state.ProductID='';
        this.state.StoreID='';

    
      }
  componentDidMount(){
    this.getAllCustomer();
    this.getAllProduct();
    this.getAllStore();
  }

  getAllCustomer=()=>{

    // Make a request for a user with a given ID
    axios.get(`Customers/GetCustomer`)
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
    axios.get(`Products/GetProduct`)
    .then( (res)=> {
      // console.log(res.data);
      this.setState({product:res.data})
      this.props.sales();
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




   // validation
    validateForm() {
        let formIsValid = true
        if (!this.state.CustomerID) {
            formIsValid = false;
        }

        if (!this.state.ProductID) {
            formIsValid = false;
        }

        if (!this.state.StoreID) {
            formIsValid = false;
        }

        if (!this.state.Date) {
            formIsValid = false;
        }

        return formIsValid
    }


  render() {


    const {customer}=this.state;
    const {product}=this.state;
    const {store}=this.state;
// console.log('what is ur'+this.props.sales.Id);

    return (
      <div>
        <Button primary onClick={ (e) => this.setState({modalOpen: true})}>New Sale</Button>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
        id="sales_model"
      >
        <Modal.Header>Create Sale</Modal.Header>
        <Modal.Content>
         
        <div class='ui container'>
        <Form onSubmit={this.handleSubmit}>
            <label>Date Sold </label>
            <br/>
            <input
            type='date'
            name='dateSold'
            required
            pladeholder='date sold'
            onChange={this.handleChangeDate}
            />
            <br/>
            <br/>  
            <label>Customer</label>
            <select 
                required                
                onChange={this.handleChangeCusDrop} >
              {customer.map((cusOp)=>(
                <option 
                key={cusOp.id}
                value={cusOp.id}
                >{cusOp.name}</option>
              )
              )};
            </select>
            <br/>
            <br/>
            <label>Product</label>
            <select 
                required
                onChange={this.handleChangeProDrop}
              >
              {product.map((proOp)=>(
                <option 
                key={proOp.id} 
                value={proOp.id}
                >{proOp.name}</option>
              )
              )};
            </select>
             <br/>
             <br/>
             <label> Store</label>
            <select 
              required
              onChange={this.handleChangeStoDrop}>
                {store.map((stoOp)=>(
                  <option 
                  key={stoOp.id} 
                  value={stoOp.id}
                  >{stoOp.name}</option>
                )
                )};
            </select>
              <br/>
              <br/>
            <Form.Field >
              <br/>
              <Button secondary onClick={this.handleClose}>
                  Cancel
              </Button>
              <Button disabled={!this.validateForm()} type='submit' color='green' >
                  Create <Icon name='checkmark'/>
              </Button>
            </Form.Field>
        </Form>
    </div>

        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

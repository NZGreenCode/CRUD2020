import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal,Dropdown  } from 'semantic-ui-react'
import axios from 'axios'
import 'react-dropdown/style.css';


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
    this.setState({CustomerID:event.target.value})
    
    }
    handleChangeProDrop = event => {
      this.setState({ProductID:event.target.value})
    }
    
    handleChangeStoDrop = event => {
        this.setState({StoreID:event.target.value})
      }
    
    handleChangeDate = event => {
      this.setState({Date:event.target.value})
    }
          
    
    handleSubmit=event=>{
      
      event.preventDefault()
      console.log(event);

          console.log("State >>>", this.state);

          axios.post('https://localhost:44376/Sales/PostSales/',
      JSON.stringify({
      ProductId:this.state.ProductID,
      CustomerId:this.state.CustomerID,
      StoreId:this.state.StoreID,
      DateSold:this.state.Date,
    
      }),
      { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then(prediction=>{
          console.log(prediction);
          this.props.sales();
        })
        this.setState({modalOpen:false});
    
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
            Date Sold 
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
            Customer
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
            Product
            <select 
                onChange={this.handleChangeProDrop}
              >
              {product.map((proOp)=>(
                <option 
                key={proOp.id} 
                value={proOp.id}
                selected={proOp.id[0]}
                >{proOp.name}</option>
              )
              )};
            </select>
             <br/>
             <br/>
             Store
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
              <Button type='submit' color='green' >
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

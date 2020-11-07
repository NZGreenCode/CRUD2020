import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import 'react-dropdown/style.css'

export default class EditSalModal extends Component{
  constructor(props){

    super(props)
    this.state={
      

      customer:[],
      product:[],
      store:[],
    }

  }

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modalOpen:false}); 

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

      axios.put('https://localhost:44376/Sales/PutSales/'+this.props.sale.id,
      JSON.stringify({
        Id:this.props.sale.id,
        ProductId:this.state.ProductId,
        CustomerId:this.state.CustomerId,
        StoreId:this.state.StoreId,
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
      this.props.sales();

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
    const {sale}= this.props;
    const {customer}=this.state;
    const {product}=this.state;
    const {store}=this.state;


    return (
      <div>
      <Button color="yellow" onClick={ (e) => this.setState({modalOpen: true})}>
      <i aria-hidden="true" class="edit icon" ></i>
      EDIT</Button>

      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
      >
        <Modal.Header>Edit Sale</Modal.Header>
        <Modal.Content>

        <div class='ui container'>
            <Form onSubmit={this.handleSubmit}>
            <label>Date Sold</label> 
            <br/>
            <input
            type='date'
            name='dateSold'
            required
            onChange={this.handleChangeDate}
            defaultValue={this.props.sale.datesold}
            />
            <br/>
            <br/>      
            <label>Customer</label> 
            <select 
            defaultValue={this.props.sale.customer}
            >
              {customer.map((cusOp)=>(
                <option 
                key={cusOp.Id} 
                value={cusOp.name} 
                onChange={this.handleChangeCusDrop}
                >{cusOp.name}</option>
              )
              )};
            </select>
            <br/>
            <br/>
            <label>Product</label> 
            <select 
            defaultValue={this.props.sale.product}
            >
              {product.map((proOp)=>(
                <option 
                key={proOp.Id} 
                value={proOp.name}
                onChange={this.handleChangeProDrop}
                
                >{proOp.name}</option>
              )
              )};
            </select>
             <br/>
             <br/>
             Store
            <select>
              {store.map((stoOp)=>(
                <option 
                key={stoOp.Id} 
                value={stoOp.name}
                onChange={this.handleChangeStoDrop}
                deafaultvalue={this.props.sale.store}
                >{stoOp.name}</option>
              )
              )};
            </select>
                <Form.Field >
                  <br/>
                  <Button secondary onClick={this.handleClose} >
                      Cancel
                  </Button>
                  <Button type='submit' color='green' >
                      Edit <Icon name='checkmark'/>
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

import React,{Component} from 'react'
import { Form,Icon,Header,Button,Dropdown,Modal  } from 'semantic-ui-react'
import axios from 'axios'


export default class AddSale extends Component{
 
  constructor(props){

    super(props)
    this.state={
      
      customer:[],
      product:[],
      store:[],
      Id:'',
      ProductId:'',
      CustomerId:'',
      StoreId:'',
      DateSold:'',
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
      <div>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
        trigger={<Button primary>New Sale</Button>}
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
            pladeholder='date sold'
            onChange={this.handleChangeDate}
            />
            <br/>
            <br/>      
            Customer
            
            <Dropdown
            placeholder='customers'
            selection
            search
            options={customer}
            onChange={this.handleChangeCusDrop}
            />
            <br/>
            <br/>
              <Dropdown
              placeholder='product'
              selection
              search
              options={product}
              onChange={this.handleChangeProDrop}
              />
             <br/>
             <br/>
             Store
             <Dropdown
              placeholder='store'
              selection
              search
              options={store}
              onChange={this.handleStoDropdown}
              />             
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

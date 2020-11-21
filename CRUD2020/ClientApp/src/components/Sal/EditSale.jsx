import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import 'react-dropdown/style.css'
import moment, { parseTwoDigitYear } from 'moment'
import DatePicker from 'react-semantic-ui-datepickers';
import { Dropdown } from 'semantic-ui-react'
import { when } from 'jquery'


export default class EditSalModal extends Component{
  constructor(props){

    super(props)
    this.state={
      DateSold:'', 
      dateTime1:'',     

      customer:[],
      product:[],
        store: [],
        CustomerName: this.props.sale.customer.id,
        ProductName: this.props.sale.product.id,
        StoreName: this.props.sale.store.id,
        Date:moment(this.props.sale.dateSold).format("DD-MM-YYYY")

      
    }

  }

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modalOpen:false}); 

    handleChangeCusDrop = event => {
        this.setState({ CustomerName: event.target.value })
        console.log('<<>>' + event.target.Id);
        this.getAllCustomer();

       }
    
    handleChangeProDrop = event => {
        this.setState({ ProductName: event.target.value })
        console.log('<<>>' + event.target.Id);

       }
    
    handleChangeStoDrop = event => {
        this.setState({ StoreName: event.target.value })
        console.log('<<>>' + event.target.value);

       }
    
    handleChangeDate = event => {
      this.setState({Date:event.target.value})
      console.log('<<>>'+event.target.value);
    }
    handleSubmit=event=>{
      event.preventDefault()

      axios.put('Sales/PutSales/'+this.props.sale.id,
      JSON.stringify({
        Id:this.props.sale.id,
        Product:{name:this.state.ProductName},
        Customer:{name:this.state.CustomerName},
        Store:{name:this.state.StoreName},
        DateSold: this.state.Date

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
    axios.get(`Customers/GetCustomer`)
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


  render() {
    const {sale}= this.props;
    const {customer}=this.state;
    const {product}=this.state;
    const { store } = this.state;

    

    // this.state.DateSold= moment(new Date(this.props.sales.dateSold)).format(YYYY-MM-DD);


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
            <label>Date Sold</label><br/>
            <label>{moment(this.props.sale.dateSold).format("DD-MM-YYYY")}</label>
            <br/>
            <input
            type='date'
            name='dateSold'
            format={moment(this.props.sale.dateSold).format("DD-MM-YYYY")}
            onChange={this.handleChangeDate}
             />

            <br/>
            <br/>      
            <label>Customer</label> 
            <select
                onChange={this.handleChangeCusDrop}
                defaultValue={this.props.sale.customer.name}
            >
                {customer.map((cusOp) => (
                    <option
                        key={cusOp.id}
                        Id={cusOp.id}
                        value={cusOp.name}
                    >{cusOp.name}</option>
                )
                )};
            </select>
            <br/>
            <br/>
            <label>Product</label> 
            <select
                onChange={this.handleChangeProDrop}
                defaultValue={this.props.sale.product.name}
            >
                {product.map((proOp) => (
                    <option
                        key={proOp.id}
                        value={proOp.name}
                    >{proOp.name}</option>
                )
                )};
            </select>

             <br/>
             <br/>
            <label> Store </label> 

            <select
                onChange={this.handleChangeStoDrop}
                defaultValue={this.props.sale.store.name}
            >
                {store.map((stoOp) => (
                    <option
                        key={stoOp.id}
                        value={stoOp.name}
                        text={stoOp.id}
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

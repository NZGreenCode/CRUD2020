import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import 'react-dropdown/style.css'
import moment, { parseTwoDigitYear } from 'moment'
import DatePicker from 'react-semantic-ui-datepickers';

export default class EditSalModal extends Component{
  constructor(props){

    super(props)
    this.state={
      DateSold:'', 
      dateTime1:'',     

      customer:[],
      product:[],
      store:[],
      Date:this.props.sale.dateSold
    }

  }

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modalOpen:false}); 

  // handleChangeCusDrop = event => {
  //   this.setState({CustomerId:event.target.value})
  //     }
    
  //   handleChangeProDrop = event => {
  //     this.setState({ProductId:event.target.value})
  //     }
    
  //   handleChangeStoDrop = event => {
  //       this.setState({StoreId:event.target.value})
  //     }
    
    handleChangeDate = event => {
      this.setState({Date:event.target.value})
      console.log('<<>>'+event.target.value);
    }
    handleSubmit=event=>{
      event.preventDefault()

      axios.put('https://localhost:44376/Sales/PutSales/'+this.props.sale.id,
      JSON.stringify({
        Id:this.props.sale.id,
        ProductId:this.props.sale.product.id,
        CustomerId:this.props.sale.customer.id,
        StoreId:this.props.sale.store.id,
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
    // this.state.DateSold= moment(new Date(this.props.sales.dateSold)).format(YYYY-MM-DD);
const format1 = "YYYY-MM-DD HH:mm:ss"
const format2 = "YYYY-MM-DD"
var date1 = new Date(this.props.sales.dateSold);

var dateTime1 = moment(date1).format(format2);

    console.log('day'+dateTime1);
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
            <label>{this.props.sale.dateSold}</label>
            <br/>
            <input
            type='date'
            name='dateSold'
            required
            defaultvalue={"2020-11-07"}
            onChange={this.handleChangeDate}
            />
{/* <DatePicker
  selected={this.props.sale.DateSold}
  onChange={this.handleChangeDate}
  format={YYYY-MM-DDHH:MM:SS}
/> */}
            <br/>
            <br/>      
            <label>Customer</label> 
            <select disabled>
                <option 
                value={this.props.sale.customer.name}
                >{this.props.sale.customer.name}
                </option>
            </select>
            <br/>
            <br/>
            <label>Product</label> 
            <select disabled>
                <option 
                value={this.props.sale.product.name}
                >{this.props.sale.product.name}
                </option>
            </select>
             <br/>
             <br/>
             Store
            <select disabled>
                <option 
                value={this.props.sale.store.name}
                >{this.props.sale.store.name}
                </option>
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

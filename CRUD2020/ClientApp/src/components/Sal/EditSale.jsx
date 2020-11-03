import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class EditSalModal extends Component{
  constructor(props){

    super(props)
    this.state={
      

    Name:'',
    Address:'',

    }

  }

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modaleOpen:false}); 

    handleChangeName = event => {
      this.setState({Name:event.target.value})
    }

    handleChangeAddress = event => {
    this.setState({Address:event.target.value})
    }

    handleSubmit=event=>{
      
      event.preventDefault()

      axios.put('https://localhost:44376/Sales/PutSale/'+this.props.sale.id,
      JSON.stringify({
        Id:this.props.sale.id,
        DateSold:this.state.DataSold,
        CustomerId:this.state.custId,
        ProductId:this.state.proId,
        StoreId:this.state.sale.stoId
      }),
      { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
      .then(prediction=>{
        console.log(prediction);
      })

    }

  render() {
    const {sale}= this.props;
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
        trigger={<Button color="yellow">
        <i aria-hidden="true" class="edit icon" ></i>
          EDIT </Button>}
      >
        <Modal.Header>Edit Sale</Modal.Header>
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
                defaultvalue={this.props.sal.DateSold}
                />
                <br/>      
                Customer
                
                <select placeholder='Customer'
                  onChange={this.handleChangeCusDrop} 
                  defaultvalue={this.props.sal.custId}>

                {customer.map((cust)=>{
                  return(
                      <option key={cust.Id}>{cust.name}</option>
                   )
                  })
                }
                 </select><br/>
                 Product
                 <select placeholder='Product'
                  onChange={this.handleChangeProDrop}
                  defaultvalue={this.props.sal.proId}
                  >

                {product.map((pro)=>{
                  return(
                      <option key={pro.Id}>{pro.name}</option>
                   )
                  })
                }
                 </select><br/>
                 Store
                 <select placeholder='Store'
                  onChange={this.handleChangeStoDrop}
                  defaultvalue={this.props.sal.stoId}
                  >
                  {store.map((sto)=>{
                    return(
                    <option key={sto.Id}>{sto.name}</option>
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

        </Modal.Content>
      </Modal>
      </div>

    )
  }

}

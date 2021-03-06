import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import { browserHistory } from 'react-router';
import { withRouter } from "react-router";



export default class AddCustomer extends Component{
  
  constructor(props){

    super(props)
    this.state={
      

    Name:'',
    Address:'',

    }
                                                                                                                                        
}
 

  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modalOpen:false});

  handleChangeName = event => {
    this.setState({Name:event.target.value})
  }
  
  handleChangeAddress = event => {
  this.setState({Address:event.target.value})
  
  }
  
  handleSubmit=event=>{

    event.preventDefault()
  
    console.log(this.state)
    axios.post('Customers/PostCustomer/',
    JSON.stringify({
    Name:this.state.Name,
    Address:this.state.Address,
  }),
       { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
  .then(prediction=>{
    console.log(prediction);
    this.props.customers();
  })
  this.setState({modalOpen:false});

  }
  


  render() {

    return (
      <div>
      <Button primary onClick={ (e) => this.setState({modalOpen: true})}>New Customer</Button>

      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
      >
        <Modal.Header>Create Customer</Modal.Header>
        <Modal.Content>

        <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field >
            <Form.Input
              placeholder='Name'
              label='Name'
              required
              onChange={this.handleChangeName}
            />
            <Form.Input
              placeholder='Address'
              label='Address'
              required
              onChange={this.handleChangeAddress}
            />
            </Form.Field>
            <Form.Field >
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

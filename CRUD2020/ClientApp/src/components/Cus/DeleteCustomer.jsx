import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router'

export default class DeleteCustomer extends Component{
  constructor(props){

    super(props)
    this.state={
    loading: true,

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
    axios.delete('Customers/DeleteCustomer/' + this.props.cusid)
    .then(prediction=>{
      console.log(prediction);
      this.props.customers();
    })
    this.setState({modalOpen:false});
    
  }


  render() {

    const {  cusid } = this.props;

    return (
      <div>
        <Button color="red" onClick={ (e) => this.setState({modalOpen: true})}>
          <i aria-hidden="true" class="delete icon"></i>
          DELETE</Button>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
      >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>
       
           <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                
                </Form.Field>
                <Form.Field>
                  <Button secondary  onClick={this.handleClose}>
                      Cancel
                  </Button>
                  <Button typet='submit' color='red' >
                      Delete <Icon name='delete'/>
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

import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class DeleteSale extends Component{
  constructor(props){

    super(props)
    this.state={
    loading: true,

    }

  }

  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modalOpen:false});
 
  
  handleSubmit=event=>{
      
    event.preventDefault()

    console.log(this.state)
    axios.delete('https://localhost:44376/Sales/deleteSale/' + this.props.salid);

    }

  render() {

    // const {  salid } = this.props;
    // console.log("Sal Id" + salid)

    return (
      <div>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
        trigger={<Button 
          color="red">
          <i aria-hidden="true" class="delete icon"></i>
          DELETE</Button>}
      >
        <Modal.Header>Delete Sale</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>

           <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                
                </Form.Field>
                <Form.Field>
                  <Button secondary onClick={this.handleClose}>
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

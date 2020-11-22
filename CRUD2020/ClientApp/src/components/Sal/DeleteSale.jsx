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

    console.log(this.state);
    axios.delete('Sales/DeleteSales/' + this.props.salid)
   .then(prediction=>{
      console.log(prediction);
      this.props.sales();
    })        
      this.setState({modalOpen:false});
    }
    render() {

    // const {  salid } = this.props;
    // console.log("Sal Id" + salid)

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

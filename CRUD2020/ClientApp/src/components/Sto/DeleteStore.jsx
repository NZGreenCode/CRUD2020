import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class DeleteStore extends Component{
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
    axios.delete('https://localhost:44376/Stores/DeleteStore/' + this.props.stoid);
    this.props.stores();
    this.setState({modalOpen:false});
    }





  render() {

    const {  stoid } = this.props;

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
        <Modal.Header>Delete Store</Modal.Header>
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

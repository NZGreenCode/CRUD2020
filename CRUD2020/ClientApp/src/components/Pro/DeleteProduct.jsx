import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'


export default class DeleteProduct extends Component{
  constructor(props) {

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

  handleChangePrice = event => {
  this.setState({Price:event.target.value})
  }

  handleSubmit=event=>{
    
    event.preventDefault()

    axios.delete('https://localhost:44376/Products/DeleteProduct/'+this.props.proid)
    .then(prediction=>{
      console.log(prediction);
      this.props.products();
    })
    this.setState({modalOpen:false});  
  }

  render() {

    const {proid } = this.props;

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
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>
 
           <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  </Form.Field>
                  <Form.Field >
                    <Button secondary onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button typet='submit' color='red' >
                        Delete <Icon name=' delete'/>
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

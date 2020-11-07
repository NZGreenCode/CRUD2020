import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class AddProduct extends Component{

  constructor(props){

    super(props)
    this.state={
      

    Name:'',
    Price:''

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
  
    console.log(this.state)
    axios.post('Products/PostProduct/',
    JSON.stringify({
    Name:this.state.Name,
    Price:this.state.Price,
  }),
  { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
  .then(prediction=>{
    console.log(prediction);
    this.props.products();

  })
  this.setState({modalOpen:false});
  
  }
  

  render() {

    return (
      <div>
        <Button primary onClick={ (e) => this.setState({modalOpen: true})}>New Product</Button>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
      >
        <Modal.Header>Create Product</Modal.Header>
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
              placeholder='Price'
              label='Price'
              required
              onChange={this.handleChangePrice}
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

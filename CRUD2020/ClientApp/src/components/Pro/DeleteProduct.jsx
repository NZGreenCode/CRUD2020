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
  handleClose=()=> this.setState({modaleOpen:false});

  handleChangeName = event => {
    this.setState({Name:event.target.value})
  }

  handleChangePrice = event => {
  this.setState({Price:event.target.value})
  }

  handleSubmit=event=>{
    
    event.preventDefault()

    axios.delete('https://localhost:44376/Products/DeleteProduct/'+this.props.proid,
      )
    // this.setState({
    // Name:'',
    // Address:'',
    // })
  }

  render() {

    const {proid } = this.props;

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
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>
 
           <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  <Form.Input
                    label='Name'
                    onChange={this.handleChangeName}
                    defaultValue={this.props.product.Name}
                  />
                  <Form.Input
                    label='price'
                    onChange={this.handleChangePrice}
                    defaultValue={this.props.product.Price}
                  />
                  </Form.Field>
                  <Form.Field>
                    <Button secondary>
                        Cancel
                    </Button>
                    <Button typet='submit' color='green' >
                        Edit <Icon name=' edit icon'/>
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

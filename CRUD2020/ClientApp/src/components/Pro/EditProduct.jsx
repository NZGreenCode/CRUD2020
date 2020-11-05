import React,{Component} from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class EditProduct extends Component{
      constructor(props){

        super(props)
        this.state={
          

        Name:'',
        Price:'',

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

      axios.put('Products/PutProduct/'+ this.props.product.id,
      JSON.stringify({
        Id:this.props.product.id,
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
console.log(this.props.product);

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
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content>
        <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  <Form.Input
                    label='Name'
                    required
                    onChange={this.handleChangeName}
                    defaultValue={this.props.product.Name}
                  />
                  <Form.Input
                    label='price'
                    required
                    onChange={this.handleChangePrice}
                    defaultValue={this.props.product.Price}
                  />
                  </Form.Field>
                  <Form.Field>
                    <Button secondary onClick={this.handleClose}>
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

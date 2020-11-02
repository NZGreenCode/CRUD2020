import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import EditProForm from './EditProForm'

export default class EditProModal extends Component{
  constructor(props){

      super(props);

      this.state = { 
      // addModalShow: false,
      // editModalShow:false,
      // deleteModalShow:false,
      }
  }
 

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modaleOpen:false}); 

  render() {
    console.log(this.product);

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
              <EditProForm  product={this.props.product} handleClose={this.handleClosed} />
              
        </Modal.Content>
      </Modal>
      </div>

    )
  }

}

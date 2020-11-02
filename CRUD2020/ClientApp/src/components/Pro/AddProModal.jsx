import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddProForm from './AddProForm'

export default class AddProModal extends Component{
  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modaleOpen:false});
  
  render() {

    return (
      <div>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
        trigger={<Button primary>New Product</Button>}
      >
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Content>
              <AddProForm handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

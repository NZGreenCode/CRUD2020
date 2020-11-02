import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddForm from './AddForm'

export default class AddCusModal extends Component{
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
        trigger={<Button primary>New Customer</Button>}
      >
        <Modal.Header>Create Customer</Modal.Header>
        <Modal.Content>
              <AddForm handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

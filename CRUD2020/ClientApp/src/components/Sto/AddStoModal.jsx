import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddStoForm from './AddStoForm'

export default class AddStoModal extends Component{
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
        trigger={<Button primary>New Store</Button>}
      >
        <Modal.Header>Create Store</Modal.Header>
        <Modal.Content>
              <AddStoForm handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

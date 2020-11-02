import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddSalForm from './AddSalForm'

export default class AddSaleModal extends Component{
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
        trigger={<Button primary>New Sale</Button>}
      >
        <Modal.Header>Create Sale</Modal.Header>
        <Modal.Content>
              <AddSalForm handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

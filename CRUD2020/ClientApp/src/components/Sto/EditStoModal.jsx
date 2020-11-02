import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import EditStoForm from './EditStoForm'

export default class EditStoModal extends Component{
  constructor(props){

      super(props);

      this.state = { 
      }
  }
 

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
        trigger={<Button color="yellow">
        <i aria-hidden="true" class="edit icon" ></i>
          EDIT </Button>}
      >
        <Modal.Header>Edit Store</Modal.Header>
        <Modal.Content>
              <EditStoForm store={this.props.store} handleClose={this.handleClosed} />
              
        </Modal.Content>
      </Modal>
      </div>

    )
  }

}

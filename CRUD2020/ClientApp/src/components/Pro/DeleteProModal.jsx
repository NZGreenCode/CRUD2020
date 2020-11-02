import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import DeleteProForm from './DeleteProForm'

export default class DeleteProModal extends Component{
  constructor(props) {

    super(props);
    this.state={


    }
  }

  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modaleOpen:false});
  
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
              <DeleteProForm proid={proid} handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

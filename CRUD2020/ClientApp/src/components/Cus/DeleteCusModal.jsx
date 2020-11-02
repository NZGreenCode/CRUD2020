import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import DeleteForm from './DeleteForm'

export default class DeleteCusModal extends Component{
  constructor(props) {

    super(props);
    this.state={


    }
  }

  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modaleOpen:false});
  
  render() {

    const {  cusid } = this.props;
    console.log("Cus Id" + cusid)

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
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>
              <DeleteForm cusid={cusid} handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

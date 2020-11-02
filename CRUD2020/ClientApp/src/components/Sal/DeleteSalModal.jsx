import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import DeleteSalForm from './DeleteSalForm'

export default class DeleteSalModal extends Component{
  constructor(props) {

    super(props);
    this.state={


    }
  }

  state={  modelOpen:false };

  handleOpen=() => this.setState({modalOpen:true});
  handleClose=()=> this.setState({modaleOpen:false});
  
  render() {

    // const {  salid } = this.props;
    // console.log("Sal Id" + salid)

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
        <Modal.Header>Delete Sale</Modal.Header>
        <Modal.Content>
           <Modal.Description>Are you sure? </Modal.Description>
              <DeleteSalForm salid={this.salid} handleClose={this.handleClosed}/>
        </Modal.Content>
      </Modal>
      </div>
    )
  }

}

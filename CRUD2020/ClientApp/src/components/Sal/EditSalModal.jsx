import React,{Component} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import EditSalForm from './EditSalForm'

export default class EditSalModal extends Component{
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
    // goToCust=(props)=>{

    // }

  render() {
    const {sale}= this.props;

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
        <Modal.Header>Edit Sale</Modal.Header>
        <Modal.Content>
              <EditSalForm sale={sale} handleClose={this.handleClosed} />
              
        </Modal.Content>
      </Modal>
      </div>

    )
  }

}

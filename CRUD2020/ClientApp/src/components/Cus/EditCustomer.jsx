import React, { Component } from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class EditCustomer extends Component{
  
  constructor(props){

    super(props)
    this.state={

        Name:this.props.customer.name,
        Address:this.props.customer.address
       }

  }
    ;

    state={  modelOpen:false };

    handleOpen=() => this.setState({modalOpen:true});
    handleClose=()=> this.setState({modalOpen:false}); 

    handleChangeName = event => {
      this.setState({Name:event.target.value})
    }

    handleChangeAddress = event => {
    this.setState({Address:event.target.value})
    }


    handleSubmit=event=>{
      
      event.preventDefault()

      axios.put('Customers/PutCustomer/'+ this.props.customer.id,
      JSON.stringify({
        Id:this.props.customer.id,
        Name:this.state.Name,
        Address:this.state.Address,

      }),
      { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
      .then(prediction=>{
        console.log(prediction);
        this.props.customers();
      })
      this.setState({modalOpen:false});

    }

  render() {
      console.log(this.state.name);
    return (
      <div>
        <Button color="yellow" onClick={ (e) => this.setState({modalOpen: true})}>
        <i aria-hidden="true" class="edit icon" ></i>
          EDIT </Button>
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
        centered={false}
      >
        <Modal.Header>Edit Customer</Modal.Header>
        <Modal.Content>

        <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  <Form.Input
                    label='Name'
                    required
                    onChange={this.handleChangeName}
                    defaultValue={this.props.customer.name}
                    
                  />
                  <Form.Input
                    label='Address'
                    required
                    onChange={this.handleChangeAddress}
                    defaultValue={this.props.customer.address}
                  />
                  </Form.Field>
                  <Form.Field>
                    <Button secondary  onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button typet='submit' color='green' >
                        Edit <Icon name=' edit icon'/>
                    </Button>
                </Form.Field>
              </Form>
          </div>
        </Modal.Content>
      </Modal>
      </div>

    )
  }

}

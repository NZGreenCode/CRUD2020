

import React, { Component } from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class EditStore extends Component{
  constructor(props){

    super(props)
    this.state={
      

    Name:this.props.store.name,
    Address:this.props.store.address,

    }

  }

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

      axios.put('https://localhost:44376/Stores/PutStore/'+ this.props.store.id,
      JSON.stringify({
        Id:this.props.store.id,
        Name:this.state.Name,
        Address:this.state.Address,

      }),
      { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
      .then(prediction=>{         
        console.log(prediction);
        this.props.stores();
      })   
    this.setState({modalOpen:false});
    }

  render() {

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
        <Modal.Header>Edit Store</Modal.Header>
        <Modal.Content>

        <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  <Form.Input
                    label='Name'
                    required
                    onChange={this.handleChangeName}
                    defaultValue={this.props.store.name}
                    
                  />
                  <Form.Input
                    label='Address'
                    required
                    onChange={this.handleChangeAddress}
                    defaultValue={this.props.store.address}
                  />
                  </Form.Field>
                  <Form.Field>
                    <Button secondary onClick={this.handleClose}>
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

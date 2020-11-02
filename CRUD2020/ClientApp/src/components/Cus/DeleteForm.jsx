import React, { Component } from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

  class DeleteForm extends Component {

    constructor(props){

      super(props)
      this.state={
      loading: true,

      }

    }

    handleChangeName = event => {
      this.setState({Name:event.target.value})
    }

    handleChangeAddress = event => {
    this.setState({Address:event.target.value})

    }

    handleSubmit=event=>{
      
      event.preventDefault()

      console.log(this.state)
      axios.delete('https://localhost:44376/Customers/deleteCustomer/' + this.props.cusid);

      }

      render() {

        // console.log("ID inside form" +this.props.cusid)

        return (
          <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                
                </Form.Field>
                <Form.Field>
                  <Button secondary>
                      Cancel
                  </Button>
                  <Button typet='submit' color='red' >
                      Delete <Icon name='delete'/>
                  </Button>
                </Form.Field>
            </Form>
          </div>
        )
      }
  }

export default DeleteForm

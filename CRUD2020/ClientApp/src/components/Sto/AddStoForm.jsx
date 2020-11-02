import React, { Component } from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class AddStoForm extends Component {

    constructor(props){

    super(props)
    this.state={
      

    Name:'',
    Address:'',

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
  axios.post('https://localhost:44376/Stores/PostStore/',
  JSON.stringify({
  Name:this.state.Name,
  Address:this.state.Address,
}),
{ headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
.then(prediction=>{
  console.log(prediction);
})

this.setState({
Name:'',
Address:'',
})

}
  render() {
  
  
    return (
    <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field >
            <Form.Input
              placeholder='Name'
              label='Name'
              onChange={this.handleChangeName}
            />
            <Form.Input
              placeholder='Address'
              label='Address'
              onChange={this.handleChangeAddress}
            />
            </Form.Field>
            <Form.Field >
              <Button secondary as={Link} to='../Store'>
                  Cancel
              </Button>
              <Button type='submit' color='green' >
                  Create <Icon name='checkmark'/>
              </Button>
          </Form.Field>
        </Form>
    </div>
    )
  }
}

export default AddStoForm

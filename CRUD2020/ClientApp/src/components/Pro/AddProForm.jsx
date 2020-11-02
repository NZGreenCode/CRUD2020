import React, { Component } from 'react'
import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'

class AddProForm extends Component {

    constructor(props){

    super(props)
    this.state={
      

    Name:'',
    Price:''

    }

}

handleChangeName = event => {
  this.setState({Name:event.target.value})
}

handleChangePrice = event => {
  this.setState({Price:event.target.value})
  }
  

handleSubmit=event=>{
  
  event.preventDefault()

  console.log(this.state)
  axios.post('https://localhost:44376/Products/PostProduct/',
  JSON.stringify({
  Name:this.state.Name,
  Price:this.state.Price,
}),
{ headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
.then(prediction=>{
  console.log(prediction);
})

this.setState({
Name:'',
Price:'',
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
              required
              onChange={this.handleChangeName}
            />
            <Form.Input
              placeholder='Price'
              label='Price'
              required
              onChange={this.handleChangePrice}
            />
            </Form.Field>
            <Form.Field >
              <Button secondary Component='right'>
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

export default AddProForm

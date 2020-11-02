      import React, { Component } from 'react'
      import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
      import axios from 'axios'

      class EditForm extends Component {

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

            axios.put('https://localhost:44376/Customers/PutCustomer/'+this.props.customer.id,
            JSON.stringify({
              Id:this.props.customer.id,
              Name:this.state.Name,
              Address:this.state.Address,
            }),
            { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then(prediction=>{
              console.log(prediction);
            })

          }
            

          render() {
            const {customer}= this.props;

            // console.log(this.props.customer);

          return (
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
                    <Button secondary>
                        Cancel
                    </Button>
                    <Button typet='submit' color='green' >
                        Edit <Icon name=' edit icon'/>
                    </Button>
                </Form.Field>
              </Form>
          </div>
          )
        }
      }

      export default EditForm

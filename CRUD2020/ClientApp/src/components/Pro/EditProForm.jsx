      import React, { Component } from 'react'
      import { Form,Icon,Header,Button,Modal } from 'semantic-ui-react'
      import axios from 'axios'

      class EditProForm extends Component {

          constructor(props){

            super(props)
            this.state={
              

            Name:'',
            Price:'',

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

            axios.put('https://localhost:44376/Products/PutProduct/'+this.props.product.id,
            JSON.stringify({
              Id:this.props.product.id,
              Name:this.state.Name,
              Price:this.state.Price,
            }),
            { headers: {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then(prediction=>{
              console.log(prediction);
            })

            // this.setState({
            // Name:'',
            // Address:'',
            // })
          }
            

          render() {
            // console.log(this.props.product.Name);
            console.log(this.props.product);
            return (
          <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                  <Form.Input
                    label='Name'
                    required
                    onChange={this.handleChangeName}
                    defaultValue={this.props.product.Name}
                  />
                  <Form.Input
                    label='price'
                    required
                    onChange={this.handleChangePrice}
                    defaultValue={this.props.product.Price}
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

      export default EditProForm

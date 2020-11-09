import React,{useState,Component } from 'react'
import axios from "axios"
import ReactDOM from 'react-dom'
import { Pagination } from 'semantic-ui-react'
import AddCustomer from './Cus/AddCustomer'
import EditCustomer from './Cus/EditCustomer'
import DeleteCustomer from './Cus/DeleteCustomer'
import ReactPaginate from 'react-paginate'



export class Customer extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 

     loading: true,
     offset: 0,
     customers:[],
     tableData:[],
     perPage:8,
     currentPage:0
    };
    this.handlePageClick= this.handlePageClick.bind(this);
  }
  handlePageClick=(e)=> {
    var selectedPage=e.selected;
    var offset=selectedPage*this.state.perPage;

    this.setState({
      currentPage:selectedPage,
      offset:offset
    },  ()=>{
          this.loadMoreData()
    });
  }
    loadMoreData() {

         var data=this.state.customers;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({
            pageCount:Math.ceil(data.length/this.state.perPage),
            tableData:slice
          })

    }


  

 componentDidMount(){
  this.getAllCustomers();
 }
    

  getAllCustomers=()=>{

    // Make a request for a user with a given ID
        axios.get(`Customers/GetCustomer`)
        .then( (res)=> {
          console.log(res.data);
         
          var data=res.data;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({

            pageCount:Math.ceil(data.length/this.state.perPage),
            customers:res.data,
            tableData:slice
          
          })
        })
        .catch((err)=> {
          console.log(err);
        });
    
  }

  render () {
    const {customers}=this.state;

  return (

<div>
    <AddCustomer customers={this.getAllCustomers}/>
   
    <br/>
    <br/>
    <table span class='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {this.state.tableData.map((cust)=>{
          return(
              <tr key={cust.id} >
                <th >{cust.name}</th>
                <th>{cust.address}</th>
                <th>
                  <EditCustomer customer={cust} customers={this.getAllCustomers}/>
                </th>
                <th>
                  <DeleteCustomer cusid={cust.id} customers={this.getAllCustomers} />
                </th>

              </tr>
          )
        })
        }
    </tbody>

    </table>
    <span>
  <ReactPaginate
    previousLabel={"prev"}
    nextLabel={"next"}
    breakLabel={"..."}
    breakClassName={"break-me"}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={this.handlePageClick}
    containerClassName={"pagination"}
    subContainerClassName={'pages pagination'}
    activeClassName={"active"}
    pageCount={this.state.pageCount}
   />
  </span>
    </div>
  )

  }
}

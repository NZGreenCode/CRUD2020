import React,{useState,Component } from 'react'
import axios from "axios"
import AddSale from './Sal/AddSale'
import EditSale from './Sal/EditSale'
import DeleteSale from './Sal/DeleteSale'
import ReactPaginate from 'react-paginate'
import moment from 'moment'

export class Sale extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 

     loading: true,
     sales:[],
     offset: 0,
     tableData:[],
     perPage:7,
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

         var data=this.state.sales;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({
            pageCount:Math.ceil(data.length/this.state.perPage),
            tableData:slice
          })

    }
  

 componentDidMount(){
  this.getAllSales();
 }
    

  getAllSales=()=>{
// Get whole Sales table
        axios.get(`Sales/GetSales`)
        .then( (res)=> {
          console.log(res.data);

          var data=res.data;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({

            pageCount:Math.ceil(data.length/this.state.perPage),
            sales:res.data,
            tableData:slice
          
          })

        })
        .catch((err)=> {
          console.log(err); 
        });
  }

  render () {
    const {sales}=this.state;
    const m = moment();
 

  return (
  
<div>
    <AddSale  sales={this.getAllSales}/>
   
    <br/>
    <br/>
    <table class='table'>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Store</th>
          <th>Date Sold</th>

          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {this.state.tableData.map((sal)=>{
          return(
              <tr key={sal.id} >
                <th>{sal.customer.name}</th>
                <th>{sal.product.name}</th>
                <th>{sal.store.name}</th>
                <th>{moment(sal.dateSold).format("DD-MM-YYYY")}</th>
                <th>
                  <EditSale sale={sal} sales={this.getAllSales}/>
                </th>
                <th>
                  <DeleteSale salid={sal.id} sales={this.getAllSales}/>
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
  );

  }
}

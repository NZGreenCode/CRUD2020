import React,{useState,Component } from 'react';
import axios from "axios";
import AddProduct from './Pro/AddProduct'
import EditProduct from './Pro/EditProduct'
import DeleteProduct from './Pro/DeleteProduct'
import ReactPaginate from 'react-paginate'


export class Product extends Component {
  constructor(props) {

   super(props);
   this.state = { 

    loading:true,
    offset: 0,
    products:[],
    tableData:[],
    perPage:7,
    currentPage:0

    }

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

         var data=this.state.products;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({
            pageCount:Math.ceil(data.length/this.state.perPage),
            tableData:slice
          })

    }





  componentDidMount(){
    this.getAllProducts();
   }
      

    getAllProducts=()=>{
  
      // Make a request for a user with a given ID
      axios.get(`Products/GetProduct`)
      .then((res)=> {

          var data= res.data;
          var slice= data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({

            pageCount:Math.ceil(data.length/this.state.perPage),
            products:res.data,
            tableData:slice
          
          })


      })
      .catch((err)=> {
        console.log(err);
      });
      
    }

    render () {
      const {products}=this.state;

  return (
  
<div>
    <AddProduct    products={this.getAllProducts}/>
    <br/>
    <br/>
    <table className="table">
      <thead>
        <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
        <th>Action</th>

        </tr>
      </thead>
      <tbody>
          {this.state.tableData.map((pro)=>{
            return(
                <tr key={pro.id}>
                  <th >{pro.name}</th>
                    <th>{ pro.price }</th>
                  <th>
                      <EditProduct product={pro} products={this.getAllProducts}/>
                  </th>
                  <th>
                      <DeleteProduct proid={pro.id} products={this.getAllProducts}/>
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

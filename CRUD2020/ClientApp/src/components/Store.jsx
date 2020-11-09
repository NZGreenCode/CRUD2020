import React,{useState,Component } from 'react'
import axios from "axios"
import AddStore from './Sto/AddStore'
import EditStore from './Sto/EditStore'
import DeleteStore from './Sto/DeleteStore'
import ReactPaginate from 'react-paginate'


export class Store extends Component {
  constructor(props) {
  
   super(props);
   this.state = { 
     loading: true,
     offset: 0,
     tableData:[],
     stores:[],
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

         var data=this.state.stores;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({
            pageCount:Math.ceil(data.length/this.state.perPage),
            tableData:slice
          })

    }
  
 componentDidMount(){
  this.getAllStores();
 }
    

  getAllStores=()=>{

    // Make a request for a user with a given ID
        axios.get(`Stores/GetStore`)
        .then( (res)=> {
          console.log(res.data);

          var data=res.data;

          var slice=data.slice(this.state.offset,this.state.offset + this.state.perPage)
         
          this.setState({

            pageCount:Math.ceil(data.length/this.state.perPage),
            stores:res.data,          
            tableData:slice
          })
        })
        .catch((err)=> {
          console.log(err);
        });
    
  }

  render () {
    const {stores}=this.state;

  return (
  
<div>
    <AddStore  stores={this.getAllStores}/>
   
    <br/>
    <br/>
    <table class='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Action</th>
          <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {this.state.tableData.map((sto)=>{
          return(
              <tr key={sto.id} >
                <th >{sto.name}</th>
                <th>{sto.address}</th>
                <th>
                  <EditStore store={sto} stores={this.getAllStores}/>
                </th>
                <th>
                  <DeleteStore stoid={sto.id} stores={this.getAllStores} />
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

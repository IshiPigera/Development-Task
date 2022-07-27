import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
// import Footer from '../components/Footer/Footer';
import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state={
            tempUsers:[]
        };
    }

    componentDidMount(){
        this.retrieveTempUsers();   
    }

    retrieveTempUsers(){
        axios.get("http://localhost:8080/admin/user/get").then(res=>{
            if(res.data.success){
                this.setState({
                    tempUsers:res.data.existingTempUsers
                });
                console.log(this.state.tempUsers)
            }
        });
    }


       //Search bar
  filterData(tempUsers, searchKey) {
    const result = tempUsers.filter(
      (item) =>
        item.tempUserId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.tempUserId.toUpperCase().includes(searchKey)  //toUpperCase() helps to filter the data using the Uppercase letters.
    );

    this.setState({ tempUsers: result });
  }
  

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8080/admin/user/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingTempUsers, searchKey);
      }
    });
  };

  render() {
    return (
        <div>
            <AdminNavbar/>
            <div className="container"
                    style={{
                    // margin: "40px",
                    // marginLeft: "0px",
                    width: "100%",
                    borderRadius: "0px",
                    marginTop: "0px",
                    background: "#D3D3D3",
                    }}>
               
            <br />
            <div className='card'
                style={{
                    //marginTop:'400px',
                    height:'auto'
                }}
            ><br/>
            <h4
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:'100px',
                marginTop:'20px',
                height:'auto'
              }}
            >
              USER LIST
            </h4>
     
          <ul> 
          <button className='btn btn-success' style={{width:'200px',marginLeft:'500px',marginTop:"46px",backgroundColor:'rgba(35, 84, 137 , 1)',height:'auto'}}><a href='/createUser' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        CREATE A USER
          </a></button>
          <button className='btn btn-success' style={{width:'200px',marginLeft:'500px',marginTop:"46px",backgroundColor:'rgba(35, 84, 137 , 1)',height:'auto'}}><a href='/sendEmail' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        SEND EMAIL TO USERS
          </a></button>
          </ul>
          <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "350px",
                marginLeft: "10px",
                marginTop: "-30px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />
  
          <br/>
          <div className='table-responsive'>
                <table className="table table-hover"
                style={{
                    marginLeft:'0px',
                    backgroundColor: "#ffff",
                    borderRadius: "5px",
                    width: "100%",
                    
                    //border: "none",
                }}>
                    <thead style={{backgroundColor:'rgba(1, 11, 67 )',color:'white'}}>
                        <tr>
                            <th scope="row">#</th>   
                             
                            <th scope="row">EMAIL</th>
                            <th scope="row">TEMP PASSWORD</th>
                            <th scope="row" style={{width:'auto'}}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tempUsers.map((tempUsers,index)=>(
                            <tr>
                                
                                <td>{index+1}</td>
                                <td>{tempUsers.email}</td>
                                <td>{tempUsers.password}</td>
                                <td>
                                   <button  className='btn btn-warning' style={{backgroundColor:'rgb(17, 100, 6)'}}><a href="#" style={{color:'white',textDecoration:'none', fontWeight:'bold'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;UPDATE
                                    </a>
                                    </button><br/>
                                    {/* href={`/edit/submissions/${submissions._id}` */}

                                    {/* <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(submissions._id)} style={{ backgroundColor:'rgb(158, 7, 7)', textDecoration: "none", color: "white" ,marginTop:'5px'}}
                                        >
                                        <i className='fas fa-trash-alt'></i>
                                        &nbsp;REMOVE
                                    </a> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                </div>  
           
        </div>
        <br/></div>
        {/* <Footer/> */}
        </div>

    )
  }
}

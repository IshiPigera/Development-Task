import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state={
            students:[]
        };
    }

    componentDidMount(){
        this.retrieveStudents();   
    }

    retrieveStudents(){
        axios.get("http://localhost:8080/admin/studentRegister/get").then(res=>{
            if(res.data.success){
                this.setState({
                    students:res.data.existingStudents
                });
                console.log(this.state.students)
            }
        });
    }

    onDelete = (id) => {
      if (window.confirm("Do you want to remove this student?")) {
        axios.delete(`http://localhost:8080/admin/studentRegister/delete/${id}`).then((res) => {
          alert("Student removed Successfully!");
          this.retrieveStudents();
        });
      }
    };


       //Search bar
  filterData(students, searchKey) {
    const result = students.filter(
      (item) =>
        item.studentId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.studentId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.studentName.toUpperCase().includes(searchKey) ||
        item.studentName.toUpperCase().includes(searchKey) 
        );

    this.setState({ students: result });
  }
  

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8080/admin/studentRegister/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingStudents, searchKey);
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
     
           
          <button className='btn btn-success' style={{width:'200px',marginLeft:'500px',marginTop:"46px",backgroundColor:'rgba(35, 84, 137 , 1)',height:'auto'}}><a href='/createUser' style={{textDecoration:'none',color:'white', fontWeight:'bold'}}>
                        CREATE A USER
          </a></button>
           
          
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
                            <th scope="row">STUDENT ID</th> 
                            <th scope="row">NAME</th> 
                            <th scope="row">EMAIL</th>
                            <th scope="row">GENDER</th>
                            <th scope="row">STUDENT STATUS</th>
                            <th scope="row" style={{width:'auto'}}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((students,index)=>(
                            <tr>
                                
                                <td>{index+1}</td>
                                <td>{students.studentId}</td>
                                <td>{students.studentName}</td>
                                <td>{students.email}</td>
                                <td>{students.gender}</td>
                                <td>{students.studentStatus}</td>
                                <td>                             

                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(students._id)} style={{ backgroundColor:'rgb(158, 7, 7)', textDecoration: "none", color: "white" ,marginTop:'5px'}}
                                        >
                                        <i className='fas fa-trash-alt'></i>
                                        &nbsp;REMOVE
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                </div>  
           
        </div>
        <br/></div>

        </div>

    )
  }
}

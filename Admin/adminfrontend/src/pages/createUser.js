import React, { Component } from 'react'
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import validator from 'validator'
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Swal from 'sweetalert2'
import emailjs from "emailjs-com";

export default class createUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      tempUsers: [],
      userResponse: false,

      /** */
      errorE1: {},
      errorP1: {}

    }

    this.generateUserPassword = this.generateUserPassword.bind(this);
    this.sendUserData = this.sendUserData.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  //   handleInputSelect=(e)=>{
  //     this.setState({category:e.target.value})
  //     console.log("category",e.target.value)
  // }

  /** */
  formValidation = () => {
    const { email, password } = this.state;
    let isValid = true;
    const errorE1 = {};
    const errorP1 = {};

    //   if(submissionId.trim().length<3){
    //       error["submissionCodeLength"] = "Submission code must be in length 3 or higher";
    //       isValid=false;
    //   }

    //   if(!submissionId.match(/^[A-Z]{1,}[0-9]{3,}$/)){
    //       error["submissionCodePattern"]="Code should include at least 1 uppercase letters and at least 3 numbers";
    //       isValid=false;
    //   }

    if (!email) {
      errorE1["emailInput"] = "email Field is EMPTY!";
      isValid = false;
    }

    //   if(!topic.match(/^[a-z A-Z]*$/)){
    //       errorsN["topicInputPattern"] = "topic must contain characters only!";
    //       isValid=false;
    //   }

    if (!password) {
      errorP1["descriptionInput"] = "password Field is EMPTY!";
      isValid = false;
    }


    this.setState({ errorE1: errorE1, errorP1: errorP1 });
    return isValid;
  }
  /** */

  sendEmail() {
    console.log("data");
    const { email, password } = this.state;
    const data = {
      "link": "http://localhost:3001/",
      "username": email,
      "password": password,
      "email": email
    }

    emailjs.send('service_5dcwjqj', 'template_kxzwprd', data, '5cBXRbMJXvJdnDsz1').then(res => {
      console.log("res", res)
      if(res.status == 200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email Sent',
          showConfirmButton: false,
          timer: 1500
        })

        this.setState(
          {
             email: "",
             password: "",
           
          }
        )
      }
    }).catch((err) => {
      console.log(err)
    })

  }

  sendUserData() {
   
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password
    }

    console.log(data);

    axios.post("http://localhost:8080/admin/studentRegister/post", data).then((res) => {
      console.log("resssss",res)
      if (res.status == 200) {
        alert("User created Successfully!")

        // window.location.href ='/home';
        this.setState(
          {
            // email: "",
            // password: "",
            userResponse: true
          }
        )
      }
    })

  }

  onSubmit = (e) => {
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if (isValid) {


      const { email, password } = this.state;

      //validate email is a valid one
      if (!validator.isEmail(email)) {

        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Email is not a Valid Email Address',
          showConfirmButton: false,
          timer: 1500
        })

        return -1;
      }

      //find user already in the sysytem
      const url = 'http://localhost:8080/admin/user/find';
      const emailData = {
        email: email
      };
      axios.post(url, emailData).then((res) => {
        console.log("res", res);

        if (res.data.tempUser) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'User alredy in the System',
            showConfirmButton: false,
            timer: 1500
          })


        } else {

          this.sendUserData();

        }

      })


    }
  }

  generateUserPassword() {
    const unique_id = uuid();
    const password = unique_id.slice(1, 8)

    this.setState({ password: "temp"+password });
  }


  componentDidMount() {
    this.retrieveTempUsers();
    this.generateUserPassword();
  }

  retrieveTempUsers() {
    axios.get("http://localhost:8080/admin/user/get").then(res => {
      if (res.data.success) {
        this.setState({
          tempUsers: res.data.existingTempUsers
        });
        console.log(this.state.tempUsers)
      }
    });
  }




  render() {
    console.log("meesgaaae", this.state.tempUsers)
    const { errorE1 } = this.state;
    const { errorP1 } = this.state;

    return (

      <>
        <AdminNavbar />
        <div className='container'>

          <div className='card' style={{ marginLeft: '120px', background: "#D3D3D3", height: 'auto', width: '600px', marginRight: '100px' }}>
            <div className='col-md-8 mt-4 mx-auto'>
              <br />


              <h1 className='h3 mb-3 font-weight-normal' style={{ color: 'rgba(6, 21, 117)' }}> CREATE A USER</h1>
              <button className="btn btn-danger" style={{ width: '200px', backgroundColor: 'rgb(9, 38, 68 )' }}>
                <a href="/home" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                  View Users
                </a></button><br /><br />
              <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>EMAIL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  {Object.keys(errorE1).map((key) => {
                    return <div style={{ color: 'red' }} key={key}>{errorE1[key]}</div>
                  })}
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}>PASSWORD</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  {Object.keys(errorP1).map((key) => {
                    return <div style={{ color: 'red' }} key={key}>{errorP1[key]}</div>
                  })}
                </div>


                <button className="btn btn-success" type="submit" style={{ marginTop: '15px', marginBottom: '150px' }} onClick={this.onSubmit}>
                  <i className="far fa-check-square"></i>
                  &nbsp;Save
                </button>

                {this.state.userResponse && <button className="btn btn-success" type="submits" style={{ marginTop: '15px', marginBottom: '150px', marginLeft: "15px" }} onClick={this.sendEmail}>
                  <i className="far fa-check-square"></i>
                  &nbsp;Send Email
                </button>}

                <br />
              </form>

            </div>
          </div>
        </div>

      </>
    )
  }
}

import React from 'react';
import './App.css';
import { Nav, Navbar, NavbarToggler, Collapse, NavItem, Jumbotron,Modal,Input,Label,Button,Col } from 'reactstrap';
import {sample} from './sample';
import Upcoming from './upcoming';
import Tab from './Tab';
import {baseUrl} from './baseUrl';
import Interface from './images/interface.png';
import people from './images/people.png';
import social from './images/social.png';
import axios from 'axios';


class App extends React.Component {
  constructor (props){
    super(props);
    this.state={
      isNavOpen:false,
      newDate:new Date(),
      datas:[],
      selected:'Upcoming',
      search:'',
      Deliver:'Deliver',
      Priority:'Priority',
      Passage:'Passage',
      Announcements:'',
      Date: ''
    }
    this.toggleNav = this.toggleNav.bind(this);
  }
  // componentDidMount(){
  //   fetch(baseUrl+'announcements')
  //     .then(response => response.json())
  //     .then(data => this.setState({datas:data}))
  // }
  setSelected=(tab)=>{
    this.setState({selected:tab});
  }
  changeHandler=(e)=>{
    let dateDay=this.state.newDate.getDate() + "/" + parseInt(this.state.newDate.getMonth()+1) + "/" + this.state.newDate.getFullYear();
    this.setState({[e.target.name]:e.target.value})
    const wht=this.state.datas.map(date=>(date.Date));
    const first=(this.state.datas.map(date=>(date.Date)))
    for(const dat of first){
      console.log(dat)
      if(dat>dateDay){
        console.log('ahhh');
      }
      else{
        console.log('fhfhf')
      }
    }
    console.log(dateDay)

  }
  changeSearch=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  
  clearAll=()=>{
    this.setState({
      selected:'Upcoming',
      search:'',
      Deliver:'Deliver',
      Priority:'Priority',
      Passage:'Passage',
      Announcements:'',
      Date:"",
    })
  }

  submitHandler=e=>{
    e.preventDefault();
    let myForm=e.target;
    console.log(this.state.Announcements)
    if(myForm===''){
      console.log('hello?')
    }
    else{
      let fd=new FormData(myForm);
      console.log(fd)
      for(let key of fd.keys()){
        console.log(key,fd.get(key))
      }
      let json=convertToJson(fd);
      console.log(json);
      function convertToJson(formData){
        let obj ={};
        for(let key of formData.keys()){
            obj[key]=formData.get(key);
        }
        return obj;
    }
    return fetch(baseUrl+'announcements',{
      method:'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        console.log(error);
      }
    },
    error => {
          throw error;
    })
  }
  }
  render(){
    const {Date,Deliver,Priority,Passage,Announcements,search}=this.state
    const filteredSearch=sample.filter((state)=>((state.Passage.toLowerCase()).includes(this.state.search.toLowerCase())||(state.Priority.toLowerCase().includes(this.state.search.toLowerCase()))))
    let dateDay=this.state.newDate.getDate() + "/" + parseInt(this.state.newDate.getMonth()+1) + "/" + this.state.newDate.getFullYear();
    return (
      <div className="all container">
        <form onSubmit={this.submitHandler}>
        <div className="row row-header">
          <div className="announce">
            <p className="bold">ANNOUNCEMENTS</p>
          </div>
          <React.Fragment>
            <Navbar dark expand="md">
              <div className="container">
                <NavbarToggler onClick={this.toggleNav}/>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                      <Nav navbar>
                        <div className="second-header ml-3">
                          <img src={people} alt="people.png"/>
                          <div className="owner">
                            <p>Marina<br/><span>Super Administrator</span></p>
                          </div>
                          <p>Account Settings</p>
                          <img src={Interface} alt="interface.png"/>
                        </div>
                      </Nav>
                    </Collapse>
              </div>
            </Navbar>
          </React.Fragment>
          <div className="col-12 ml-3">
            <Label htmlFor="announcements">Add a new announcements</Label>
          </div>
          <Col md={{size:15}} className="col-sm-12">
            <Input type="textarea" rows="8" id="announcements" 
            name="Announcements" 
            value={Announcements} onChange={this.changeHandler}/>
          </Col>
        </div>
        <div className="row row-content form-details">
            <div className="col-sm-5 col-md-3 col-12 mt-1">
              <Input type="date" placeholder="Select a date" onChange={this.changeHandler} value={Date} name="Date"/>
            </div>
            <div className="col-sm-5 col-md-3 col-12 mt-1">
              <select className="form-control" onChange={this.changeHandler} value={Passage} name="Passage">
              <option disabled selected>Passage</option>
                <option value="Email">Email</option>
                <option value="SMS">Sms</option>
                <option value="Email + SMS">Email and Sms</option>
              </select>
            </div>
            <Col md={{size:3}} className="mt-1 col-12 col-md-2 col-sm-5">
              <select className="form-control" onChange={this.changeHandler} value={Deliver} name="Deliver">
                <option disabled selected>Deliver</option>
                <option value="School Level">School Wide</option>
                <option value="Grade Level">Grade Level</option>
                <option value="Classroom">Classroom</option>
                <option value="CourseWide">CourseWide</option>
              </select>
            </Col>
            <div className="col-md-3 col-sm-5 mt-1">
              <select className="form-control" onChange={this.changeHandler} value={Priority} name="Priority">
              <option disabled selected>Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <div className="button mt-1">
              <Button color="secondary"  type="submit" className="fa fa-plus-circle btn-lg ml-3" onClick={this.clearAll}> Add Announcements</Button>
            </div>
        </div>
        </form>
        <div className="upcoming">
          <Upcoming tabs={['Upcoming','Past']} selected={this.state.selected} setSelected={this.setSelected}>
            <Tab isSelected={this.state.selected==='Upcoming'}>
            <div className="container">
                  <div className="col-12 col-sm-12 input">
                      <i className="fa fa-search" ></i>
                      <Input type="text" id="input" placeholder="Search for an announcements" name="search" value={search} 
                      onChange={this.changeSearch}/>
                  </div>
                  <div className="announcement">
                      {
                          filteredSearch.map(id=>
                          <div className='row content each-announcement'> 
                              <div className='col-12 col-sm-3 starts'>
                                  <p className={`pills bold ${id.Priority || ""}`}>{id.Priority}</p>
                                  <p>{id.Passage}</p>
                              </div>
                              <div className="col-sm-6 col-12">
                                  <p>Vestibulum</p>
                                  <p>{id.Announcements}</p>
                                  <p>{id.Date}</p>
                              </div>
                              <div className="col-sm-1 ml-3 edit col-5">
                              <i className="fa fa-edit"></i>
                              </div>
                              <div className="col-sm-1 ml-3 delete col-5">
                                <i className="fa fa-trash-o"></i>
                              </div>
                      </div>)}
                  </div>
            </div>
            </Tab>
            <Tab isSelected={this.state.selected==='Past'}>
            <div className="container">

            </div>
            </Tab>
          </Upcoming>
        </div>
      </div>
    );
  }
}

export default App;

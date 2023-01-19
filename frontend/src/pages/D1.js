import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './d1.css'
import React, {useState } from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
function Page1() {
    const [Name,setName] = useState('');
    const [Con,setCon] = useState('');
    const [Loc,setLoc] = useState('');
    const [State, setState] = useState([]);
    const formik = useFormik({
        initialValues: {
          
        },
        onSubmit: (values) => {
          console.log(values);
          let form_data=new FormData()
          form_data.append("Name",Name)
          console.log(Name)
          form_data.append("Location",Loc)
          form_data.append("Contact",Con)
          const d=form_data 
          console.log(d)
  
                            axios({
                                method: 'post',
                                url: 'http://127.0.0.1:5000/api/save',
                                data: form_data,
                                headers:{"Content-Type":"application/json"}
                            }).then((response) => {
                                console.log(response);
                            console.log("success");
                            }, (error) => {
                                console.log("error");
                            });
        },
      });

  const viewdata=()=>{
              console.log('yes')
          //     fetch('http://localhost:5000/api/view')
          // .then((response) => response.json())
          // // .then((a) => console.log(a))
          // .then((a) => setData(a))
          // .catch((err) => {
          // console.log(err.message);
          
          // });
          axios.get('http://localhost:5000/api/view')
        .then(response => {
        const posts =Object.values(response.data)  
        const a=posts[0]        
          setState(Object.values(a))
          console.log(State)
          console.log(typeof(State))
  })
  }
  
  return (
    <>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='n1'>Name</Form.Label>
        <Form.Control 
                type="text"   
                name='name'
                placeholder='enter your name'
                onChange={(e)=>{
                  setName(e.target.value)
                }}
                value={Name} />
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contact</Form.Label>
        <Form.Control 
                 type="number" 
                 name='contact'
                 placeholder="contact details"   
                 onChange={(e)=>{
                 setCon(e.target.value)
               }}
               value={Con} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="FormBasicPassword">
        <Form.Label>Location</Form.Label>
        <Form.Control 
                 type="text" 
                 name='location'  
                 onChange={(e)=>{
                 setLoc(e.target.value)
               }}
               value={Loc} 
               placeholder="Add your location" />
      </Form.Group>
      <Form.Text className="text-muted">
         Deliverly location
        </Form.Text> <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      
    </Form>
    <Button onClick={viewdata} variant="outline-secondary">view</Button>{' '}
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Location</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
      {/* {State.posts.map (post =>  {post.title} )} */}
      {/* {console.log(State[0])}  */}
      {
  (State!== null) ? 
  State.map((item,index)=>{return (
    
   <tr key={index} className="">
          <td>{item.Id}</td>
          <td>{item.Name}</td>
          <td>{item.Location}</td>
          <td>{item.Contact}</td>
        
        </tr>
   
    
  
  )}) 
  :"no one started"
  } 

        
      </tbody>
    </Table>
    </>
  );
}

export default Page1;
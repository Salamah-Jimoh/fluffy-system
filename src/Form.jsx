import React from 'react'
import { useState } from 'react'
const Form = () => {
const [name, setName] = useState('');
const [message, setMessage] = useState('');
const [email, setEmail] = useState('');
const [subject, setSubject] = useState('');
const [errorEmailMessage, setErrorEmailMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [sucessMessage, setSucessMessage] = useState('');
const handleSubmit = (e)=>{
     e.preventDefault();
    if(!email.match(/\S+@\S+\.\S+/)){
        setErrorEmailMessage('Pls enter a valid email address')
     }
e.target.value = '';
     const formData ={
        name:name,
        email:email,
        subject:subject,
        message:message,
     }
    const jsonData = JSON.stringify(formData);
    fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
        method:'Post',
        headers:{'Content-Type':'application/json'},
        body:jsonData
    })
    .then(res =>{
        if (res.ok){
            setSucessMessage('Data sent successfully');
               //clear input fields
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } else{
           setErrorMessage('Error sending data')
        }
    })
    .catch(error =>{
        setErrorMessage(`Error Sending Data: ${error.message}`)
    })



}
  return (
    <section className='form'>
      <h3>SUBMIT A REQUEST</h3>
      <form onSubmit={handleSubmit}>
        <div className="alerts">
        {errorMessage &&  <p className='error'>{errorMessage}</p>}
        {sucessMessage &&  <p className='sucess'>{sucessMessage}</p>}
        </div>
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          placeholder='Your Full Name'
          name="name"
          value={name}
          onChange={e=>
        setName(e.target.value)}
         required /> 
         </div>
<div className="form-group">
    <label htmlFor="email">E-mail</label>
    {errorEmailMessage &&  <p className='error'>{errorEmailMessage}</p>}
        <input type="text"
        placeholder='Enter your Email adress'
         name="email"
         value={email}
         onChange={e=>
       setEmail(e.target.value)}
        required />
        </div>
        <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input type="text"
        placeholder='Enter your subject'
         name="subject"
         value={subject}
         onChange={e=>
       setSubject(e.target.value)}
     />
     </div>
     <div
      className="form-group">
        <label htmlFor="message">Your Message</label>
        <input type="text"
        className='message'
        placeholder='Type your message...'
         name="message"
         value={message}
         onChange={e=>
       setMessage(e.target.value)}
       required />
       </div>
    <button type="submit"> Submit Request</button>
      </form>
    </section>
  )
}

export default Form

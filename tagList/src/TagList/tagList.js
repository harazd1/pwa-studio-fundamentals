import React, { useState } from 'react';

const TagList = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check for errors in the response
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('An error occurred. Please try again.');
      });
  };
  
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
  };



  const inputStyles = {
    width: '400px',
    height: '50px',
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const buttonStyles = {
    width: '150px',
    height: '40px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'absolute',
    right: '5px',
    top: '5px',
  };

  const formStyles ={
    position: 'relative'
  }

  const messageStyles = {
    fontSize: '16px',
    marginTop: '10px',
    textAlign: 'center',
  };

 return (
    <div style={containerStyles}>
      <form onSubmit={handleSubmit} className='subscribeForm' style={formStyles}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>
          Subscribe
        </button>
      </form>
      <div style={messageStyles}>{message}</div>
    </div>
  );
};

export default TagList;

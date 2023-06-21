import axios from "axios";
import { useState, useEffect } from 'react';
import TopBar from "../../components/topBar/TopBar";
// import Select from 'react-select';
// import PhoneInput from 'react-phone-number-input';
import {useNavigate } from "react-router-dom";
import './register.css';

function Registration() {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate()


//   const [countryOptions, setCountryOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [phoneCountryCode, setPhoneCountryCode] = useState('+234');

//   useEffect(() => {
//     // Fetch the list of countries from an API or a local data source
//     const fetchCountryOptions = async () => {
//       try {
//         const response = await fetch('https://api.your-countries-api.com');
//         const data = await response.json();
//         setCountryOptions(data);
//       } catch (error) {
//         console.log('Error fetching countries:', error);
//       }
//     };

//     fetchCountryOptions();
//   }, []);

//   useEffect(() => {
//     const data = [{value:"Berlin", label:"Berlin"},{value:"Madrid", label:"Madrid"},{value:"London", label:"London"}]
//     setCountryOptions(data);
//   }, [{formData}])

//   const handleCountryChange = (selectedOption) => {
//     setFormData({ ...formData, country: selectedOption.value });

//     set city options
    
//   };
//   const handleCityChange = (selectedOption) => {
//     setFormData({ ...formData, city: selectedOption.value });
//   };
  

  const handleChange = (e) => {
    const {name,value} = e.target
    
    if (name === 'username' || name === 'email' || name === 'password') {
        setFormData({ ...formData, [name]: value.toLowerCase()});
    } 
    // if (name === 'country') {
    //   // Fetch the list of cities based on the selected country
    //   const fetchCityOptions = async () => {
    //     try {
    //       const response = await fetch(`https://api.your-cities-api.com/${selectedOption.value}`);
    //       const data = await response.json();
    //       setCityOptions(data);
    //       const countryCode = selectedOption.code; // Replace with the correct code
    //       setPhoneCountryCode(countryCode);
    //     } catch (error) {
    //       console.log('Error fetching cities:', error);
    //     }
    //   };

    //   fetchCityOptions();
    // }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.email || !formData.username || !formData.password){
        return 
    }

     // Check email format only when submitting the form
    if (formData.email && !formData.email.toLowerCase().endsWith('@gmail.com')) {
        console.log('Email must be a valid Gmail address');
        return setError(true);
    }

    // Perform registration logic here, e.g., send data to the server
    try {
        const res = await axios.post("/auth/register", formData);
    } catch (err) {
        return
    }
    setFormData({username: '',email: '',password: ''})
    setError(false)
    navigate("/login");
  };

  return (
    <div>
        <TopBar />
        <div className="register">
      <h2>Registration</h2>
      <form className="regForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          name="email"
          placeholder="Email.gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="rInput"
        />
        {/* <Select
          name="country"
          value={countryOptions.find((option) => option.value === formData.country )}
          options={countryOptions}
          onChange={handleCountryChange}
          placeholder="Select Country"
        />
        <Select
          name="city"
          value={cityOptions.find((option) => option.value === formData.city)}
          options={cityOptions}
          onChange={handleChange}
          placeholder="Select City"
        />
          <PhoneInput
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          defaultCountry={phoneCountryCode} // Set the default country code dynamically
        /> */}
        <button className="rButton" type="submit" onClick={handleSubmit}>Register</button>
      </form>
      {error && <span style={{color: "red"}}>{'Email must be a valid Gmail address'}</span>}
    </div>
    </div>
    
  );
}

export default Registration;
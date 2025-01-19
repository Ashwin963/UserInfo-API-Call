import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Typography, Button, Box} from "@mui/material";
import '../src/userdetails.css';

function Userdetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = location.state; // Access userId passed via state
    const [userDetails, setUserDetails] = useState(null);

    useEffect(()=>{
        setUserDetails(userId)

    })
   

    // Handle Go Back button click
    const handleGoBack = () => {
        navigate("/"); // Navigate back to home
    };

  
    return (
        <Container className="container">
  <Box className="user-details-box">
    
      <Typography variant="h4" component="h2" gutterBottom>
        User Details
      </Typography>

      <Box className="details-list">
        <Box className="detail-item">
          <Typography variant="h5">Name</Typography>
          <Typography variant="h6"><i className="bi bi-person" style={{ fontSize: '20px', color: 'black',padding:'10px'}}></i>{userDetails?.name}</Typography>
        </Box>

        <Box className="detail-item">
          <Typography variant="h5">Email</Typography>
          <Typography variant="h6"><i className="bi bi-envelope" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{userDetails?.email}</Typography>
        </Box>

        <Box className="detail-item">
          <Typography variant="h5">Phone</Typography>
          <Typography variant="h6"><i className="bi bi-telephone" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{userDetails?.phone}</Typography>
        </Box>

        <Box className="detail-item">
          <Typography variant="h5">Company</Typography>
          <Typography variant="h6"><i className="bi bi-building" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{userDetails?.company?.name}</Typography>
        </Box>

        <Box className="detail-item">
          <Typography variant="h5">Website</Typography>
          <Typography variant="h6"><i className="bi bi-globe" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{userDetails?.website}</Typography>
        </Box>
      </Box>
   

    <Button
      variant="contained"
      color="primary"
      onClick={handleGoBack}
      className="go-back-button"
    >
      Go Back
    </Button>
  </Box>
</Container>

    );
}

export default Userdetail;

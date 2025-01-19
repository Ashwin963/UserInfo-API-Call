import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, TextField, Select, MenuItem, Box ,CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/style.css'


function Homepage() {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [Loading,setLoading]=useState()

    const navigate = useNavigate();

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUserData(res.data);
            setLoading(false)
            setFilteredData(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredData(
            userData.filter((user) => user.name.toLowerCase().includes(value))
        );
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedData = [...filteredData].sort((a, b) => {
            if (order === "asc") return a.name.localeCompare(b.name);
            if (order === "desc") return b.name.localeCompare(a.name);
            return 0;
        });
        setFilteredData(sortedData);
    };

    const handleUserClick = (user) => {
        navigate(`/userdetail`, { state: { userId: user } });
    };

    if (!filteredData) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="h6">Loading...</Typography>
            <CircularProgress size={20}/>
            </Box>
        );
    }

    return (
        <Container className="container">
            <Typography variant="h4" component="h1" gutterBottom display="flex" justifyContent="center" alignItems="center">
                   All USERS DETAILS
            </Typography>

            <div className="search-sort-container">
                <TextField
                label="Search by name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
                />
                <Select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                displayEmpty
                className="sort-dropdown"
                >
                <MenuItem value="" disabled>
                    Sort by
                </MenuItem>
                <MenuItem value="asc">Name (A-Z)</MenuItem>
                <MenuItem value="desc">Name (Z-A)</MenuItem>
                </Select>
            </div>
            {(Loading) && (
      <Box display="flex" margin="100px" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading...</Typography>
        <CircularProgress size={20} />
      </Box>
    )}

          

            <Box className="user-grid">
          
                {filteredData?.map((user) => (
                <Box key={user.id} className="user-card" onClick={() => handleUserClick(user)} boxShadow={10}>
                    <Typography variant="h6"><i className="bi bi-person" style={{ fontSize: '20px', color: 'black' ,padding:'10px'}}></i>{user?.name}</Typography>
                    <Typography variant="body1"><i className="bi bi-envelope" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{user?.email}</Typography>
                    <Typography variant="body2"><i className="bi bi-geo-alt" style={{ fontSize: '20px', color: 'black',padding:'10px' }}></i>{user?.address?.city}</Typography>
                </Box>
                ))}
            </Box>
        </Container>
    );
}
export default Homepage;

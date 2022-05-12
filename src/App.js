import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },  
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://techd.s3.amazonaws.com/restaurant-data.json"
      );
      const restros = data.data.restaurants
            
      setProduct(restros);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App heading">
      <h1>The One Restros</h1>
      <input
        type="text"
        className="input-filter"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">S.No</StyledTableCell>
              <StyledTableCell align="left">Restraunt Name</StyledTableCell>
              <StyledTableCell align="left">Neighborhood</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Cuisine</StyledTableCell>
              <StyledTableCell align="left">Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {                
                if (search == "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.neighborhood.toLowerCase().includes(search.toLowerCase()) 
                  
                ){
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                     <StyledTableCell component="th" scope="row">
                      {item.id}                      
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.name}                      
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.neighborhood}                      
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {item.address}
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {item.cuisine_type}
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {item.reviews.map(data => data.rating)}                      
                    </StyledTableCell>
                    
                    
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;

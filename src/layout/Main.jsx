import React , {Component} from 'react';
import Header from '../layout/Header';
import MainPage from '../layout/MainPage';
import Footer from '../layout/Footer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import { BrowserRouter } from 'react-router-dom';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      path: '/',
    };
  }

  render(){
    return (
        <div>
          {/* <CssBaseline />
          <Container maxWidth="sm">
          <Typography component="div" style={{height: '100vh' , align:'center'}}> */}
            <BrowserRouter>
              <Header />
              <MainPage />
              <Footer />
            </BrowserRouter>
            {/* </Typography>
          </Container> */}
        </div>
    )
  }
}

export default Main;
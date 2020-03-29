import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SignInForm from '../members/SignInForm';
import SignUpForm from '../members/SignUpForm';
import Menu from './Menu';
import Button from '@material-ui/core/Button';
import { API } from '../api/Call_API';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      width: "100%",
    },
    menu: {
      marginTop: 15,
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      marginLeft: 18,
      marginRight: 18
    },
    progress: {
      margin: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1,
    },
    tableHead: {
      fontSize: '1.0rem'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    }
  });

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchKeyword: '',
            menu: '',
            isLogin: window.sessionStorage.getItem('isLogin'),
            loggedInUserEmail : window.sessionStorage.getItem('loggedInUserEmail')
        }
    }

    callLogin = () => {
      this.setState({
        isLogin : window.sessionStorage.getItem('isLogin'),
        loggedInUserEmail : window.sessionStorage.getItem('loggedInUserEmail')
      });
      window.location.reload();
    }
    

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickLogout = () => {
        API.LOGOUT()
        .then((response) => {
          console.log(response);
          window.sessionStorage.removeItem('isLogin');
          window.sessionStorage.removeItem('loggedInUserEmail');
          window.location.reload();
        }).catch((response) => {
          console.log(response);
        })
    }

    render(){
        const {classes} = this.props;
        let renderSignButton = null;
        let {isLogin} = this.state;
        if(isLogin){
          renderSignButton =  <>
                                &nbsp;&nbsp;
                                <Button 
                                  variant="contained" 
                                  color="default" 
                                  onClick={this.handleClickLogout}
                                >
                                  로그아웃
                                </Button>
                              </>;
        }else{
          renderSignButton = <>
                                &nbsp;&nbsp;&nbsp;
                                <SignInForm callLogin={this.callLogin}/>
                                &nbsp;&nbsp;
                                <SignUpForm />
                             </>;
        }
        return (
            <div className={classes.root}>
                <AppBar position='static'>
                      <div>
                        <Toolbar>
                            <Menu />
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                               <a href="/">
                                <font color="white">
                                  Drogba`s  &nbsp;&nbsp; IT Blog
                                </font>
                               </a>
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.search} >
                            <div className={classes.searchIcon} >
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="검색하기"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                            />
                            </div>
                            {renderSignButton}
                        </Toolbar>
                      </div>    
                    </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);


import React , {Component} from 'react';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
      width: "100%",
      // minWidth: 1080,
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

class CustomerMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            customers: '',
            completed: 0,
            searchKeyword: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

        stateRefresh(){
            this.setState({
              customers: '',
              completed: 0,
              searchKeyword: ''
            });
            this.callApi()          
              .then(res => this.setState({customers: res})) 
              .catch(err => console.log(err));
        }

        handleValueChange = (e) => {
            let nextState = {};
            nextState[e.target.name] = e.target.value;
            this.setState(nextState);
          }
          
          handeSlideMenu = (e) => {
            console.log('메뉴리스트');
          }
        
          componentDidMount() {
            this.timer = setInterval(this.progress, 20);
             this.callApi()
              .then(res => this.setState({customers: res}))
              .catch(err => console.log(err));
          }
        
          componentWillMount = () => {
            clearInterval(this.timer);
          }
            
          callApi = async() => {
             const response = await fetch('/dr/customer/customers');
             const body = await response.json();
             return body;
          }
        
          progress = () => {
            const {completed} = this.state;
            this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
        };

        render(){
            const filteredComponents = (data) => {
                data = data.filter((c) => {
                    return c.name.indexOf(this.state.searchKeyword) > -1;
                });
                return data.map((c) => {
                    return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
                });
            };
            const {classes} = this.props;
            const cellList = [
              {id:1 , field:"번호"} , 
              {id:2 , field:"프로필 이미지"} , 
              {id:3 , field:"이름"} , 
              {id:4 , field:"생년월일"} , 
              {id:5 , field:"성별"} , 
              {id:6 , field:"직업"} , 
              {id:7 , field:"설정"}
            ];
            return(
                <div className={classes.root}>
                    <div className={classes.menu}>
                        <CustomerAdd stateRefresh={this.stateRefresh} />
                    </div>
                    <Paper className={classes.paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {cellList.map(c => {
                                    return <TableCell className={classes.tableHead} key={c.id}>{c.field}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.customers ?
                                    filteredComponents(this.state.customers) : 
                                <TableRow>
                                    <TableCell colSpan="6" align="center">
                                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                                    </TableCell>
                                </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        }
}

export default withStyles(styles)(CustomerMain);
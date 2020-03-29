import React , {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import {API} from '../api/Call_API';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '200px',
        },
      },
      textField:{
        width: '50%',
      },
      progress: {
        margin: theme.spacing.unit * 2
      },

});

class BoardWrite extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            userEmail: '',
            content: '',
            image : '',
            boardType: '02',
            completed: 0,
        }
    }

    componentDidMount = () => {
        clearInterval(this.timer);
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleBoardWrite = () => {
        this.timer = setInterval(this.progress, 20);
        const data = {};
        data.title = this.state.title;
        data.userEmail = window.sessionStorage.loggedInUserEmail;
        data.content = this.state.content;
        data.image = this.state.image;
        data.boardType = this.state.boardType;
        this.callBoardInsert(data)
        .then(res => {
            console.log(res);
            this.setState({
                completed: 1
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    callBoardInsert = async(data) => {
        const response = await API.BoardInsert(data);
        console.log(response);
        console.log(response.data);
        return response;
    }

    progress = () => {
        const {completed} = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }

    render(){
        const { classes } = this.props;
        return (
            <div classes={classes.root}>
                <CssBaseline />
                <Container maxWidth="md">
                <Typography component="div" style={{ backgroundColor: '#F6F6F6' , minHeight:'100%' , fontSize: '15px' , textAlign: 'left'}}>
                    {/* {window.sessionStorage.isLogin ?  */}
                        <div>
                            <div>
                                제목 : <TextField className={classes.textField} label="title"  name="title" variant="outlined" onChange={this.handleValueChange}/> <br/>
                                작성자 : {window.sessionStorage.loggedInUserEmail}<br/>
                                <br /><br />
                                <Divider />
                                내용 : <TextField className={classes.textField} label="content" name="content" variant="outlined" onChange={this.handleValueChange}/> <br/> 
                                <br /><br />
                            </div>
                            {/* <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} /> */}
                            <Button variant="contained" color="primary" onClick={this.handleBoardWrite}>작성</Button> 
                            <Divider />
                        </div> 
                        {/* : <Redirect to='/login' /> } */}
                </Typography>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(BoardWrite);

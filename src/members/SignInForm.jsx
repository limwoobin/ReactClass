import React , {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Func } from '../common/common';
import { API } from '../api/Call_API';

// const styles = theme => ({
//     hidden: {
//         display: 'none'
//     },
// });

class SignInForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail : '',
            userPwd : '',
            open : false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            userEmail : '',
            userPwd : ''
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleFormSubmit();
        }
    }

    handleFormSubmit = (e) => {
        let emailCheck = Func.setVerifyEmail(this.state.userEmail);
        if(emailCheck === 'FAIL') return;
        if(this.state.userPwd === null){
            alert('Please Input in your password');
            return;
        }   
        this._Login()
        .then((response) => {
            console.log(response.data.code);
            if(response.data.code === 'DR00'){
                console.log('Login Success');
                this.props.callLogin();
                window.sessionStorage.isLogin = true;
                window.sessionStorage.loggedInUserEmail = this.state.userEmail;
            }

            this.setState({
                open: false,
                userEmail : '',
                userPwd : ''
            })
        })
        .catch((response) => {
            console.log(response);
        });
    }

    _Login = () => {
        const formData = new FormData();
        formData.append('userEmail' , this.state.userEmail);
        formData.append('userPwd' , this.state.userPwd);
        return API.LOGIN(formData);
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="default" onClick={this.handleClickOpen}>
                    로그인
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <TextField autoFocus margin="dense" id="userEmail" name="userEmail" value={this.state.userEmail} label="Email Address" type="email" onChange={this.handleValueChange} fullWidth />
                        <TextField autoFocus margin="dense" id="userPwd" name="userPwd" value={this.state.userPwd} label="password" type="password" onChange={this.handleValueChange} onKeyPress={this.handleKeyPress} fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleFormSubmit} color="primary">
                            Sign In
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default SignInForm;
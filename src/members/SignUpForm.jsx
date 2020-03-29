import React , {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateForm from '../common/component/DateForm';
import {withStyles} from '@material-ui/core/styles';
import {Func} from '../common/common';
import {API} from '../api/Call_API';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    button: {
        margin: theme.spacing(1),
      },
});

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            userEmail : '',
            userPwd : '',
            userPwdChk : '',
            userNm : '',
            userPhone : '',
            birthday: null,
            userEmailStatus: 0,
        }
    }

    handleMailAvailableCheck = (e) => {
        e.preventDefault();
        let emailCheck = Func.setVerifyEmail(this.state.userEmail);
        if(emailCheck === 'FAIL') return;
        console.log(this.state.userEmailStatus);
        this._userEmailChk()
        .then(response => {
            let res = response.data;
            console.log(res);
            if(res.code === 'DR00'){
                this.setState({
                    userEmailStatus: 2
                });
            }else{
                this.setState({
                    userEmailStatus: 0
                })
                alert('Alerdy exists email');
            }
        })
        .catch(response => {
            console.log(response);
        });
    }

    _userEmailChk = () => {
       return API.USER_EMAIL_CHK(this.state.userEmail);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.userEmailStatus === 0){
            alert('Email is Not Available');
            return;
        }else if((this.state.userPwd !== this.state.userPwdChk) && (this.state.userPwd !== '' || this.state.userPwd !== null)){
            alert('Password does not Match');
            return;
        }else if(!this.state.userNm){
            alert('Please Input in your name');
            return;
        }else if(!this.state.userPhone){
            alert('Please Check in your phone number');
            return;
        }else if(!this.state.birthday){
            alert('Please select a birthday');
            return;
        }
        this._addMemberInfo()
        .then((response) => {
            console.log(response.data.code);
            if(response.data.code === 'DR00'){
                alert('You have successfully registered');
            }
        });

        this.setState({
            open: false,
        });
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
            userPwd : '',
            userPwdChk : '',
            userNm : '',
            userPhone : '',
            birthday: null,
            userEmailStatus: 0,
        });
    }

    verifyEmail = (email) => {
        let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(email.match(regExp) == null || email === null || email === ''){
            alert('Please check your email'); 
            return 'FAIL';
        }else{
            this.setState({
                userEmailStatus: 1
            });
            return 'SUCCESS';
        }
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    birthdayCallback = (callBackDate) => {
        this.setState({
            birthday: callBackDate,
        })
    }

    _addMemberInfo = () => {
        const formData = new FormData();
        formData.append('userEmail' , this.state.userEmail);
        formData.append('userPwd' , this.state.userPwd);
        formData.append('birthday' , this.state.birthday);
        formData.append('userNm' , this.state.userNm);
        formData.append('userPhone' , this.state.userPhone);
        return API.ADD_Member(formData);
    }

    render(){
        // const { classes } = this.props;
        const {userEmailStatus} = this.state;
        let emailAvailableCheckButton = null;
        if(userEmailStatus === 0){
            emailAvailableCheckButton =  <Button variant="outlined" color="primary" onClick={this.handleMailAvailableCheck}>Check for duplicate email</Button>
        }else{
            emailAvailableCheckButton =  <Button variant="outlined" disabled>Email is Available</Button>
        }

        let emailInputType = null;
        if(userEmailStatus === 0){
            emailInputType = <TextField autoFocus margin="dense" id="userEmail" name="userEmail" value={this.state.userEmail} label="Email Address" type="email" onChange={this.handleValueChange} fullWidth />
        }else{
            emailInputType = <TextField autoFocus margin="dense" disabled id="userEmail" name="userEmail" value={this.state.userEmail} label="Email Address" type="email" onChange={this.handleValueChange} fullWidth />
        }
        return(
            <div>
                <Button variant="contained" color="default" onClick={this.handleClickOpen}>
                    회원가입
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            {emailInputType}
                            {emailAvailableCheckButton}&nbsp;&nbsp;&nbsp;
                            <TextField autoFocus margin="dense" id="userPwd" name="userPwd" value={this.state.userPwd} label="password" type="password" onChange={this.handleValueChange} fullWidth />
                            <TextField autoFocus margin="dense" id="userPwdChk" name="userPwdChk" value={this.state.userPwdChk} label="password check" type="password" onChange={this.handleValueChange} fullWidth />
                            <TextField autoFocus margin="dense" id="userNm" name="userNm" value={this.state.userNm} label="name" type="text" onChange={this.handleValueChange} fullWidth />
                            <TextField autoFocus margin="dense" id="userPhone" name="userPhone" value={this.state.userPhone} label="Phone number" type="text" placeholder="ex)010-0000-0000" onChange={this.handleValueChange} fullWidth />
                            <DateForm callBackData={this.birthdayCallback}/>
                        </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      
                    <Button onClick={this.handleFormSubmit} color="primary">
                        Sign Up
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(SignUpForm);
// export default SignUpForm;
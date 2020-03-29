import React , {Component} from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

class DateForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            date : new Date(),
        }
    }

    handleDate = changeDate => {
        this.setState({
            date: this.dateConvert(changeDate)
        });
        this.props.callBackData(this.dateConvert(changeDate));
    }

    dateConvert = (changeDate) => {
        let year = changeDate.getFullYear();
        let month = changeDate.getMonth() + 1;
        let day = changeDate.getDate();
        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;
        changeDate = year + '/' + month + '/' + day;
        return changeDate;
    }   

    render(){
        return(
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="birthday"
                            format="yyyy/MM/dd"
                            value={this.state.date}
                            onChange={this.handleDate}
                            KeyboardButtonProps={{ 'aria-label': 'change date' }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default DateForm;
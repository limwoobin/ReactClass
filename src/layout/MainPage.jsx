import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { 
            CustomerMain
           ,Profile
           ,Notice
           ,Map
           ,Think
           ,BoardRouter
           ,LoginView
        } 
        from '../pages/page';

const styles = theme => ({
    root: {
        width: "100%",
        minHeight: 200,
    }
});

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
              <Route exact path = "/" component={CustomerMain} />
              <Route path = "/ctg/profile" component={Profile} />
              <Route path = "/ctg/notice" component={Notice} />
              <Route path = "/ctg/think" component={Think} />
              <Route path = "/ctg/board" component={BoardRouter} />
              <Route path = "/ctg/map" component={Map} />
              <Route path = "/login" component={LoginView} />
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);
import React , {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import {Func} from '../common/common';

const styles = theme => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            left: false,
            menuitems: [],
        }
    }
    
    UNSAFE_componentWillMount = () => {
      setInterval(20);
      this.GetMenuItems()
        .then(res => {
          this.setState({
            menuitems: res,
          })
        })
        .catch(err => console.log(err));
    }

    GetMenuItems = async() => {
      const response = await fetch('/dr/category/list');
      const body = await response.json();
      return body.data;
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        this.setState({[side]: open });
      };

    divStyle = {
        list: {
            width: 270,
        },
        menuHead: {
            height: 50,

        }
    }

    render(){

      const openSide = side => (
        <div
          role="presentation"
          onClick={this.toggleDrawer(side, false)}
          onKeyDown={this.toggleDrawer(side, false)}
          style={this.divStyle.list}
        >
          {menuList(this.state.menuitems)}
        </div>
      );

    const menuList = (menuitems) => {
      return <div>
              <List>
                <Divider />
                  {menuitems.sort(Func.Compare('id')).map((c) => (
                  <Link to={`/ctg/${c.routerName}`} key={c.id}>
                    <ListItem 
                      button key={c.name}
                    >
                      <ListItemText primary={c.name}/>
                    </ListItem>
                  </Link>
                ))}
                <Divider />
              </List>
            </div>
    };      
        const {classes} = this.props;
        return(
            <div>
                <IconButton 
                    className={classes.menuButton} 
                    color='inherit' 
                    aria-label="Open drawer"
                    onClick={this.toggleDrawer('left', true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    {openSide('left')}
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(Menu);
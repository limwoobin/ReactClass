import React , { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Board from './Board';
import {API} from '../api/Call_API';


const styles = theme => ({
    table: {
        minWidth: 700,
        width: "80%",
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop: 'auto',
      },
      progress: {
        margin: theme.spacing.unit * 2
      },
      addBtn: {
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'left'
      },
})
  

class BoardList extends Component{
    constructor(props){
        super(props);
        this.state = {
              boards : [],
              searchKeyword: '',
              completed: 0,
        }
    }

    componentDidMount = () => {
        this.timer = setInterval(this.progress, 20);
        API.GET_BoardList()
        .then((res) => {
            console.log(res.data.data);
            this.setState({
                boards: res.data.data
            })
        }).catch((err) => {

        })
    }

    componentWillMount = () => {
        clearInterval(this.timer);
      }

    progress = () => {
        const {completed} = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }
 
    render(){
        const boards = (data) => {
            return data.map((c) => {
                return <Board
                            key={c._id}
                            _id={c._id}
                            boardId={c.boardId}
                            userEmail={c.userEmail} 
                            boardType={c.boardType} 
                            title={c.title}
                            content={c.content}
                            regDate={c.regDate}
                            views={c.views}
                        />
            })
        };

        const {classes} = this.props;
        return(
            <div className={classes.table}>
                <div className={classes.addBtn}>
                <Link to="/ctg/board/write">
                    <Button variant="contained" color="primary">추가</Button>
                </Link>
                </div>
                <br />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">작성자</TableCell>
                                <TableCell align="left">제목</TableCell>
                                <TableCell align="right">조회수</TableCell>
                                <TableCell align="right">등록일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.boards ?
                                boards(this.state.boards) : 
                                <TableRow>
                                    <TableCell colSpan="4" align="center">
                                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>    
                </TableContainer>    
            </div>
        )
    }
}



export default withStyles(styles)(BoardList);
import React , {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import {Func} from '../common/common';
// import { API } from '../api/Call_API';

class Board extends Component{

    handleBoardDetail = (id) => {
        console.log('id:' + id);
    }


    render(){
        const {_id , boardId , userEmail , title , views , regDate} = this.props;
        return (
                <TableRow key={boardId}>
                    <TableCell component="th" scope="row" align="left">{userEmail}</TableCell>
                    <TableCell align="left">
                        <Link to={`/ctg/board/id/${_id}`} 
                              key={boardId}
                        >
                            {title}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{views}</TableCell>
                    <TableCell align="right">
                        {Func.DateFormat(regDate)}
                    </TableCell>
                </TableRow>
        );
    }
}



export default Board;
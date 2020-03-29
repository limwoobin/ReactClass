import React  , {Component} from 'react';
import {Func} from '../../common';

class ChildComment extends Component{

    render(){
        const {image , userEmail , content , modiDate} = this.props;
        return (
            <div>
                &nbsp;&nbsp;&nbsp;↘&nbsp;&nbsp; {image}{userEmail} : {content} &nbsp; {Func.DateFormat(modiDate)} <br/>
            </div>
        )
    }
}

export default ChildComment;
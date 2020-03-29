import React , {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import ChildComment from './ChildComment';
import {Func} from '../../common';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    

    render(){
        const {image , userEmail , content , modiDate , childComments} = this.props;
        const renderChildComments = (data) => {
            console.log('data:' + data);
            return data.map((c) => {
                return <ChildComment 
                            key={c._id}
                            image={c.image}
                            childCommentId={c.childCommentId}
                            userEmail={c.userEmail}
                            content={c.content}
                            modiDate={c.modiDate}
                        />
            });
        }

        return (
            <div>
                {image}{userEmail} : {content} &nbsp; {Func.DateFormat(modiDate)} <br/>
                {childComments ? renderChildComments(childComments)
                : ''}
                &nbsp;
                <Divider />
            </div>
        )
    }
}



export default Comment;
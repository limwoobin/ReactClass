import React , {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Comment from '../common/component/Comment/Comment';
import {API} from '../api/Call_API';
import {Func} from '../common/common';

class BoardView extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            id:this.props.match.params.id,
            views: 0,
            userEmail: '',
            boardType: '',
            title: '',
            content: '',
            comments: [],
            regDate:'',
        }
    }

    componentDidMount = () => {
        console.log(this.state.id);
        API.GET_BoardData(this.state.id)
        .then(response => {
            console.log(response.data);
            const data = response.data.data;
            this.setState({
                _id: data._id,
                views: data.views,
                userEmail: data.userEmail,
                boardType: data.boardType,
                title: data.title,
                content: data.content,
                comments: data.comments,
                regDate: Func.DateFormat(data.regDate),
            })
        }).catch(err => {
            console.log(err);
        })
    }
   

    render(){
        const data = this.state;
        const renderComments = (data) => {
            console.log('data:' + data);
            return data.map((c) => {
                return <Comment 
                            key={c._id}
                            commentId={c.commentId}
                            userEmail={c.userEmail}
                            content={c.content}
                            modiDate={c.modiDate}
                            childComments={c.childComments}
                        />
            });
        }
        return(
            <div>
                <CssBaseline />
                <Container maxWidth="md">
                <Typography component="div" style={{ backgroundColor: '#F6F6F6' , minHeight:'100%' , fontSize: '15px' , textAlign: 'left'}}>
                    <div>
                        조회수 : {data.views} <br/>
                        제목 : {data.title} <br/>
                        작성자 : {data.userEmail} <br/>
                        {/* 작성일시 : {Func.DateFormat(data.regDate)} <br/> */}
                        작성일시 : {data.regDate} <br/>
                        <br /><br />
                        <Divider />
                        내용 : {data.content} <br/>
                        <pre>
                            <code>var x = 5;</code>
                        </pre>  
                        <br /><br />
                    </div>
                    <Divider />
                    {data.comments ?
                        renderComments(data.comments) :
                        '댓글이 없습니다.'
                    }
                </Typography>
                </Container>
            </div>
        )
    }
}

export default BoardView;
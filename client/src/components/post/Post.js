import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import Commentform from './Commentform'
import CommentItem from './CommentItem'
const Post = ({getPost,post:{post,loading}}) => {
    const { id } = useParams();
    useEffect(()=>{
        
        getPost(id)
       
    },[getPost, id])
    return loading || post === null ? <Spinner />: <Fragment>
        <PostItem post={post} showActions={false}/>
        <Commentform postId={post._id}/>
        <div className='comments'>
            {post.comments.map(comment=>(<CommentItem key = {comment._id} comment={comment} postId={post._id}/>))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,

}
const mapSteToProps = state=>({
    post:state.post
})
export default connect(mapSteToProps,{getPost})(Post)

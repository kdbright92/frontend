import './postOptions.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import Comments from '../Comments/Comments';
import { useState } from 'react';
import UserApi from "../../Store/User/UserApi";

import { useContext } from "react";

export default function PostOptions({ post, onDelete, postId, /* userPost, isUserProfile  */ }) {
    const [showOptions, setShowOptions] = useState(false);

    const [likedPost, setLikedPost] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([]); // Move comments state here
    const [commentCount, setCommentCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const { user } = useContext(UserApi);
    const { firstname, lastname, token, profilePicture } = user;
    const { id, inputValue, selectedFile, userId, } = post;



    const handleDelete = () => {
        // Perform delete action for the post with ID: id
        onDelete(id);
        // Decrease the comment count when a post gets deleted
        setCommentCount(commentCount - comments.length);
    };

    const handleCommentCount = () => {

        setCommentCount(commentCount + 1);


    };
    const handleDeleteComment = (commentId) => {
        // Function to delete a comment
        // Update the comments list accordingly (remove the comment with commentId)
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
        setCommentCount(commentCount - 1);
    };

    const handleLikedCount = () => {
        setLikedPost(!likedPost);
        setLikedCount(likedPost ? likedCount - 1 : likedCount + 1);
    };

    return (

        <div className="post">

            <div className="container">
                <div className="user">
                    <div className="userInfo">

                        {post.user && (
                            <Link to={`/profile/${post.user.id}`}>
                                <img src={`data:image/png;base64, ${post.user.profilePicture}`} alt="Profile Picture" />
                            </Link>
                        )}
                        <div className="details">
                            {post.user && (
                                <>
                                    <span className='date'>{post.user.firstname} {post.user.lastname}</span>
                                </>
                            )}
                        </div>


                    </div>
                    <div className="moreOptions">
                        {/* Toggle the modal on clicking MoreHorizIcon */}
                        <MoreHorizIcon onClick={() => setShowOptions(!showOptions)} />
                    </div>

                </div>
                <div className="content">
                    <h3>{post.title}</h3>

                    <img src={post.imageUrl} alt="Retrieved Image" />



                    <div className="info">
                        <div className="item">

                            {likedPost ? (
                                <FavoriteIcon onClick={handleLikedCount} />
                            ) : (
                                <FavoriteBorderIcon onClick={handleLikedCount} />
                            )}
                            {likedCount} Likes
                        </div>
                        <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                            <CommentIcon />
                            {commentCount} Comments
                        </div>
                        <div className="item">
                            <SendIcon />
                            Share
                        </div>
                    </div>
                    {commentOpen && (
                        <Comments
                            onDeleteComment={handleDeleteComment}
                            counthandler={handleCommentCount}
                            comments={comments} // Pass comments and related functions as props
                            setComments={setComments}
                            postId={postId}

                        // Pass the function to send new comments
                        />
                    )}
                </div>
                {showOptions && (
                    <div className="optionsModal">
                        <div className="optionsContent">
                            <button onClick={() => setShowOptions(false)}>Close</button>
                            <button>Bearbeiten</button>
                            <button onClick={handleDelete}>Delete</button>
                            {/* Add functionality for "Change Post" */}
                            {/* <button onClick={handleChangePost}>Change Post</button> */}
                        </div>
                    </div>
                )}
            </div>
        </div >

    )
}
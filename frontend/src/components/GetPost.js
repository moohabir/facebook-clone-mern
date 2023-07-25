import {
  Avatar,
  Card,
  IconButton,
  Typography,
  Button,
  Divider,
  Container,
  Box,
} from '@mui/material';
import {
  MoreHoriz,
  Clear,
  Send,
  ThumbUp,
  ThumbUpAltOutlined,
} from '@mui/icons-material';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../features/posts/postSlice';
import myPhoto from '../assets/myphoto.jpeg';
import axios from 'axios';
import Comments from './Comments';

//import logo from '../assets/logo192.png';

function GetPost({ post }) {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  //console.log(post);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://facebook-clone-mern.onrender.com/api/posts/${post._id}/like`
      );
      console.log(response.data.likes);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error removing dislike:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `https://facebook-clone-mern.onrender.com/api/posts/${post._id}/unlike`
      );
      console.log(response.data.dislikes);
      setDislikes(response.data.dislikes);
    } catch (error) {
      console.error('Error removing dislike:', error);
    }
  };

  const dispatch = useDispatch();

  const Delete = (id) => {
    dispatch(deletePost(id));
  };

  const Share = () => {};

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        // `http://localhost:9000/api/posts/${post._id}/comment`,
        `https://facebook-clone-mern.onrender.com/api/posts/${post._id}/comment`,

        {
          text: commentText,
          user: user._id || null,
        }
      );

      if (response.status === 200 && user) {
        console.log(response.data.comments);
        setComments(response.data.comments);
        setCommentText('');
      } else {
        console.error('Error adding comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Container>
      <Card
        sx={{
          marginBottom: '40px',
          borderRadius: '12px',
          //width: '250px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '500px',
              gap: '10px',
              marginLeft: '10px',
            }}
          >
            <>
              {user.token && user?._id === post?.user?._id ? (
                <Avatar src={myPhoto} />
              ) : (
                <Avatar />
              )}

              <Typography sx={{ paddingTop: '10px' }}>
                {post?.user?.name}
              </Typography>
              <span style={{ paddingTop: '10px', alignSelf: 'center' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </>
          </div>

          {open && user?.token && user?._id === post?.user?._id && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                // onClick={() => updatePost(post)}
              >
                Edit post
              </Button>
              <Button
                variant="secondry"
                color="danger"
                onClick={() => Delete(post._id)}
              >
                Move to trash
              </Button>

              <Divider />
            </div>
          )}

          {open && user?._id !== post?.user?._id && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                // onClick={() => updatePost(post)}
              >
                Save post
              </Button>
              <Button
                variant="secondry"
                color="danger"
                onClick={() => Delete(post?._id)}
              >
                Turn on notifications for this Post
                <span>Add to your saved items</span>
              </Button>
              <Button
                variant="secondry"
                color="danger"
                onClick={() => Delete(post?._id)}
              >
                Embed
              </Button>
              <Divider />
            </div>
          )}

          {user?._id === post?.user?._id ? (
            <IconButton onClick={() => setOpen(!open)}>
              <MoreHoriz />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => setOpen(!open)}>
                <MoreHoriz />
              </IconButton>
              <IconButton onClick={() => dispatch(deletePost(post._id))}>
                <Clear />
              </IconButton>
            </>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            paddingTop: '20px',
            //paddingRight: '30px',
            paddingLeft: '30px',
            paddingBottom: '30px',
            minHeight: '250px',
            //maxWidth: 'calc(100% - 60px)',
            width: '100%',
            margin: 'auto',
            marginTop: '20px',
            color: 'rgba(0,0,0,1)',
          }}
        >
          <Typography>{post.text}</Typography>
          {post.image ? (
            <img
              src={post?.image?.secure_url}
              alt="post photos"
            />
          ) : (
            ''
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography> likeicons {post.likes} </Typography>
          <Typography> dislikeicons {post.dislikes} </Typography>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ marginRight: '20px' }}>
              {post.comments.length} comments
            </Typography>

            <Typography sx={{ width: '250px' }}>
              5(shares.length) shares
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={() => handleLike()}>
            <Box sx={{ display: 'flex' }}>
              <ThumbUp sx={{ marginRight: '10px' }} />
              <Typography>UnLike</Typography>
            </Box>
          </IconButton>

          <IconButton
            variant="secondry"
            color="danger"
            onClick={() => handleDislike()}
          >
            <Box sx={{ display: 'flex' }}>
              <ThumbUpAltOutlined sx={{ marginRight: '5px' }} />
              <Typography>Like</Typography>
            </Box>
          </IconButton>

          <form onSubmit={() => handleCommentSubmit()}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              variant="secondry"
              color="danger"
            >
              Comment
            </button>
          </form>

          <Button
            variant="secondry"
            color="danger"
            onClick={() => Share(post?._id)}
          >
            Share
          </Button>
        </div>
        <IconButton>
          <Send onClick={handleCommentSubmit} />
        </IconButton>
        {post.comments.map((list) => (
          <div
            key={list._id}
            style={{
              disply: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <Typography
              sx={{
                disply: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: 'auto',
              }}
            >
              {list.text}
            </Typography>

            {/* halkaan commentiga hagaaji style ahaan iyo functionalizyå‚<Comments
              list={list}
              key={list._id}
              handleCommentSubmit={handleCommentSubmit}
              commentText={commentText}
              setCommentText={setCommentText}
            />*/}
          </div>
        ))}
      </Card>
    </Container>
  );
}

export default GetPost;

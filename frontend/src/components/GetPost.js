import {
  Avatar,
  Card,
  IconButton,
  Typography,
  Button,
  Divider,
  Container,
} from '@mui/material';
import { MoreHoriz, Close, Delete } from '@mui/icons-material';

import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../features/posts/postSlice';
import myPhoto from '../assets/myphoto.jpeg';
import axios from 'axios';

//import logo from '../assets/logo192.png';

function GetPost({ post }) {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  console.log(user);

  //postId mahubo in async
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`);
      console.log(response);
      // Update the like count and liked status based on the response
      setLikeCount(response.data.likes.length);
      //setIsLiked(!isLiked);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.log(error);
      // Handle error if the like request fails
    }
  };

  const dispatch = useDispatch();

  const Delete = (id) => {
    dispatch(deletePost(id));
  };

  const Share = () => {};

  const Like = () => {};
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
              {user.token && user._id === post.user._id ? (
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

          {open && user.token && user._id === post.user._id && (
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
                Update
              </Button>

              <Button
                variant="secondry"
                color="danger"
                onClick={() => Delete(post._id)}
              >
                <Delete />
                Move to trash
              </Button>
              <Divider />
            </div>
          )}

          {open && user._id !== post.user._id && (
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
                onClick={() => Delete(post._id)}
              >
                Turn on notifications for this Post
                <span>Add to your saved items</span>
              </Button>
              <Button
                variant="secondry"
                color="danger"
                onClick={() => Delete(post._id)}
              >
                Embed
              </Button>
              <Divider />
            </div>
          )}
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <Close /> : <MoreHoriz />}
          </IconButton>
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
          <Typography> likeicons {likeCount} </Typography>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ marginRight: '20px' }}>
              60(comment.length) comments
            </Typography>
            <Typography sx={{ width: '250px' }}>
              5(shares.length) shares
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/*<button onClick={() => handleLike(post._id)}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>*/}

          <Button
            variant="secondry"
            color="danger"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? 'Unlike' : 'Like'}
          </Button>

          <Button
            variant="secondry"
            color="danger"
            onClick={() => Comment(post)}
          >
            Comment
          </Button>

          <Button
            variant="secondry"
            color="danger"
            onClick={() => Share(post._id)}
          >
            Share
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default GetPost;

import {
  Avatar,
  Card,
  IconButton,
  Typography,
  Button,
  Divider,
  Container,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../features/posts/postSlice';

import logo from '../assets/logo192.png';

function GetPost({ post }) {
  const [open, setOpen] = useState(false);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
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
            {post && (
              //halkaan hoose user.nameka waa inaan saxaa oo uu noqdaa qofkii soo dhigay ee maaha qofka markaas login yiri sida hada. idga waa sax lkn nameka qalad
              <>
                <Avatar />
                <Typography sx={{ paddingTop: '10px' }}>
                  {post.user.name}
                </Typography>
                <span style={{ paddingTop: '10px', alignSelf: 'center' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
          <IconButton onClick={() => setOpen(!open)}>
            <MoreHorizIcon />
          </IconButton>
          {open && (
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
                Delete
              </Button>
              <Divider />
            </div>
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
          <img
            src={logo}
            alt="post photos"
          />
        </div>
        <p> like icons </p>
        <div>
          <Typography> likeicons 154 </Typography>
          <div style={{ float: 'right' }}>
            <Typography>60(comment.length) comments</Typography>
            <Typography sx={{ width: '250px' }}>
              5(shares.length) shares
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="secondry"
            color="danger"
            onClick={() => Like(post._id)}
          >
            Like
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

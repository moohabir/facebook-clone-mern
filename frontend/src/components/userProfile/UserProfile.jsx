import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myPhoto from '../../assets/myphoto.jpeg';
import CreatePosts from '../CreatePosts';
import GetPost from '../GetPost';
import { deletePost, getPosts, reset } from '../../features/posts/postSlice';
import { Close, MoreHoriz, NavigateBefore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function UserProfile() {
  const [open, setOpen] = useState(false);

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (store) => store.auth
  );
  console.log(user);
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

  const Delete = (id) => {
    dispatch(deletePost(id));
  };

  const Share = () => {};

  const Like = () => {};
  return (
    <Container sx={{ marginTop: '180px' }}>
      <Box sx={{ display: 'flex' }}>
        <Avatar src={myPhoto} />
        {user && user.name ? <Typography>{user.name}</Typography> : null}
      </Box>
      <CreatePosts />
      {posts.map(
        (post) =>
          user?.token &&
          user?._id === post?.user?._id && (
            <div key={post.id}>
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
                        {user?.token && user._id === post?.user?._id ? (
                          <Avatar src={myPhoto} />
                        ) : (
                          <Avatar />
                        )}

                        <Typography sx={{ paddingTop: '10px' }}>
                          {post?.user?.name}
                        </Typography>
                        <span
                          style={{ paddingTop: '10px', alignSelf: 'center' }}
                        >
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
                  <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
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
            </div>
          )
      )}
    </Container>
  );
}

export default UserProfile;

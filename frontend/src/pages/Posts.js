import { CircularProgress, Container } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreatePosts from '../components/CreatePosts';
import GetPost from '../components/GetPost';
import Stories from '../components/Stories';
import { getPosts, reset } from '../features/posts/postSlice';

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);

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

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stories />
        <div>
          <CreatePosts />
        </div>
        <div>
          {posts?.map((post) => (
            <GetPost
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Posts;

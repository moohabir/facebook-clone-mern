import Button from '@mui/joy/Button';
import {
  Avatar,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/posts/postSlice';

const { useState } = require('react');

function CreatePosts() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [productImage, setProductImage] = useState('');
  console.log(productImage);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newPost = () => {
    console.log(user.name);

    setOpen(true);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        setProductImage(reader.result);
      };
    } else {
      setProductImage(' ');
    }
  };

  const Submithandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ text, image: productImage }));
    setText('');
    setOpen(false);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Create post
          </Typography>
          <form onSubmit={Submithandler}>
            <Typography>
              <Avatar src={user.image} /> {user.name}
            </Typography>
            <Stack spacing={2}>
              <TextField
                placeholder={`What's on your mind, ${user?.name}`}
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/"
                onChange={handleImage}
              />
              {productImage ? (
                <img
                  src={productImage}
                  alt={productImage}
                />
              ) : (
                <p>N image to preview</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={() => setOpen(!open)}>Close</Button>
                <Button type="submit">Post</Button>
              </div>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: 'none',
          borderRadius: '10px',
          marginBottom: '20px',
          marginTop: '20px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
          <Avatar style={{ alignSelf: 'center' }} />
          <input
            placeholder={`What's on your mind, ${user?.name}`}
            style={{
              borderRadius: '40px',
              backgroundColor: '#f0f2f5',
              display: 'flex',
              alignItems: 'center',
              width: '88%',
              height: '2px',
              padding: '20px',
              border: 'none',
              cursor: 'pointer',
              color: 'darkGray',
              marginTop: '10px',
            }}
            onClick={newPost}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '10px',
          }}
        >
          <div
            variant="contained"
            color="primary"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar style={{ marginRight: '10px' }} />
            <p>Live video</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar style={{ marginRight: '10px' }} />
            <p>Photo/video</p>
            <input
              type="file"
              placeholder="Photo/video"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar style={{ marginRight: '10px' }} />
            <p>Feeling/activity</p>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
export default CreatePosts;

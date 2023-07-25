import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';

// Rest of the module's code...

import {
  Avatar,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/posts/postSlice';
import myPhoto from '../assets/myphoto.jpeg';

import { styled } from '@mui/material/styles';
const { useState } = require('react');

function CreatePosts() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [productImage, setProductImage] = useState('');
  //const [imageSecureUrl, setImageSecureUrl] = useState(''); // Added state for secure URL
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
    dispatch(
      createPost({
        text,
        user,
        image: productImage,
      })
    );
    setText('');
    setOpen(false);
  };

  // Determine if the button should be disabled
  const isButtonDisabled = !text && !productImage;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '100%',
        gap: '10',
        width: '100%',
      }}
    >
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              id="basic-modal-dialog-title"
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
              sx={{ textAlign: 'center' }}
            >
              Create post
            </Typography>
            <IconButton onClick={() => setOpen(!open)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={Submithandler}>
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Avatar
                src={myPhoto}
                sx={{ marginRight: '10px' }}
              />
              <Box>
                <Typography>{user?.name}</Typography>
                <select
                  style={{
                    width: '50%',
                    borderRadius: '5px',
                    backgroundColor: 'grey',
                  }}
                >
                  <option>Public</option>
                  <option>Freinds</option>
                  <option>Freinds Exception</option>
                </select>
              </Box>
            </Box>
            <Stack spacing={2}>
              <TextField
                placeholder={`What's on your mind, ${user?.name}`}
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                sx={{
                  border: 'none',
                  padding: '15px',
                  width: '100%',
                  paddingRight: '10px',
                }}
              />

              <input
                type="file"
                accept="image/*, image/jpeg, image/png, image/jpg"
                onChange={handleImage}
              />
              {productImage && (
                <img
                  src={productImage}
                  alt={productImage}
                  style={{ height: '250px' }}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                  type="submit"
                  sx={{
                    width: '100%',
                  }}
                  //disabled={isButtonDisabled}
                >
                  Post
                </Button>
              </div>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Paper
        sx={{
          flex: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',

          margin: 'auto',

          marginTop: '30px',
          marginBottom: '30px',
          borderRadius: '10px',
          paddingTop: '10',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
          <Avatar
            style={{ alignSelf: 'center' }}
            src={myPhoto}
          />
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
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            marginLeft: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
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

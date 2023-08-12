import React from 'react';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import myPhoto from '../assets/myphoto.jpeg';

function ModalForm(props) {
  const {
    open,
    setOpen,
    handleImage,
    user,
    Submithandler,
    text,
    setText,
    productImage,
  } = props;
  return (
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
  );
}

export default ModalForm;

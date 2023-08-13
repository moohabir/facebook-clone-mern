import { Avatar, Container, Paper } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../features/posts/postSlice';
import myPhoto from '../assets/myphoto.jpeg';

import ModalForm from './ModalForm';
const { useState } = require('react');

function CreatePosts() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const [productImage, setProductImage] = useState('');
  //const [imageSecureUrl, setImageSecureUrl] = useState(''); // Added state for secure URL
  console.log(productImage);

  const { user } = useSelector((state) => state.auth);

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
    setProductImage('');
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
        backgroundColor: "#f0f2f5'",
      }}
    >
      <ModalForm
        open={open}
        setOpen={setOpen}
        handleImage={handleImage}
        user={user}
        Submithandler={Submithandler}
        text={text}
        setText={setText}
        productImage={productImage}
      />
      <Paper
        sx={{
          flex: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          padding: 0,
          margin: 'auto',
          marginTop: '30px',
          marginBottom: '30px',
          borderRadius: '10px',
          paddingTop: '10',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginLeft: '10px',
            marginBottom: '10px',
            gap: '10px',
          }}
        >
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
              width: '70%',
              fontSize: '0.95rem',
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
            marginLeft: '10px',
            marginRight: '10px',
            //width: '20%',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar style={{}} />
            <p>Live video</p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar style={{}} />
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
              paddingRight: '10px',
            }}
          >
            <Avatar style={{}} />
            <p>Feeling/activity</p>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
export default CreatePosts;

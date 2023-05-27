import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './CreateStory.css';
import { useDispatch, useSelector } from 'react-redux';
import { createStory } from '../../features/stories/storiesSlice';

function CreateStory() {
  const [text, setText] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

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
        setStoreImage(reader.result);
      };
    } else {
      setStoreImage(' ');
    }
  };

  const Submithandler = (e) => {
    e.preventDefault();
    dispatch(
      createStory({
        text,
        user,
        image: storeImage,
      })
    );
    setText('');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '50px',
        backgroundColor: 'lightGray',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          width: '250px',
          height: '350px',
          backgroundColor: 'indigo',
          marginRight: '20px',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // margin: 'auto',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={Submithandler}>
            <TextField
              placeholder={`What's on your mind, ${user?.name}`}
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            <Button type="submit">Create a photo story </Button>
          </form>
        </CardContent>
      </Card>
      <Card
        sx={{ width: '250px', height: '350px', backgroundColor: 'indianred' }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // margin: 'auto',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <input
            type="text"
            style={{
              dispaly: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              hight: '90vh',
              width: '50%',
              backgroundColor: 'lightblue',
            }}
          />
          <Typography>Create a text story</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateStory;

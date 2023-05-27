import {
  Avatar,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import stores from '../StoryData.js';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import myPhoto from '../assets/myphoto.jpeg';
import { getStories, reset } from '../features/stories/storiesSlice.js';

const allCategories = [
  ...new Set(stores.map((eachcategory) => eachcategory.category)),
  'Rooms',
];
console.log(allCategories);

function Stories() {
  const [index, setIndex] = useState(0);
  const { id, name, image } = stores[index];
  const [storeItems, setStoreItems] = useState(stores);
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const storiesSlice = storeItems.slice(0, 4);

  function limitNumber(number) {
    if (number > stores.length - 1) {
      return 0;
    }
    if (number < 0) {
      return stores.length - 1;
    }
    return number;
  }
  function Next() {
    setIndex((index) => {
      let newIndex = index + 1;
      return limitNumber(newIndex);
    });
  }

  function Previous() {
    setIndex((index) => {
      let newIndex = index - 1;
      return limitNumber(newIndex);
    });
  }

  const filterStoriesFromReels = (category) => {
    const newItems = stores.filter(
      (filtered) => filtered.category === category
    );
    console.log(newItems);
    setStoreItems(newItems);
    //setLists(newItems);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getStories());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

  if (isLoading) return <CircularProgress />;

  return (
    <Paper
      sx={{
        flex: 3,
        width: '92%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        justifyItems: 'center',
        marginTop: '90px',
        borderRadius: '10px',

        //width: '50%',
      }}
    >
      <div
        style={{
          dispaly: 'flex',
          justifyContent: 'space-between',
          marginRight: '10px',
          padding: '10px',
        }}
      >
        {allCategories.map((category, index) => (
          <IconButton
            onClick={() => filterStoriesFromReels(category)}
            sx={{
              border: 'none',
              fontSize: '1.2rem',
              // width: '33.33%',
              height: '60px',
              textTransform: 'capitalize',
              width: '160px',
              maxHeight: '70px',
              borderRadius: '10px',
              alignSelf: 'center',
              padding: '10px',
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '100%',
                textDecorationColor: 'blue',
                textDecorationThickness: '4px',
                textDecorationLine: '100%',
              },
            }}
          >
            {category === 'stories' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center, alignItems:"center',
                }}
              >
                <MenuBookIcon sx={{ marginRight: '6px' }} />
                <span>stories</span>
              </div>
            ) : category === 'reels' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center, alignItems:"center',
                }}
              >
                <VideoCallIcon sx={{ marginRight: '6px' }} />
                <span style={{}}>reels</span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center, alignItems:"center',
                }}
              >
                <VideoCallIcon sx={{ marginRight: '6px' }} /> <span>rooms</span>
              </div>
            )}
          </IconButton>
        ))}
      </div>
      {/*<Divider sx={{ width: '100%' }} />*/}

      <div style={{ display: 'flex', flexDirection: 'row', width: '500px' }}>
        <IconButton onClick={Previous}>
          <ArrowBackIosIcon />
        </IconButton>

        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            gap: '30px',
            height: '200px',
            width: '130px',
            borderRadius: '12px',
          }}
          //key={id}
        >
          <img
            //src={image.coverImage}
            src={myPhoto}
            alt={user.name}
            style={{ width: '40', height: '85%' }}
          />

          <IconButton
            onClick={() => navigate('/stories/create')}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Add
              sx={{
                backgroundColor: 'darkBlue',
                color: 'white',
                borderRadius: '50%',
              }}
            />
            <Typography>Create story</Typography>
          </IconButton>
        </Card>

        {storiesSlice.map((story) => (
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              gap: '30px',
              height: '200px',
              width: '130px',
              borderRadius: '12px',
              position: 'relative',
              //backgroundImage: 'url(story.image)',
              padding: '2px',
            }}
            key={story.id}
          >
            <Avatar
              style={{
                position: 'absolute',
                top: '5%',
                left: '10%',
                bottom: '90%',
                right: '90%',
                //color: 'white',
                size: '16px',
              }}
            />
            <img
              src={story?.image}
              alt={story.name}
              style={{
                width: '100%',
                height: '100%',
                //left: '50%',
                borderRadius: '6px',
                backgroundSize: 'cover',
              }}
            />
            <h5
              style={{
                position: 'absolute',
                top: '80%',
                left: '10%',
                bottom: '10%',
                right: '90%',
                color: 'white',
                size: '16px',
                width: '100vw',

                //gap: '4px',
                //lineHeight: '2px',

                //margin: 'auto',
              }}
            >
              {story.name}
            </h5>
          </Card>
        ))}
        <IconButton onClick={Next}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Stories;

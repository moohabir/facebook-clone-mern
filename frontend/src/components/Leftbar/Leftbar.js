import { Avatar, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Leftbar.css';
//import { Avatar } from 'react-chat-engine';

function Leftbar() {
  const [seemore, setSeeMore] = useState(false);
  return (
    <div
      style={{
        flex: 2,
        width: '280px',
        position: 'sticky',
        top: '70px',
        height: 'calc(100vh - 70px)',

        overflow: 'scroll',
        //scrollBehavior: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/*halkaan hoose nameka update kadhig mid ah oo ah qofka loginka ah magaciisa*/}
        <Avatar /> <span>Moha abdi</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          marginLeft: '10px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar />{' '}
        <span
          style={{
            display: 'flex',
            paddingTop: '5px',
            marginTop: '5px',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          Friends
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>Saved</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>pages</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>Communities(Groups)</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>Moha abdi</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>Watch</span>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar /> <span>Memories</span>
      </div>

      {seemore && (
        <>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Ad Center</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Ad Manager</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Climate Science Center</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Covid-19 information Center</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Crises response</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Emotional Health</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Events</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Favoraites</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Fundraisers</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Gaming Video</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Live Videos</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Messenger</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Meta Business Suite</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>News</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Order and Payments</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Pages</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Play Games</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Recent ad activity</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Reels</span>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5px',
              marginTop: '5px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar /> <span>Saved</span>
          </div>
        </>
      )}
      <div
        style={{
          display: 'flex',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar
          style={{
            display: 'flex',
            paddingTop: '5px',
            marginTop: '5px',
            alignItems: 'center',
            gap: '10px',
          }}
        />

        <button onClick={() => setSeeMore(!seemore)}>
          {seemore ? 'See less' : 'See more'}
        </button>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '5px',
          marginTop: '5px',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>
        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>
        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>

        <Typography>
          Privacy · Impressum/Terms/NetzDG/UrhDaG · Advertising · Ad Choices ·
          Cookies · · Meta © 2022
        </Typography>
      </div>
    </div>
  );
}

export default Leftbar;

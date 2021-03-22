import React from 'react';
import AppSearch from "./SearchBook";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
};

const App = () => {
    return(
        <div>
          <div className='headerCard'>
              <HeaderCard/>
          </div>
          <div className='cards'>
            <Card
                title='Search by Category'
                text='Lists: Art & Music, Biographies, Business,
                Comics, Computer & Tech etc..'/>

              <Card2
                  title='Search by Terms'
                  text='Lists: Android, Flutter, Javascript, Novel Interaction,
                  Artificial Intelligence etc...'/>

              <Card3
                  title='Commands Example'
                  text='Lists: Android, Flutter, Javascript, Novel Interaction,
                  Artificial Intelligence etc...'/>

          </div>
          <div className='cardBook'>
            <AppSearch/>
          </div>
      </div>
    );
}


class HeaderCard extends React.Component {
    render() {
        return (
            <div className="root" style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge='start' style={styles.menuButton} color="inherit" aria-label="menu">
                            <RecordVoiceOverIcon/>
                        </IconButton>
                        <Typography variant="h6" style={styles.title}>
                            Voice Assistant Application
                        </Typography>
                        <Button color="inherit">Reference List</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card1">
                <div className="card-body">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}

class Card2 extends  React.Component {
    render() {
        return (
            <div className="card2">
                <div className="card-body">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}

class Card3 extends  React.Component {
    render() {
        return (
            <div className="card3">
                <div className="card-body">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}

export default App;


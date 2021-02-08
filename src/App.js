import React, { useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import axios from 'axios';
import BookCard from './BookCard.jsx';

const App = () => {
    useEffect(() => {
        alanBtn({
            key: 'b5f85ba1d159fdc5657da8f2d51b76a52e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if (commandData === 'testCommand') {
                    alert('Command Executed');
                }
            },
        });

    }, [])

    return(
      <div>
          <h1 className="appTitle">Voice Assistant Application</h1>
          <h2 className="appTitle">This App allow you to search a Books and generate Harvard references</h2>
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
                  text=''/>

          </div>
      </div>
    );
}

class Card extends  React.Component {
    render() {
        return (
            <div className="card">
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
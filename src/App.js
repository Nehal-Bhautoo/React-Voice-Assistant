import React from 'react';
import AppSearch from "./SearchBook";


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
            <div className='cardHeader'>
                <div className="card-body">
                    <h1 className="appTitle">Voice Assistant Application</h1>
                    <h2 className="appTitle">This App allow you to search a Books and generate Harvard references</h2>
                </div>
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
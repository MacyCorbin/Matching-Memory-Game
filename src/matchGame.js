import React, { Component } from 'react';
import './matchGame.css';
import Cards from './Cards';
import MemoryCards from './memoryCards';
import Music from './components/Music/Music'
import Header from "./components/Header/Header";




class Game extends Component {
    constructor(props) {
        super(props);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);
        this.memoryCards = new MemoryCards();
      }

    
      componentWillMount() {
        this.initGame();
      }
    
      initGame() {

      
        this.memoryCards.generateCardSet();
        this.setState({
          turnNo : 1,
          pairsFound : 0,
          numClicksWithinTurn : 0,
          firstId : undefined,
          secondId : undefined
        });
      }
    
      getCardViews() {
        let cardViews = [];
        let onClick = this.onCardClicked;
        this.memoryCards.cards.forEach(c => {
          let cardView = <Cards key={c.id} 
              id={c.id} 
              image={c.image}
              imageUp = {c.imageUp}
              matched = {c.matched} 
              onClick={onClick}/>;
              cardViews.push(cardView);
        });
        return cardViews;
      }
    
      clearCards(id1,id2) {
        if (this.state.numClicksWithinTurn !== 2) {
          return;
        }
        this.memoryCards.flipCard(this.state.firstId, false);
        this.memoryCards.flipCard(this.state.secondId, false);
        this.setState({
          firstId: undefined,
          secondId: undefined,
          numClicksWithinTurn: 0,
          turnNo : this.state.turnNo+1
        });
      }
    
      onCardClicked(id,image) {
        if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
          if (this.state.numClicksWithinTurn === 2) {
            clearTimeout(this.timeout);
            this.clearCards(this.state.firstId, this.state.secondId);        
          }
          this.memoryCards.flipCard(id, true);
          this.setState({
            firstId : id,
            numClicksWithinTurn : 1
          });
        } else if (this.state.numClicksWithinTurn === 1) {
          this.memoryCards.flipCard(id, true);
          this.setState({
            secondId : id,
            numClicksWithinTurn : 2
          });
    
          if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
            this.memoryCards.setCardAsMatched(this.state.firstId, true);
            this.memoryCards.setCardAsMatched(id, true);
            this.setState({
              pairsFound: this.state.pairsFound+1,
              firstId: undefined,
              secondId: undefined,
              turnNo : this.state.turnNo+1,
              numClicksWithinTurn: 0
            });
    
          } else {
            this.timeout = setTimeout(() => { 
              this.clearCards(this.state.firstId, this.state.secondId);
            },5000); 
          }
    
        }
      }
    
      onPlayAgain() {
        this.initGame();
      }
    
      render() {
        let cardViews = this.getCardViews();
        let gameStatus = <div className='Game-status'>
                          <div>Turn: {this.state.turnNo}</div>
                          <div>Pairs Matched: {this.state.pairsFound}</div>
                          <div ><button  className="shuffle" onClick={this.onPlayAgain}>Shuffle</button></div>
                        </div>;
    
        if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
          gameStatus = <div className='Game-status'>
                        <div>GAME COMPLETE!</div>
                        <div>You used {this.state.turnNo-1} turns</div>
                        <div ><button className="shuffle" onClick={this.onPlayAgain}>Play again?</button></div></div>;      
        }
    
        return (
          <div className='Game'>
          
          <Header status={gameStatus}>Marvel Match
          </Header>
          <Music></Music>
            <div className='CardContainer'>
              {cardViews}
            </div>
            
          </div>
          
        );
    }

}
export default Game;
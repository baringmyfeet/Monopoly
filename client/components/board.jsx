import React, { Component } from 'react'
import Symbol from './Symbol'
import Player from './player'
import sock from '../helper/socket'
import { connect } from 'react-redux'
import { setUserPositions, setPlayers, setPlayerProps, setIndex, setUserProperties } from './store/actionCreators'
import Toast from './toast'
import ToastHistory from './ToastHistory'
import Others from './OtherPlayers'
import Offer from './ShowOffer'
import { Card } from 'semantic-ui-react'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      playerIndex: -1,
      valid: false,
      showToast: false,
      comment: '',
      showOffer: false,
      h1: [],
      h3: [],
      h6: [],
      h8: [],
      h9: [],
      h11: [],
      h13: [],
      h14: [],
      h16: [],
      h18: [],
      h19: [],
      h20: [],
      h23: [],
      h24: [],
      h26: [],
      h27: [],
      h29: [],
      h31: [],
      h32: [],
      h34: [],
      h37: [],
      h38: [],
      h39: []

    }
    sock.init({ gameID: this.props.gameID, index: this.props.playerIndex })
    this.dice = this.dice.bind(this)
    this.setComment = this.setComment.bind(this)
    this.showPopup = this.showPopup.bind(this)
    this.setHouse = this.setHouse.bind(this)
  }

  setHouse (obj) {
    this.setState(obj)
  }

  dice (value, index, flag) {
    const location = [
      [97, 97], [97, 83], [97, 75], [97, 66.5], [97, 58.5], [97, 50], [97, 42], [97, 34], [97, 25.5], [97, 17.5], [97, 2.5],
      [84.5, 2.5], [76.4, 2.5], [68.2, 2.5], [60, 2.5], [51.8, 2.5], [43.5, 2.5], [35.4, 2.5], [27.1, 2.5], [19, 2.5], [7, 2.5],
      [7, 17.5], [7, 25.5], [7, 34], [7, 42], [7, 50], [7, 58.5], [7, 66.5], [7, 75], [7, 83],
      [7, 97], [19, 97], [27.1, 97], [35.4, 97], [43.5, 97], [51.8, 97], [60, 97], [68.2, 97], [76.4, 97], [84.5, 97]
    ]
    let playerProps = location[value]
    if (index >= 0) {
      this.props.dispatch(setUserPositions(value, index))
    }
    if (flag) {
      sock.updatePos({ gameID: this.props.gameID, pos: value, index: index })
    }
    this.props.dispatch(setPlayerProps(playerProps, index))
  }

  componentDidMount () {
    sock.socket.on('users', (data) => {
      let players = Object.keys(data.players).map((key) => {
        return data.players[key]
      })
      this.props.dispatch(setPlayers(players))
    })

    sock.socket.on('offer for you', ({ position, socket, offer, offerIndex }) => {
      this.setState({ position, socket, offer, offerIndex, showOffer: true })
    })

    sock.socket.on('update position', (data) => {
      this.dice(data.pos, data.index, false)
      this.props.dispatch(setIndex(data.index))
    })

    sock.socket.on('update properties', (data) => {
      this.props.dispatch(setUserProperties(data.properties, data.index))
    })
  }

  setComment (comment) {
    this.setState({ comment })
  }

  showPopup () {
    this.setState({ showOffer: false })
  }
  render () {
    return (
      <div>
        <div className='left'> <Player name={this.props.username} dice={this.dice} piece='Hat' setComment={this.setComment} setHouse={this.setHouse} />
          {
            this.state.showOffer ? <Offer open={this.state.showOffer} offer={this.state.offer} setShowOffer={this.showPopup} position={this.state.position} offerIndex={this.state.offerIndex} /> : null
          }
          <div className={'other-players'}>
            <Card.Group>
              {
                this.props.players.map((player, index) => {
                  if (index !== this.props.playerIndex) {
                    return <Others key={index} playerUsername={player.username} otherPlayerIndex={index} socket={player.socketID} />
                  }
                })
              }
            </Card.Group>
          </div>
        </div>
        <div className='right'>
          <div className='board parent'>
            {
              this.props.players.map((player, index) => {
                if (index <= 3) {
                  return <Symbol className={`token${index}`} left={`${player.userPosition[1]}%`} top={`${player.userPosition[0] - (index + index)}%`} userNumber={index} key={index} />
                } else {
                  return <Symbol className={`token${index}`} left={`${player.userPosition[1] - 2}%`} top={`${player.userPosition[0] - (index + 4)}%`} userNumber={index} key={index} />
                }
              })
            }
            <div className='wire'>
              <ToastHistory message={this.state.comment} />
              <div className='flexcol'>
                <div className='flexrow'>
                  <div className='top' id='Position20' />
                  <div className='item-top' id='Position21'>
                    {this.state.h20.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='item-top' id='Position22' />
                  <div className='item-top' id='Position23'>
                    {this.state.h23.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='item-top' id='Position24'>
                    {this.state.h24.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='item-top' id='Position25' />
                  <div className='item-top' id='Position26'>
                    {this.state.h26.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='item-top' id='Position27'>
                    {this.state.h27.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='item-top' id='Position28' />
                  <div className='item-top' id='Position29'>
                    {this.state.h29.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                  <div className='top' id='Position30' />
                </div>
                <div className='flexmiddle'>
                  <div className='flexside'>
                    <div className='item-left' id='Position19'>
                      {this.state.h19.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-left' id='Position18'>
                      {this.state.h18.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-left' id='Position17' />
                    <div className='item-left' id='Position16'>
                      {this.state.h16.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-left' id='Position15' />
                    <div className='item-left' id='Position14'>
                      {this.state.h14.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-left' id='Position13'>
                      {this.state.h13.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-left' id='Position12' />
                    <div className='item-left' id='Position11'>
                      {this.state.h11.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                  </div>
                  <div className='flexside'>
                    <div className='item-right' id='Position31'>
                      {this.state.h31.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-right' id='Position32'>
                      {this.state.h32.map((item) => {
                        return <img src='house.png' id='house' />
                      })}
                    </div>
                    <div className='item-right' id='Position33' />
                    <div className='item-right' id='Position34'>
                      {this.state.h34.map((item) => {
                        return <img src='house.png' id='house' />
                      })}

                    </div>
                    <div className='item-right' id='Position35' />
                    <div className='item-right' id='Position36' />
                    <div className='item-right' id='Position37'>
                      {this.state.h37.map((item) => {
                        return <img src='house.png' id='house' />
                      })}

                    </div>
                    <div className='item-right' id='Position38' />
                    {this.state.h38.map((item) => {
                      return <img src='house.png' id='house' />
                    })}
                  </div>
                </div>
                <div className='flexrow'>
                  <div className='top' id='Position10' />
                  <div className='item-bottom' id='Position9'>
                    {this.state.h9.map((item) => {
                      return <img src='house.png' id='house' />
                    })}

                  </div>
                  <div className='item-bottom' id='Position8'>
                    {this.state.h8.map((item) => {
                      return <img src='house.png' id='house' />
                    })}

                  </div>
                  <div className='item-bottom' id='Position7' />
                  <div className='item-bottom' id='Position6'>
                    {this.state.h6.map((item) => {
                      return <img src='house.png' id='house' />
                    })}

                  </div>
                  <div className='item-bottom' id='Position5' />
                  <div className='item-bottom' id='Position4' />
                  <div className='item-bottom' id='Position3'>
                    {this.state.h3.map((item) => {
                      return <img src='house.png' id='house' />
                    })}

                  </div>
                  <div className='item-bottom' id='Position2' />
                  <div className='item-bottom' id='Position1'>
                    {this.state.h1.map((item) => {
                      return <img src='house.png' id='house' />
                    })}

                  </div>
                  <div className='top' id='Position0' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    gameID: state.gameID,
    userID: state.userID,
    userPosArray: state.userPosArray,
    // userPropertiesArray: state.userPropertiesArray,
    index: state.index,
    players: state.players,
    playerIndex: state.playerIndex
  }
}

Board.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  userID: React.PropTypes.string.isRequired,
  userPosArray: React.PropTypes.array.isRequired,
  // userPropertiesArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  players: React.PropTypes.array.isRequired,
  playerIndex: React.PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Board)

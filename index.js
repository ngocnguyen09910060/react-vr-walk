import React from 'react';
import {
  Scene,
  Animated,
} from 'react-vr';

const AnimatedScene = Animated.createAnimatedComponent(Scene);

export default class Walk extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      x: new Animated.Value(0),
      z: new Animated.Value(props.starting ? props.starting : 0),
    }
    this.moveZ = Animated.event([
      null, { dz: this.state.z },
    ])
    this.moveX = Animated.event([
      null, { dx: this.state.x },
    ])

    this.positionZ = props.starting ? props.starting : 0
    this.positionX = 0

  }
  onInput(e) {
    if (e.nativeEvent.inputEvent.eventType == 'keydown') {
      switch (e.nativeEvent.inputEvent.code) {
        case 'KeyW':
          this.walk({position: 'w'})
          break
        case 'KeyA':
          this.walk({position: 'a'})
          break
        case 'KeyS':
          this.walk({position: 's'})
          break
        case 'KeyD':
          this.walk({position: 'd'})
          break
        default:
          break
      }
    }
  }
  walk({position}) {
    switch (position) {
      case 'w':
        this.positionZ = this.positionZ - (this.props.speed ? this.props.speed : 0.1);
        this.moveZ(null, { dz: this.positionZ });
        break
      case 'a':
        this.positionX = this.positionX + (this.props.speed ? this.props.speed : 0.1);
        this.moveX(null, { dx: this.positionX });
        console.log('a');
        break
      case 's':
        this.positionZ = this.positionZ + (this.props.speed ? this.props.speed : 0.1);
        this.moveZ(null, { dz: this.positionZ });
        break
      case 'd':
        this.positionX = this.positionX - (this.props.speed ? this.props.speed : 0.1);
        this.moveX(null, { dx: this.positionX });
        break
      default:
        break
    }
  }
  render() {
    return (
      <AnimatedScene onInput={(e) => this.onInput(e)} style={{ transform: [{translateZ: this.state.z}, {translateX: this.state.x }] }}>
        {this.props.children}
      </AnimatedScene>
    );
  }
};

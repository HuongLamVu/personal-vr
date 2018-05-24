import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  staticAssetURL,
  VrButton,
  Image,
  Environment,
  asset,
} from 'react-360';

import InfoButton from './InfoButton';
import NavButton from './NavButton';
import LoadingSpinner from './LoadingSpinner';

import CylindricalPanel from 'CylindricalPanel';

const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 720;

// Web VR is only able to support a maxiumum texture resolution of 4096 px
const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 720;
// Cylinder is a 2D surface a fixed distance from the camera.
// It uses pixes instead of meters for positioning components.
// pixels = degrees/360 * density, negative to rotate in expected direction.
const degreesToPixels = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH;
// PPM = 1/(2*PI*Radius) * density. Radius of cylinder is 3 meters.
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH;


const data = [
  {
    background: 'bachground.jpeg',
    infoData: [
      {
        buttonPosition: {
          transform: [
            {translate: [1, 1, 0]}
          ]
        },
        hoverImage: 'anh_3.jpg',
        goToIndex: 1,
      },{
        buttonPosition: {

        },
        hoverImage: 'download.jpg',
        goToIndex: 2,
      },{
        buttonPosition: {
          transform: [
            {translate: [1, 1, 0]}
          ]
        },
        hoverImage: 'images.jpg',
        goToIndex: 0,
      }
    ]
  },{
    background: 'bachground-1.jpeg',
    infoData: [
      {
        buttonPosition: {

        },
        hoverImage: 'download.jpg',
        goToIndex: 1,
      },
    ]
  },{
    background: 'bachground-2.jpeg',
    infoData: [
      {
        buttonPosition: {

        },
        hoverImage: 'download.jpg',
        goToIndex: 1,
      },{
        buttonPosition: {
          transform: [
            {translate: [1, 1, 0]}
          ]
        },
        hoverImage: 'images.jpg',
        goToIndex: 1,
      }
    ]
  },{
    background: 'bachground-3.jpeg',
    infoData: [
      {
        buttonPosition: {
          transform: [
            {translate: [1, 1, 0]}
          ]
        },
        hoverImage: 'anh_3.jpg',
        goToIndex: 1,
      },{
        buttonPosition: {

        },
        hoverImage: 'download.jpg',
        goToIndex: 1,
      },{
        buttonPosition: {
          transform: [
            {translate: [1, 1, 0]}
          ]
        },
        hoverImage: 'images.jpg',
        goToIndex: 1,
      }
    ]
  }
]
export default class Hello360 extends React.Component {

  static defaultProps = {
    tourSource: 'tourOfTheChester.json',
  };

  constructor(){
    super();
    this.state = {
      infoData: '',
      currentIndex: 0,
      renderData: [],
      rotation: null,
    };
  }
  handleMouseEnter() {
    this.setState({
      hoverImage: staticAssetURL('IMG_20171216_214227.jpg'),
    });
  }
  handleMouseExit() {
    this.setState({
      hoverImage: '',
    });
  }
  gotoNewView(newIndex) {
    var newData = data[newIndex];

    Environment.setBackgroundImage(asset(newData.background));

    this.setState({
      currentIndex: newIndex,
      renderData: newData,
    });

  }
  renderVRButton() {

  }
  componentWillMount() {
    this.setState({
      currentIndex: 0,
      renderData: data[this.state.currentIndex].infoData
    })
  }

  componentDidMount() {
    fetch(asset(this.props.tourSource).uri)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
      })
      .done();
  }
  init(tourConfig) {
    // Initialize the tour based on data file.
    this.setState({
      rotation: 0,
    });
  }
  render() {
    const currentIndex = this.state.currentIndex;

    const rotation = ;


    return (
      // <View style={{transform: [{rotateY: rotation}]}}></View>
      <View style={styles.panel}>
        {
          this.state.renderData.length && this.state.renderData.map((data, index) => <View key={index}>
            {data.hoverImage?
              (<Image style={{
                width: 300,
                height: 300,
              }} source={asset(data.hoverImage)}></Image>) : null
            }
            <VrButton onEnter={() => this.handleMouseEnter()}
              // onExit={() => this.handleMouseExit()}
                      onClick={() => this.gotoNewView(data.goToIndex)}
            >
              <Image style={{
                width: 50,
                height: 50,
              }}
                     source={{uri: staticAssetURL('pulse_dot.gif')}}/>
            </VrButton>
          </View>)
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 2500,
    height: 900,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);

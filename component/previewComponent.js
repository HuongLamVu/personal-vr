import * as React from "react";

import {
  Text,
  View,
  VrButton,
  staticAssetURL,
  Image,
} from 'react-360';

const imageStyle = {
  height: 1,
  width: 1,
  top: 0,
  left: 0,
}

export default class PreviewComponent extends React.Component{
  
  render() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        layoutOrigin: [0.5, 0.5, 0],}}>
        
      </View>)
  }
}
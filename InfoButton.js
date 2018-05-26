/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
'use strict';

import React from 'react';
import {Animated, Image, View, VrButton} from 'react-360';

import Tooltip from './Tooltip';

/**
 * On hover the InfoButton fades in a Tooltip component, and then fades it out
 * when the cursor leaves both the button and the Tooltip.
 * 
 * When using with CylinderLayer, set pixelsPerMeter to convert units, otherise
 * set translateZ to specify distance between camera and button. 
 */
const phi=45;
const theta =15;

class InfoButton extends React.Component {
  static defaultProps = {
    fadeIn: 500,
    fadeOut: 500,
    height: 0.3,
    onInput: null,
    pixelsPerMeter: 1,
    rotateY: 0,
    translateX: 0,
    translateZ: 0,
    width: 0.3,
  };

  constructor(props) {
    super();
    this.state = {
      hasFocus: false,
      opacityAnim: new Animated.Value(0),
    };
  }

  _fadeIn() {
    Animated.timing(this.state.opacityAnim, {
      toValue: 1,
      duration: this.props.fadeIn,
    }).start();
  }

  _fadeOut() {
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: this.props.fadeOut,
    }).start();
  }

  gotoIndex = (id) => {
    this.props.gotoIndex(id);
  }

  render() {
    const PPM = this.props.pixelsPerMeter;
    const tooltip = this.props.tooltip;
    return (
      <VrButton
        style={{
          layoutOrigin: [0.5, 0.5, 0],
          position: 'absolute',
          transform: [
            {rotateY: tooltip.rotationY},
            {rotateX: theta},
            {translateZ: -700},
          ],
        }}
        onClick={() => this.gotoIndex(this.props.linkedPhotoId)}
        onInput={this.props.onInput}
        onExit={() => {
          this._fadeOut();
        }}
        onEnter={() => {
          this._fadeIn();
        }}>
        <Image
          style={{
            height: 0.3 * PPM,
            width: 0.3 * PPM,
            flexDirection: 'row',
          }}
          onEnter={() => {
            this._fadeIn();
          }}
          source={this.props.source}>
          <Animated.View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: this.state.opacityAnim,
              paddingLeft: 0.4 * PPM,
            }}
            billboarding={'on'}>
            <Tooltip pixelsPerMeter={PPM} tooltip={this.props.tooltip} />
          </Animated.View>
        </Image>
      </VrButton>
    );
  }
}

module.exports = InfoButton;

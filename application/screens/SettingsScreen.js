import React from 'react';
import Info from './../components/Info';
import {DefaultContext} from "../context/default";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Умный дом (Domoticz)'
  };

  static contextType = DefaultContext;

  startInfoData = this.context.domoticzInfo

  render() {
    console.log('start', this.context)
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Info/>
  }
}

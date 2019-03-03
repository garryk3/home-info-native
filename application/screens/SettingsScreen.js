import React from 'react';
import Info from './../components/Info';
import { DefaultContext } from "../context/default";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  static contextType = DefaultContext;

  startInfoData = this.context.domoticzInfo

  render() {
    return (
      <DefaultContext.Consumer>
        {(context) => <Info transport={context.transport}/>}
      </DefaultContext.Consumer>
    )
  }
}

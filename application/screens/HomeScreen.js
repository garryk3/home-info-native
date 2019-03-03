import React from 'react';

import Main from '../components/Main';
import { DefaultContext } from '../context/default';

const HomeScreen = () => (
    <DefaultContext.Consumer>
        {context => <Main transport={context.transport} />}
    </DefaultContext.Consumer>
);

HomeScreen.navigationOptions = { header: null };

export default HomeScreen;

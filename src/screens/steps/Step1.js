import React, {Component} from './node_modules/react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';

import {UIText, UIButton, UIContainer} from '../components/InputComponents';
// import { Toast } from 'native-base';

export default class Step1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UIContainer>
                <UIText fontSize="28">FILLUP.PK</UIText>
                <UIText>Welcome there</UIText>
            </UIContainer>
        );
    }
}
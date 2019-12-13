import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'native-base';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

export class InputText extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['text', 'email', 'password', 'phone']).isRequired,
        title: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            hidden: props.type === 'password',
            icons: {
                text: 'text-fields',
                password: 'lock',
                email: 'email',
                phone: 'phone'
            }
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <Text
                style={styles.titleText}>
                {this.props.title}
            </Text>
            <View style={styles.inputBox}>
                <View style={styles.inputImg}>
                    <MaterialIcons
                        size={26}
                        color={'#fdbb56'}
                        name={this.props.icon ? this.props.icon : this.state.icons[this.props.type]}
                        style={{borderWidth: 0}}
                    />
                </View>

                <View style={styles.inputTextView}>
                    <TextInput
                        secureTextEntry={this.state.hidden}
                        style={styles.inputText}
                        placeholder={this.props.placeholder?this.props.placeholder:''}
                        placeholderTextColor="#7b7b7b"
                        onChangeText={this.props.onChange}
                    />
                </View>

                {this.props.type == 'password' ? (
                    <TouchableOpacity
                        onPress={() => this.setState({hidden: !this.state.hidden})}
                        style={styles.PwdEyeImg}>
                        {this.state.hidden ? (
                        <Entypo name="eye-with-line" size={20} color="#878787" />
                        ) : (
                        <Entypo name="eye" size={20} color="#878787" />
                        )}
                  </TouchableOpacity>
                ) : null}
            </View>
          </View>
        );
    }
}

export class UIButton extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.props.onPress}
                    style={this.props.style
                        ?this.props.style:
                        styles.button}
                    >
                    <Text style={styles.buttonText}>{this.props.title?this.props.title:'Button'}</Text>
                </Button>
            </View>
        );
    }
}

export class UIText extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{marginTop: 10}}>
                {this.props.onPress ? (
                    <TouchableOpacity
                        onPress={this.props.onPress}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: !this.props.onPress ? '#777' : '#fdbb56',
                                fontSize: 16,
                            }}>
                            {this.props.children}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={{
                            fontWeight: this.props.fontWeight,
                            color: !this.props.onPress ? '#777' : '#fdbb56',
                            fontSize: !this.props.fontSize?16:parseInt(this.props.fontSize),
                            ...this.props.styles
                        }}>
                        {this.props.children}
                    </Text>
                )}
                
            </View>
        );
    }
}

export class UIContainer extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {this.props.children}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },

    titleText : {
        color: '#000',
        fontSize: 16,
        padding: 3,
    },

    inputBox: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 4,
        backgroundColor: '#ffffff',
    },

    inputImg: {
        height: 40,
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    inputTextView: {
        height: 40,
        width: '76%',
    },

    inputText: {
        height: 40,
    },

    PwdEyeImg: {
        width: '12%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        marginTop: 10, 
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        fontSize: 14
    },

    buttonText: {
        borderColor: '#fff',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }

});
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
  Button,
  TextInput,
  Picker,
  ActivityIndicator,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

import NavigationService from './NavigationService';
import Storage from './Storage';

export const Constants = {
    PRIMARY_COLOR: '#2196f3'
};

export const Helper = {

    get: (array, where, cond = 'AND') => {
        var test = 0;
        for (var i = 0; i < array.length; i++) {
            var arr = array[i];
            var wKeys = Object.keys(where);
            wKeys.maps((v, i) => {
                if(arr[v] == where[v]){
                    test++;
                }
            });
        }
        if(cond == 'AND' && test == wKeys.length) {
            return arr;
        } if(cond == 'OR' && test > 0) {
            return arr;
        }
        return false;
    }

}

export function UIHeaderOptions(title = 'Fillup.PK', bgColor = '#2196f3') {
    var onHeaderButton = () => {
        Storage.remove('@user');
        NavigationService.navigate('Auth', { logout: true });
    };
    return {
        title: title,
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        headerRight: (
          <UIText onPress={onHeaderButton} 
              styles={{justifyContent: 'center', marginTop: 0, marginRight: 10, }}
              textStyles={{alignSelf: 'center', color: '#fff'}}>Logout</UIText>
          ),
        headerLayoutPreset: 'center'
  }
}

export class InputText extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['text', 'email', 'password', 'phone']).isRequired,
        title: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
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
            },
            value: props.defaultValue
        }
    }

    onChange = (text) => {
        this.setState({value: text});
        this.props.onChange(text);
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
                        color={Constants.PRIMARY_COLOR}
                        name={this.props.icon ? this.props.icon : this.state.icons[this.props.type]}
                        style={{borderWidth: 0}}
                    />
                </View>

                <View style={styles.inputTextView}>
                    <TextInput
                        editable={this.props.editable}
                        value={this.state.value}
                        secureTextEntry={this.state.hidden}
                        style={styles.inputText}
                        placeholder={this.props.placeholder?this.props.placeholder:''}
                        placeholderTextColor="#7b7b7b"
                        onChangeText={this.onChange}
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
            <View style={{...styles.container, ...this.props.stylesContainer}}>
                <Button
                    title={this.props.title}
                    onPress={this.props.onPress}
                    style={{...styles.button, ...this.props.styles}}
                    >
                    <Text style={styles.buttonText}>{this.props.title?this.props.title:'Button'}</Text>
                    {this.props.subtitle?(<Text style={{fontSize: 13,color: '#f1f1f1'}}>{this.props.subtitle}</Text>):null}
                </Button>
            </View>
        );
    }
}

export class UIIcon extends Component {
    render() {
        var provider = this.props.provider;
        var icon = <MaterialIcons
                    size={26}
                    color={Constants.PRIMARY_COLOR}
                    name={this.props.name}
                    style={{borderWidth: 0, ...this.props.style}}
                />;
        if(provider == 'ionicons'){
            icon = <Ionicons
                size={26}
                color={Constants.PRIMARY_COLOR}
                name={this.props.name}
                style={{borderWidth: 0, ...this.props.style}} />
        } else
        if(provider == 'fontawesome'){
            icon = <FontAwesome
                size={26}
                color={Constants.PRIMARY_COLOR}
                name={this.props.name}
                style={{borderWidth: 0, ...this.props.style}} />
        } else
        if(provider == 'materialcommunity'){
            icon = <MaterialCommunityIcons
                size={26}
                color={Constants.PRIMARY_COLOR}
                name={this.props.name}
                style={{borderWidth: 0, ...this.props.style}} />
        }
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{zIndex: 9, ...this.props.containerStyle}}
                >
                {icon}
            </TouchableOpacity>
        )
    }
}

export class UIText extends Component {
    static defaultProps = {
        fontColor: '#777',
        fontWeight: 'normal',
        fontSize: '16',
        textAlign: 'left',
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{...styles.container, marginTop: 10, ...this.props.styles}}>
                {this.props.onPress ? (
                    <TouchableOpacity
                        onPress={this.props.onPress}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: !this.props.onPress ? '#777' : Constants.PRIMARY_COLOR,
                                fontSize: 16,
                                ...this.props.textStyles
                            }}>
                            {this.props.children}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={{
                            fontWeight: this.props.fontWeight,
                            textAlign: this.props.textAlign,
                            color: this.props.fontColor,
                            fontSize: parseInt(this.props.fontSize),
                            ...this.props.textStyles
                        }}>
                        {this.props.children}
                    </Text>
                )}
                
            </View>
        );
    }
}

export class UIContainer extends Component {
    static defaultProps = {
        width: '90%',
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView nestedScrollEnabled={true} contentContainerStyle={this.props.scrollStyle}>
                    <View style={{width: this.props.width, ...styles.containerView, ...this.props.viewStyles}}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export class UIPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.default
        }
    }

    onPickerChange = (itemVal, itemInd) => {
        this.setState({current: itemVal});
        this.props.onChange(itemVal, itemInd);
    };

    render() {
        return (
            <View style={[styles.container, this.props.styles]}>
                {this.props.title ? (<UIText>{this.props.title}</UIText>) : null}
                <Picker selectedValue={this.state.current} onValueChange={this.onPickerChange}>
                    {this.props.items && this.props.items.map((item, ind) => (
                        <Picker.Item key={ind} value={item.val} label={item.label} />
                    ))}
                </Picker>
            </View>
        );
    }
}

export class UICheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.default?props.default:false
        };
    }

    onValueChange = () => {
        var cc = !this.state.checked;
        this.setState({ checked: cc });
        this.props.onChange(cc);
    };

    render() {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', ...this.props.styles }} onPress={this.onValueChange}>
                <MaterialIcons
                    size={26}
                    color="#211f30"
                    name={ this.state.checked ? 'check-box' : 'check-box-outline-blank'}
                />
                <Text> {this.props.children} </Text>
            </TouchableOpacity>
        );
    }
}

export class UIImage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{justifyContent: 'center'}}>
                <Image source={{uri: this.props.src}} style={{width: this.props.width?this.props.width:100, height: this.props.height?this.props.height:100, ...this.props.styles}} resizeMode="contain" />
                <UIText textAlign="center" fontWeight="bold">{this.props.caption}</UIText>
            </View>
        );
    }
}

export class UILoader extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', zIndex: 9, backgroundColor: '#fff',
          width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        marginTop: 10,
    },

    containerView: {
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center'
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
        fontSize: 14,
        flexDirection: 'column',

    },

    buttonText: {
        borderColor: '#fff',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }

});
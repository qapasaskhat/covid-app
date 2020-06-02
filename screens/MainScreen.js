import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import publicIP from 'react-native-public-ip';

import { connect } from 'react-redux';
import { network } from '../api/covid/actions';
import{ fetchLocation } from '../api/location/actions'

import Moment from 'moment';
import Card from './components/Card';
import Prevention from './components/Prevention';
import Symptoms from './components/Symptoms';

const {height, width} = Dimensions.get('screen');

import { fcmService } from '../src/FCMService'
import { localNotificationService } from "../src/LocalNotificationService";

const mapStateToProps = state => ({
  items: state.fetch.items,
  load: state.fetch.loading,
  error: state.fetch.error,
  global: state.fetch.global,
  country_name: state.location.country_name
});

class MainScreen extends React.Component {
  state = {
    data: {},
    text: '',
  };
  componentDidMount = async () => {
    const isHermes = () => global.HermesInternal !== null;

    this.props.dispatch(network());
    const publicIpAddress = await publicIP();
    this.props.dispatch(fetchLocation(publicIpAddress))
    useEffect()
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    function onRegister(token){
      console.log('[App] onRegister', token);
      
    }
    function onNotification(notify){
      console.log('[App] onNotification ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }
    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      alert('Open notification: '+ notify.body)
    }
    return()=>{
      console.log('[App] unRegister');
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  };

  render() {
    const {load, items, global, country_name} = this.props;

    return (
      <ScrollView>
          <StatusBar />
        <View style={styles.container}>
          <Image source={require('../img/doctor.png')} style={styles.img} />
          <View style={styles.header} />
          <Text
            style={{
              fontSize: 20,
              color: '#606DAA',
              zIndex: 200,
              fontWeight: 'bold',
              top: 16,
              top: height * 0.42,
              marginBottom:5
            }}>
            #STAYATHOME
          </Text>
          <View style={styles.txtInput}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen', {
                  param: country_name,
                })}>
              <Image
                source={require('../img/location.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: '#606DAA',
                }}/>
              </TouchableOpacity>
              <TextInput
                style={{
                  color: '#606DAA',
                }}
                placeholder={'Kazakhstan'}
                value={this.state.text}
                onChangeText={text => {
                  this.setState({text});
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                this.props.navigation.navigate('Screen', {
                  param: this.state.text,
                })
              }>
              <Text style={styles.btnText}>Поиск</Text>
            </TouchableOpacity>
          </View>
          {load ? (
            <View
              style={{
                marginTop: 32,
                backgroundColor: '#fff',
              }}>
              <ActivityIndicator size={'large'} color={'#606DAA'} />
            </View>
          ) : (
            <View style={styles.body}>
              <View
                style={{
                  padding: 8,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#606DAA',
                    }}>
                    Дата обновление
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#C4C4C4',
                      }}>
                      последнее обновление{' '}
                      <Text style={{color: '#606DAA'}}>
                        {Moment(items.Date).format('ll')}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.dispatch(network())}>
                      <Image
                        source={require('../img/update.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          marginLeft: 12,
                          tintColor: '#606DAA',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Card global={global} />
              </View>
              <Symptoms />
              <Prevention />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent:'center',
    alignItems: 'center',
  },
  header: {
    height: 600,
    width: 600,
    borderRadius: 300,
    backgroundColor: '#606DAA',
    top: -300,
    position: 'absolute',
    zIndex: 99,
  },
  img: {
    width: width * 0.8,
    height: height * 0.4,
    position: 'absolute',
    marginTop: 32,
    zIndex: 100,
    resizeMode: 'contain',
  },
  txtInput: {
    height: 40,
    width: width * 0.9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#606DAA',
    marginTop: height * 0.44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 1,
    paddingLeft: 8,
  },
  btn: {
    height: 36,
    width: 80,
    backgroundColor: '#606DAA',
    borderRadius: 16,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  body: {
    flexDirection: 'column',
    width: width * 0.9,
  },
});
export default connect(mapStateToProps)(MainScreen);

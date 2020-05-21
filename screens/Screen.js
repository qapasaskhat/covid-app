import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import publicIP from 'react-native-public-ip';

import {search} from '../api/covid/actions';
import {fetchLocation} from '../api/location/actions';

import Moment from 'moment';
const {height, width} = Dimensions.get('screen');

const mapStateToProps = state => ({
  items: state.fetch.items,
  load: state.fetch.loading,
  error: state.fetch.error,
  global: state.fetch.global,
  data: state.fetch.data,
  country_name: state.location.country_name,
});
class Screen extends React.Component {
  state = {
    text: '',
    txt: '',
  };
  componentDidMount = async() => {
    const publicIpAddress = await publicIP();
    this.setState({
      text: this.props.navigation.getParam('param'),
    });
    this.props.navigation.getParam('param') === ''
      ? null
      : this.searchText(this.props.navigation.getParam('param'));
    this.props.dispatch(fetchLocation(publicIpAddress))
  };
  searchText = async text => {
    text === '' ? null : this.props.dispatch(search(text));
  };
  render() {
    const {data, items,country_name} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.txtInput}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> {
                 this.props.dispatch(search(country_name))
                 this.setState({
                     text: country_name
                 })
            }}>
              <Image
                source={require('../img/location.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: '#606DAA',
                }}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                color: '#606DAA',
              }}
              placeholder={'Kazakhstan'}
              value={this.state.text}
              onChangeText={text => this.setState({text})}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.searchText(this.state.text)}>
            <Text style={styles.btnText}>Поиск</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            letterSpacing: 0.5,
            color: '#606DAA',
            marginVertical: 8,
          }}>
          {this.state.text}
        </Text>
        {this.state.text === '' ? (
          <View>
            <Text
              style={{
                color: '#FF3030',
              }}>
              введите текст
            </Text>
          </View>
        ) : (
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
              <Text
                style={{
                  color: '#C4C4C4',
                }}>
                последнее обновление{' '}
                <Text style={{color: '#606DAA'}}>
                  {Moment(items.Date).format('ll')}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: width * 0.9,
                marginTop: 16,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FF3030',
                  }}>
                  Зараженные
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#FF3030',
                  }}>
                  {data.map(i => {
                    return i.TotalConfirmed;
                  })}
                </Text>
                <Text>
                  (+
                  {data.map(i => {
                    return i.NewConfirmed;
                  })}
                  )
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text>Летальные исходы</Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.75)',
                  }}>
                  {data.map(i => {
                    return i.TotalDeaths;
                  })}
                </Text>
                <Text>
                  (+
                  {data.map(i => {
                    return i.NewDeaths;
                  })}
                  )
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#0CDCB1',
                  }}>
                  Выздоровевшие
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#0CDCB1',
                  }}>
                  {data.map(i => {
                    return i.TotalRecovered;
                  })}
                </Text>
                <Text>
                  (+
                  {data.map(i => {
                    return i.NewRecovered;
                  })}
                  )
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  txtInput: {
    height: 40,
    width: width * 0.9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#606DAA',
    marginTop: 8,
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
});

export default connect(mapStateToProps)(Screen);

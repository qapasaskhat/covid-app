import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    TextInput,
    ActivityIndicator
} from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import { fetch } from '../api/covid/actions'

import Moment from 'moment';
const {
    height,
    width
} = Dimensions.get('screen')

const mapStateToProps = state => ({
    items: state.fetch.items,
    load: state.fetch.loading,
    error: state.fetch.error,
    global: state.fetch.global
})

class MainScreen extends React.Component {
    state = {
        data: {},
        text: ''
    }
    componentDidMount = async () => {
        this.props.dispatch(fetch())
    }

    render() {
        const { load, items, global } = this.props
        Moment.locale('ru')
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{
                        fontSize: 20,
                        color: '#fff',
                        zIndex: 200,
                        fontWeight: 'bold',
                        top: 16
                    }}>#STAYATHOME</Text>
                    <Image
                        source={require('../img/doctor.png')}
                        style={styles.img} />
                    <View style={styles.header} />
                    <View style={styles.txtInput}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../img/location.png')}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: '#606DAA'
                                }} />
                            <TextInput
                                style={{
                                    color: '#606DAA'
                                }}
                                placeholder={'Kazakhstan'}
                                value={this.state.text}
                                onChangeText={(text) => { this.setState({ text }) }}
                            />
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Screen', { param: this.state.text })}>
                            <Text style={styles.btnText}>Поиск</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        load ?
                            <View style={{
                                marginTop: 32,
                                backgroundColor: '#fff',
                            }}>
                                <ActivityIndicator size={'large'} color={'#606DAA'} />
                            </View> :

                            <View style={styles.body}>
                                <View style={{
                                    padding: 8
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: '#606DAA',
                                        }}>Дата обновление</Text>
                                        <View style={{flexDirection: 'row'}}>
                                        <Text style={{
                                            color: '#C4C4C4'
                                        }}>последнее обновление <Text style={{ color: '#606DAA', }}>{Moment(items.Date).format('ll')}</Text>
                                        </Text>
                                        <TouchableOpacity onPress={()=>this.props.dispatch(fetch())}>
                                        <Image source={require('../img/update.png')} style={{
                                            width:24,
                                            height: 24,
                                            resizeMode: 'contain',
                                            marginLeft:12,
                                            tintColor: '#606DAA',
                                        }}/>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: width * 0.9,
                                        marginTop: 16,
                                        shadowColor: "#606DAA",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        padding: 4,
                                        backgroundColor: '#fff',
                                        borderRadius: 5,
                                        marginLeft: -12
                                    }}>
                                        <View style={{
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: '#FF3030'
                                            }}>Зараженные</Text>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                color: '#FF3030'
                                            }}>{global.TotalConfirmed}</Text>
                                            <Text>(+{global.NewConfirmed})</Text>
                                        </View>
                                        <View style={{
                                            alignItems: 'center'
                                        }}>
                                            <Text>Летальные исходы</Text>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                color: 'rgba(0,0,0,0.75)'
                                            }}>{global.TotalDeaths}</Text>
                                            <Text>(+{global.NewDeaths})</Text>
                                        </View><View style={{
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: '#0CDCB1'
                                            }}>Выздоровевшие</Text>
                                            <Text style={{
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                color: '#0CDCB1'
                                            }}>{global.TotalRecovered}</Text>
                                            <Text>(+{global.NewRecovered})</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>Что нужно знать о Covid-19</Text>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: 'rgba(0,0,0,0.75)',
                                        textAlign: 'center',
                                        marginTop: 5,
                                        marginBottom: 3,
                                        color: '#606DAA',

                                    }}>Симптомы</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',

                                    }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={require('../img/fever.png')}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text>Температура</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={require('../img/cough.png')}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text>Кашель</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={require('../img/shortness.png')}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text>Одышка</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={require('../img/throat.png')}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text>Больное горло</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={require('../img/headache.png')}
                                                style={{
                                                    width: 64,
                                                    height: 64,
                                                    resizeMode: 'contain'
                                                }} />
                                            <Text>Головная боль</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#606DAA',
                                        textTransform: 'capitalize',
                                        marginTop: 8
                                    }}>профилактика</Text>
                                    <View style={{
                                        backgroundColor: '#CBDCF8',
                                        borderRadius: 8,
                                        marginTop: 8
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            paddingHorizontal: 8,
                                            paddingVertical: 8
                                        }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../img/mask.png')}
                                                    style={{
                                                        width: 64,
                                                        height: 64
                                                    }} />
                                                <Text style={{
                                                    maxWidth: '70%',
                                                    textAlign: 'center'
                                                }}>wear a face mask</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../img/cover.png')}
                                                    style={{
                                                        width: 64,
                                                        height: 64
                                                    }} />
                                                <Text style={{
                                                    maxWidth: '60%',
                                                    textAlign: 'center'
                                                }}>cover mouth and nose when coughing</Text>
                                            </View>

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../img/wash.png')}
                                                    style={{
                                                        width: 64,
                                                        height: 64
                                                    }} />
                                                <Text style={{
                                                    maxWidth: '70%',
                                                    textAlign: 'center'
                                                }}>wash your hands frequently</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../img/seek.png')}
                                                    style={{
                                                        width: 64,
                                                        height: 64
                                                    }} />
                                                <Text style={{
                                                    maxWidth: '70%',
                                                    textAlign: 'center'
                                                }}>seek medical care if symptoms appear</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../img/market.png')}
                                                    style={{
                                                        width: 64,
                                                        height: 64
                                                    }} />
                                                <Text style={{
                                                    maxWidth: '70%',
                                                    textAlign: 'center'
                                                }}>avoid markets and crewded places</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                    }
                </View>
            </ScrollView>
        )
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
        zIndex: 99
    },
    img: {
        width: width * 0.8,
        height: height * 0.4,
        position: 'absolute',
        marginTop: 32,
        zIndex: 100,
        resizeMode: 'contain'
    },
    txtInput: {
        height: 40,
        width: width * 0.9,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#606DAA',
        marginTop: height * 0.42,
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
        justifyContent: 'center'
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    body: {
        flexDirection: 'column',
        width: width * 0.9,
    }
})
export default connect(mapStateToProps)(MainScreen)
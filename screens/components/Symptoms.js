import React from 'react'
import {
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const {width,height} = Dimensions.get('screen')

const Symptoms = () => {
    return (
        <View>
            <Text style={styles.txt}>Что нужно знать о Covid-19</Text>
            <Text style={styles.txtSymptoms}>Симптомы</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}>
                <View style={ styles.view }>
                    <Image
                        source={require('../../img/fever.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Температура</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/cough.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Кашель</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/shortness.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Одышка</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 5
            }}>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/throat.png')}
                        style={styles.imgStyle}/>
                    <Text style={styles.txtStyle}>Больное горло</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/headache.png')}
                        style={styles.imgStyle}/>
                    <Text style={styles.txtStyle}>Головная боль</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5
    },
    txtSymptoms:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.75)',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 3,
        color: '#606DAA',
    },
    imgStyle:{
        width: 64,
        height: 64,
        resizeMode: 'contain'
    },
    txtStyle:{
        fontSize: 14,
        textAlign:'center'
    },
    view:{
        alignItems: 'center',
        backgroundColor: '#CBDCF8',
        padding:5,
        borderRadius: 12,
        width: width*0.28
    }
})
export default Symptoms
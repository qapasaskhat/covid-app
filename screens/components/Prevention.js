import React from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

const Prevention = () => {
    return (
        <View>
            <Text style={styles.txt}>профилактика</Text>
            <View style={{
                borderRadius: 8,
                marginTop: 8
            }}>

                <View style={styles.view}>
                    <Image
                        source={require('../../img/mask.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Щеки, рот и нос закрывайте медицинской маской</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/cover.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Закрывайте нос и рот при чихании и кашле</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/wash.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Антисептиками и мылом с водой обрабатывайте руки и поверхности</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/seek.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Только врач может поставит диагноз, вызовите врача если заболели</Text>
                </View>
                <View style={styles.view}>
                    <Image
                        source={require('../../img/market.png')}
                        style={styles.imgStyle} />
                    <Text style={styles.txtStyle}>Избегайте людных мест и контактов с больными людьми</Text>
                </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txtStyle: {
        maxWidth: '75%',
        textAlign: 'auto',
        fontSize: 16,
        marginLeft: 5,
        //color: '#fff',
        fontWeight: '600'
    },
    imgStyle: {
        width: 70,
        height: 70
    },
    view: {
        flexDirection: 'row',
        //marginTop: 5,
        //margin: 8,
        backgroundColor: '#CBDCF8',
        padding: 8,
        borderRadius: 12,
        marginBottom: 8,
        alignItems:'center'
    },
    txt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#606DAA',
        textTransform: 'capitalize',
        marginTop: 16
    }
})
export default Prevention
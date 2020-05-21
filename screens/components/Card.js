import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
const {
    height,
    width
} = Dimensions.get('screen')
const Card = ({global}) =>{
    return(
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
            paddingTop: 8,
            backgroundColor: '#fff',
            borderRadius: 5,
            marginLeft: -12,
            paddingBottom: 8
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
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
export default Card
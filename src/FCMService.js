import messaging from '@react-native-firebase/messaging'
import { Platform } from "react-native";
import type { Notifications,NotificationOpen  } from 'react-native-firebase'

class FCMService {
    register = (onRegister, onNotification, onOpenNotification)=>{
        this.checkPermission(onRegister)
        this.createNotificationListeners(onNotification, onOpenNotification)
    }
    registerAppWithFCM = async()=>{
        if (Platform.OS === 'ios'){
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }
    }
    checkPermission = (onRegister)=>{
        messaging().hasPermission()
        .then(enabled=>{
            if(enabled){
                //user has permissions
                this.getToken(onRegister)
            }else{
                //user doesn't have permissions
                this.requestPermission(onRegister)
            }
        }).catch(error=>{
            console.log('[FCMService] Permission Rejected',error);
            
        })
    }
    getToken = (onRegister) =>{
        messaging().getToken()
        .then(fcmToken=>{
            if(fcmToken){
                onRegister(fcmToken)
            }else{
                console.log("[FCMService] User does not have a device token");
                
            }
        }).catch(error=>{
            console.log('[FCMService] GetToken rejected', error);
            
        })
    }
    requestPermission =(onRegister)=>{
        messaging().requestPermission()
        .then(()=>{this.getToken(onRegister)})
        .catch(error=>{
            console.log('[FCMService] Request Permissions rejected',error);
            
        })
    }
    deleteToken =()=>{
        console.log('[FCMService] deleteToken');
        messaging().deleteToken()
        .catch(error=>{
            console.log(' [FCMService] delete token error',error);
            
        })
    }
    createNotificationListeners = (onRegister, onNotification, onOpenNotification)=>{
        //When the application is runnig, but in the background
        messaging()
        .onNotificationOpenedApp(remoteMessage =>{
            console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background: ',remoteMessage);
            if (remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
        });
        //when the application is opened from a quit state
        messaging()
        .getInitialNotification()
        .then(remoteMessage=>{
            console.log('[FCMService] getInitialNotification Notification caused app to open from quit state: ',remoteMessage);
            if (remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(remoteMessage.notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
            
        });
        this.messageListener = messaging().onMessage(async remoteMessage=>{
            console.log('[FCMService] A new FCM message arrived!', remoteMessage);
            if(remoteMessage){
                let notification = null
                if (Platform.OS === 'ios'){
                    notification = remoteMessage.data.notification
                }else{
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
            
        });
        
        //triggered when have new token
        messaging().onTokenRefresh(fcmToken=>{
            console.log('[FCMService] new token refresh: ',fcmToken);
            onRegister(fcmToken)
        });
    }

    unRegister= ()=>{
        this.messageListener()
    }
}

export const fcmService = new FCMService()
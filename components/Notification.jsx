import { useEffect, useRef, useContext } from "react";
import { View, Text, Animated, Dimensions, Li } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../context/ThemeContext";


const Notification = ({ visible, msg, onDismiss, saved }) => {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const { theme } = useContext(ThemeContext);
    const style = styles(theme);
    const { width: screenWidth } = Dimensions.get("window");
    const navigation = useNavigation();

    useEffect(() => {
        // if visible
        if (visible) {
            // start slide from 0 - 100%
            Animated.timing(widthAnim, {
                toValue: screenWidth > 1024 ? 1040 : screenWidth + 20,
                duration: 5000,
                useNativeDriver: false,
            }).start(() => {
                // wait for 5secs
                setTimeout(() => {
                    onDismiss();
                    if(saved) {
                        navigation.navigate('index');
                    }
                }, 3000);
            })
        } else {
            widthAnim.setValue(0);
        }
    }, [visible, widthAnim, onDismiss]);


    return (
        <View style={{ width: '100%, maxWidth: 1024' }}>
            <Animated.View style={[style.container, { width: widthAnim }]}>

            </Animated.View>
            <Text style={style.text}>
                {msg}
            </Text>
        </View>
    )
};

const styles = (theme) => ({
    container: {
        height: 5,
        backgroundColor: 'green',
        position: 'absolute',
        top: -15,
        left: -15,
        right: 0,
        zIndex: 1000,
        overflow: 'hidden',
    },
    text: {
        position: 'absolute',
        borderRadius: 5,
        top: -10,
        left: 50,
        right: 50,
        zIndex: 1000,
        padding: 20,
        width: 300,
        color: theme.buttonTextColor,
        backgroundColor: theme.buttonBackground,
    }
});

export default Notification;
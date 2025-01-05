import React, { useContext, useState } from "react";
import { Text, View, Image, Pressable, Modal } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const style = styles(theme);

    return (
        <>
        <View style={style.container}>
            <Image source={require('../assets/images/react-logo.png')} style={style.logo} />
            <Text style={style.text}>SmartNote</Text>
            <Pressable style={style.button} onPress={toggleModal}>
                <Entypo name="dots-three-vertical" size={24} color={theme.tint} />
            </Pressable>
        </View>

        {/* Modal Component */}
        <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal} // Close modal on back press (Android)
            >
                <Pressable style={style.modalBackground} onPress={toggleModal}>
                    <View style={style.modalContainer}>
                        <Text style={style.modalText}>Options</Text>
                        <Pressable onPress={() => navigation.navigate("addnote")}>
                            <Text style={style.modalOption}>Add Note</Text>
                        </Pressable>
                        <Pressable onPress={toggleModal}>
                            <Text style={style.modalOption}>Cancel</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
            </>
    );
};

const styles = (theme) => ({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.background,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    button: {
        padding: 8,
    },
    modalBackground: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: theme.background,
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: theme.text,
    },
    modalOption: {
        fontSize: 18,
        color: theme.tint,
        paddingVertical: 10,
    },
});

export default Header;
import React, { useContext, useState } from "react";
import { Text, View, Image, Pressable, Modal, StyleSheet } from "react-native";
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

    const handleNavigate = () => {
        toggleModal();
        navigation.navigate('addnote');
    };

    const style = styles(theme);

    return (
        <>
        <View style={style.container}>
            <Image source={require('../assets/images/icon.png')} style={style.logo} />
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
                onRequestClose={toggleModal}
            >
                <Pressable style={style.modalBackground} onPress={toggleModal}>
                    <View style={style.modalContainer}>
                        <Pressable onPress={handleNavigate}>
                            <Text style={style.modalOption}>Add Note</Text>
                        </Pressable>
                            <Text style={style.modalOption}>Change View</Text>
                        <Pressable onPress={toggleModal}>
                            <Text style={style.modalOption}>Cancel</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
            </>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 1024,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginBottom: 10,
        backgroundColor: theme.background,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    text: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        width: 50,
        height: 50,
    },
    button: {
        padding: 8,
    },
    modalBackground: {
        width: '100%',
        maxWidth: 1024,
        height: "100%",
        // justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        // position: 'relative',
        width: '80%',
        maxWidth: 200,
        marginTop: 60,
        marginRight: 10,
        backgroundColor: theme.background,
        padding: 10,
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
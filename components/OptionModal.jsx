import { useContext } from "react";
import { Modal, View, Pressable, Text, Alert, Platform } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { NoteContext } from "../context/NoteContext";


const OptionModal = ({ toggleVisibility, modalVisible, selectedTodo }) => {
    const { theme } = useContext(ThemeContext);
    const style = styles(theme)
    const { removeNote } = useContext(NoteContext);

    // handle delete
    const handleDelete = (id) => {
        if (Platform.OS === 'web') {
            // Web confirmation using window.confirm()
            const confirmation = window.confirm("Are you sure you want to delete this note?");
            if (confirmation) {
                removeNote(id);
                toggleVisibility();
                alert('Deleted successfully');
            }
        } else {
            // Mobile confirmation using React Native Alert
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this note?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "OK", 
                        onPress: () => {
                            removeNote(id);
                            toggleVisibility();
                            alert('Deleted successfully');
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    };
    

    {/* Modal Component */ }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleVisibility}
        >
            <Pressable style={style.modalBackground} onPress={toggleVisibility}>
                <View style={style.modalContainer}>
                    <Pressable >
                        <Text style={style.modalOption}>Edit Note[{selectedTodo.id}]</Text>
                    </Pressable>
                    <Pressable onPress={()=> handleDelete(selectedTodo.id)}>
                        <Text style={style.modalOption}>Delete Note</Text>
                    </Pressable>
                    <Pressable onPress={toggleVisibility}>
                        <Text style={style.modalOption}>Cancel</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    button: {
        padding: 8,
    },
    modalBackground: {
        width: '100%',
        maxWidth: 1024,
        height: "100%",
        marginHorizontal: "auto",
        paddingTop: '30%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
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

export default OptionModal;
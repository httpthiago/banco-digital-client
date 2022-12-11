import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useFonts } from "expo-font";
import axios from "axios";

export default function CreateAccPage({navigation}) {
    const [nome, setNome] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoPessoaSelected, setTipoPessoaSelected] = useState("PF");
    const [tipoContaSelected, setTipoContaSelected] = useState("CC");
    const [loaded] = useFonts({
        Montserrat: require('../../../assets/fonts/MontserratRegular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    async function finalizarCadastro() {
        const response = await axios.post("http://192.168.100.14:8080/banco-digital/usuario", {
            nome,
            cpfCnpj,
            senha,
            tipoConta: tipoPessoaSelected + tipoContaSelected
        }).then(resultado => {
            Alert.alert("Sucesso!", "Usuário criado com sucesso!");
            navigation.navigate("Start");
        }).catch(err => {
            Alert.alert("Erro", "Ocorreu um erro ao cadastrar usuário");
            console.log(err);
            navigation.navigate("Start");
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.createAccBg}
        >

            <Text style={styles.createAccTitulo}>Criar Conta</Text>

            <TextInput onChangeText={(text) => setNome(text)} style={styles.input} placeholderTextColor="#FFF" placeholder="Nome Completo" />
            <TextInput onChangeText={(text) => setCpfCnpj(text)} style={styles.input} placeholderTextColor="#FFF" placeholder="CPF/CNPJ" />

            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo Pessoa</Text>
                <View style={styles.picker}>
                    <Picker
                        style={{ color: "#FFF", marginLeft: 10, fontFamily: "Montserrat" }}
                        selectedValue={tipoPessoaSelected}
                        onValueChange={(itemValue, itemIndex) =>
                            setTipoPessoaSelected(itemValue)
                        }>
                        <Picker.Item key={0} label="Física" value="PF" />
                        <Picker.Item key={1} label="Jurídica" value="PJ" />
                    </Picker>

                </View>
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo Conta</Text>
                <View style={styles.picker}>
                    <Picker
                        style={{ color: "#FFF", marginLeft: 10, fontFamily: "Montserrat" }}
                        selectedValue={tipoContaSelected}
                        onValueChange={(itemValue, itemIndex) =>
                            setTipoContaSelected(itemValue)
                        }>
                        <Picker.Item key={0} label="Corrente" value="CC" />
                        <Picker.Item key={1} label="Poupança" value="CP" />
                    </Picker>
                </View>
            </View>



            <TextInput onChangeText={(text) => setSenha(text)} secureTextEntry={true} style={styles.input} placeholderTextColor="#FFF" placeholder="Senha" />

            <TouchableOpacity onPress={finalizarCadastro} style={styles.criarAccBtn}>
                <Text style={styles.criarAccTxt}>Finalizar Cadastro</Text>
            </TouchableOpacity>

            {/* <Text>{nome}</Text>
            <Text>{cpfCnpj}</Text>
            <Text>{tipoPessoaSelected}</Text>
            <Text>{tipoContaSelected}</Text>
            <Text>{senha}</Text> */}

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    createAccBg: {
        flex: 1,
        backgroundColor: "#001B2E",
        alignItems: "center",
        paddingTop: 70
    },
    createAccTitulo: {
        color: "#FFF",
        fontSize: 24,
        fontFamily: "Montserrat",
        marginBottom: 30
    },
    input: {
        backgroundColor: "#000",
        color: "#FFF",
        opacity: 0.75,
        width: 320,
        height: 50,
        padding: 15,
        borderRadius: 50,
        marginTop: 15,
        fontFamily: "Montserrat"
    },
    picker: {
        fontFamily: "Montserrat",
        width: 320,
        height: 50,
        backgroundColor: "#000",
        color: "#FFF",
        opacity: 0.75,
        borderRadius: 100,
    },
    pickerLabel: {
        marginVertical: 15,
        fontFamily: "Montserrat", fontSize: 16, color: "#FFF"
    },
    criarAccBtn: {
        backgroundColor: '#0FBB54',
        width: 180,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        borderRadius: 20
    },
    criarAccTxt: {
        color: "#FFF",
        fontFamily: "Montserrat"
    },
});
import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";


export default function StartPage({navigation}) {
    const [loaded] = useFonts({
        Montserrat: require('../../../assets/fonts/MontserratRegular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return <View style={styles.startBg}>
        <StatusBar style="light"/>
        <Image
            source={require("../../img/logo.png")}
            style={styles.imgLogoStart}
        />

        <Text style={styles.bemVindoTxt}>Bem-vindo</Text>

        <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.btnTxt}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate("CreateAccPage")}>
            <Text style={styles.btnTxt}>Criar Conta</Text>
        </TouchableOpacity>


    </View>
}

const styles = StyleSheet.create({
    startBg: {
        flex: 1,
        backgroundColor: "#001B2E",
        alignItems: "center",
        justifyContent: "center"
    },
    imgLogoStart: {
        width: 215,
        height: 142
    },
    bemVindoTxt: {
        fontSize: 24,
        fontFamily: "Montserrat",
        color: "#FFF",
        marginTop: 40
    },
    startBtn: {
        marginTop: 40,
        width: 180,
        height: 44,
        backgroundColor: "#0094FF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    btnTxt: {
        color: "#FFF",
        fontFamily: "Montserrat",
        fontSize: 16,
    }
});
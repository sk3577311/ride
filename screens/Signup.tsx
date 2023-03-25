import background from "../assets/background.png";
import React, { useState,useEffect, Component } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import auth from '@react-native-firebase/auth';
import firebase from "../database/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import user from "./user"
//fonts
import SmallText from "../components/Texts/SmallText";
import BigText from "../components/Texts/BigText";
import RegularButton from "../components/Button/RegularButton";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import {View,Text,TouchableOpacity,TextInput,StyleSheet,Dimensions,ToastAndroid} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
//custom elememnt
import { color } from "../components/colors";
import { Container } from "../components/shared";
const WelcomeContainer = styled(Container)`
  background-color: ${color.secondary};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const TopSection = styled.View`
  width: 100%;
  flex: 1;
  max-height: 55%;
`;
const TopImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: stretch;
`;
const BottomSection = styled.View`
  width: 100%;
  flex: 3;
  justify-content: center;
`;
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .label("Name")
  .required('Please enter a valid name'),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});
const ErrorMessage = ({ errorValue }: { errorValue: any }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);
type props = StackScreenProps<RootStackParamList, "welcome">;
function showToast() {
  ToastAndroid.show("Request sent successfully!", 20);
}
export const Signup: FunctionComponent<props> = ({ navigation }) => {

  function onLoginHandler(values, actions) {
    const { email, password } = values;
    // alert(`Credentials entered. email: ${email}, password: ${password}`);
    navigation.navigate("Default");
  }
  return (
    <>
      <StatusBar style="light" />
      <WelcomeContainer>
        <TopSection>
          <TopImage source={background} />
        </TopSection>
        <BottomSection>
          <BigText
            textstyles={{
              marginBottom: 25,
              textTransform: "uppercase",
              textAlign: "center",
            }}
            childern={"Signup"}
          />
          <View style={styles.container}>
            <Formik
              initialValues={{email: "",password: "" }}
              onSubmit={(values, actions) => {
                onLoginHandler(values, actions);
              }}validationSchema={validationSchema}>
              {({
                handleChange,
                values,
                errors,
                touched,
                handleSubmit,
                handleBlur,
              }) => (
                <>
                  <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    value={values.email}
                    placeholder="Enter email"
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    onBlur={handleBlur("email")}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    value={values.password}
                    placeholder="Enter password"
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                  />
                    <ErrorMessage
                      errorValue={touched.password && errors.password}
                    />
                  <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    value={values.password}
                    placeholder="Enter password"
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                  />
                  <ErrorMessage
                    errorValue={touched.password && errors.password}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{navigation.navigate('Login')}}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Already registred? login</Text>
                  </TouchableOpacity>

                </>
              )}
            </Formik>
          </View>
        </BottomSection>
      </WelcomeContainer>
    </>
  );
};


const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 2,
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },
  input: {
    marginVertical: 10,
    width: "100%",
    borderColor: "lightgray",
    height: 50,
    borderWidth: 2,
    padding: 18,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: 44,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

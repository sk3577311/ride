import background from "../assets/background.png";
import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
//fonts
import SmallText from "../components/Texts/SmallText";
import BigText from "../components/Texts/BigText";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import { SocialIcon, Input } from "react-native-elements";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { color } from "../components/colors";
import { Container } from "../components/shared";
import firebase from "../database/firebase";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

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
  flex: 2;
  justify-content: center;
`;
const validationSchema = Yup.object().shape({
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

export const Login: FunctionComponent<props> = ({ navigation }) => {
  function onLoginHandler(values, actions) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    navigation.navigate('Home')
  }

  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useAuthRequest({
    scopes:["email","profile"],
    redirectUri:makeRedirectUri({
      native:"60807856972-ipdidvrf68ljj549lr5v1f70ta369pr4.apps.googleusercontent.com"
    }),
    expoClientId:
      "60807856972-ipdidvrf68ljj549lr5v1f70ta369pr4.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === 'success') {
        const authentication = response;
        getGoogleUser(authentication.accessToken)
    }
 }, [response]);
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
            childern={"Login"}
          />
          <View style={styles.container}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                onLoginHandler(values, actions);
              }}
              validationSchema={validationSchema} >
              {({
                handleChange,
                values,
                errors,
                touched,
                handleSubmit,
                handleBlur,
              }) => (
                <>
                  <Input
                    placeholder="Enter Your Email Address"
                    leftIcon={{ type: "font-awesome", name: "user" }}
                    style={styles}
                    numberOfLines={1}
                    value={values.email}
                    placeholder="Enter email"
                    onChangeText={handleChange("email")}
                    inlineImageLeft="username"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    onBlur={handleBlur("email")}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />

                  <Input
                    placeholder="Enter Your Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    style={styles}
                    numberOfLines={1}
                    value={values.password}
                    placeholder="Enter password"
                    textContentType="newPassword"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                  />
                  <ErrorMessage
                    errorValue={touched.password && errors.password}
                  />
                  <TouchableOpacity
                    onPress={()=>{handleSubmit}}
                    style={styles.buttonContainer}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Dont have an account?</Text>
                  </TouchableOpacity>
                  <SmallText
                    textstyles={{
                      marginBottom: 10,
                      fontSize: 14,
                      color: "#000",
                    }}
                    childern={"Or"}
                  />
                  <View style={styles.socialIcon}>
                    <TouchableOpacity>
                      <SocialIcon type="twitter" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <SocialIcon type="facebook" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <SocialIcon
                        type="google"
                        disabled={!request}
                        onPress={() => {
                          promptAsync({useProxy: true});
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <SocialIcon type="github" />
                    </TouchableOpacity>
                  </View>
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
  socialIcon: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  errorContainer: {
    marginVertical: 1,
    borderColor: "#000",
  },
  errorText: {
    color: "red",
    textAlign: "center",
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

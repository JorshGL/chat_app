import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";

const register_url = "/"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Auth = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [matchpass, setMatchpass] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pass);

    const res = await axios.post(
      register_url,
      JSON.stringify({ user, pass, matchpass }),
      {
        headers: { authorization: "*", "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
  };

  return (
    <SafeAreaView>
      {page === 1 && (
        <View style={tw`bg-gray-500`}>
          <View style={tw`flex items-center py-32`}>
            <Text style={tw`text-white text-2xl font-bold`}>Get started</Text>
            <View style={tw`flex flex-row`}>
              <View style={tw`pr-4`}>
                <Button
                  onPress={() => setPage(2)}
                  title="Register"
                  color={"black"}
                />
              </View>
              <Button
                onPress={() => setPage(3)}
                title="Login"
                color={"black"}
              />
            </View>
          </View>
        </View>
      )}
      {page === 2 && (
        <View style={tw`bg-gray-500 flex items-center py-32`}>
          <Text style={tw`text-white text-2xl font-bold`}>Register</Text>
          <View style={tw``}>
            <Text>Name</Text>
            <TextInput
              style={tw`border`}
              onChangeText={(newText) => setName(newText)}
              defaultValue={name}
            />
            <Text>User</Text>
            <TextInput
              style={tw`border`}
              onChangeText={(newText) => setUser(newText)}
              defaultValue={user}
            />
            <Text>Password</Text>
            <TextInput
              style={tw`border`}
              onChangeText={(newText) => setPass(newText)}
              defaultValue={pass}
              secureTextEntry={true}
            />
            <Button onPress={handleSubmit()} title="Register" />
          </View>
        </View>
      )}
      {page === 3 && (
        <View>
          <Text>Auth3</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Auth;

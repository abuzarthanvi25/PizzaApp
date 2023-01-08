import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function SignUp({navigation}) {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);

  let signupuser = () => {
    setLoading(true);
    console.log(model);
    auth()
      .createUserWithEmailAndPassword(model.email, model.password)
      .then(res => {
        setLoading(false);
        console.log(res);
        console.log(res.user.uid);
        database()
          .ref(`users/${res.user.uid}`)
          .set(model)
          .then(() => {
            setLoading(false);
            navigation.navigate('Login Screen', res.user.uid);
          })
          .catch(dbError => {
            setLoading(false);
            console.log(dbError);
          });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <ImageBackground
        style={styles.background}
        source={{
          uri: 'https://i.pinimg.com/736x/79/81/0b/79810bab237f5f61b7aa22eec12f9a89.jpg',
        }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Sign Up</Text>
          </View>
          <View>
            <TextInput
              onChangeText={e => setModel({...model, email: e})}
              placeholderTextColor={'#B05D5D'}
              placeholder="Email"
              style={styles.input}
              keyboardType={'email-address'}
            />
          </View>
          <View>
            <TextInput
              onChangeText={e => setModel({...model, password: e})}
              placeholderTextColor={'#B05D5D'}
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity onPress={signupuser} style={styles.button}>
              <Text style={styles.btnText}>
                {loading ? (
                  <ActivityIndicator size={20} color="white" />
                ) : (
                  'Sign Up'
                )}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login Screen')}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#AC0000',
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 5,
    color: '#8E0000',
    fontSize: 16,
    padding: 10,
    borderRadius: 50,
    opacity: 0.9,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    color: '#7A0900',
    // fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#7A0900',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
    borderRadius: 30,
    borderColor: '#6B0000',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#7A0900',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  forgotPassword: {
    color: '#000',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 25,
  },
  container: {
    height: '45%',
    borderTopLeftRadius: 50,
    borderTopColor: '#E67D01',
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
  },
});

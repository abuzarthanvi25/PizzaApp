import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let loginUser = () => {
    setLoading(true);
    console.log(email);
    console.log(password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setLoading(false);
        console.log(res.user.uid);
        ToastAndroid.show('Logged In Successfully', 800);
        navigation.navigate('Landing Screen', {
          userId: res.user.uid,
        });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Alert.alert(err);
      });
  };
  return (
    <>
      <ImageBackground
        style={styles.background}
        source={{
          uri: 'https://cdn4.vectorstock.com/i/1000x1000/23/53/stock-design-cover-for-pizza-boxes-vector-14342353.jpg',
        }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Log In</Text>
          </View>
          <View>
            <TextInput
              onChangeText={e => setEmail(e)}
              placeholderTextColor={'#B05D5D'}
              placeholder="Email"
              style={styles.input}
              keyboardType={'email-address'}
            />
          </View>
          <View>
            <TextInput
              onChangeText={e => setPassword(e)}
              placeholderTextColor={'#B05D5D'}
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
              keyboardType={'email-address'}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={loading}
              onPress={loginUser}
              style={styles.button}>
              <Text style={styles.btnText}>
                {loading ? (
                  <ActivityIndicator size={20} color="white" />
                ) : (
                  'Login'
                )}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup Screen')}>
              <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Landing Screen')}>
              <Text style={styles.skiplink}>Skip Login</Text>
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
  skiplink: {
    color: 'grey',
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 20,
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

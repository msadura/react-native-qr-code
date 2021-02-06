import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';
import QRCode from 'react-native-qr-code';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [imgUri, setImgUri] = useState('');
  const qrRef = useRef();

  const setQr = () => {
    setQrValue(inputValue);
    setImgUri('');
  };

  const saveQr = async () => {
    const uri = await qrRef.current.saveImg();
    setImgUri(uri);
    console.log('🔥 generated image uri: ', uri);
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.container}>
        <Text style={styles.title}>react-native-qr-code-example</Text>
        <View style={styles.info}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter qr code value"
          />
          <TouchableOpacity style={styles.button} onPress={setQr}>
            <Text style={styles.buttonText}>GENERATE CODE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.greenBg]} onPress={saveQr}>
            <Text style={styles.buttonText}>SAVE CODE</Text>
          </TouchableOpacity>
        </View>

        {!!imgUri && (
          <View style={styles.uriInfo}>
            <Text>Generated img uri: {'\n'}{imgUri}</Text>
          </View>
        )}

        <View style={styles.qrContainer}>
          <QRCode size={200} value={qrValue} outerSpacing={30} ref={qrRef} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20
  },
  fill: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#0085FF',
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#0085FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  greenBg: {
    backgroundColor: '#32ba81'
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  uriInfo: {
    marginTop: 10
  }
});

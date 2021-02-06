import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeGenerator from 'qrcode';

let ViewShot = null;
try {
  ViewShot = require('react-native-view-shot').default;
} catch (e) {}

function QRCode(
  {
    size = 200,
    value,
    color = 'black',
    backgroundColor = 'white',
    errorCorrection = 'medium',
    outerSpacing = 0,
  },
  ref,
) {
  const [qrData, setQrData] = useState(null);
  const qrViewRef = useRef();

  const generateQR = useCallback(async (text, errorCorrectionLevel) => {
    try {
      const res = await QRCodeGenerator.create(text, {errorCorrectionLevel});
      setQrData(res.modules);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (value) {
      generateQR(value, errorCorrection);
    } else {
      setQrData(null);
    }
  }, [errorCorrection, generateQR, value]);

  const saveImg = async () => {
    if (!ViewShot) {
      console.warn(
        'react-native-view-shot library not installed. Cannot generate image',
      );
    }
    try {
      const uri = await qrViewRef.current.capture();
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  useImperativeHandle(ref, () => ({
    saveImg,
  }));

  if (!qrData) {
    return null;
  }

  const rows = getRows(Array.from(qrData.data), qrData.size);
  const blockSize = Math.floor(size / qrData.size);

  return (
    <ViewShot ref={qrViewRef}>
      <View style={{margin: outerSpacing}}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((block, blockIndex) => (
              <View
                key={blockIndex}
                style={[
                  {
                    width: blockSize,
                    height: blockSize,
                    backgroundColor: block ? color : backgroundColor,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </ViewShot>
  );
}

function getRows(array, rowSize) {
  let rows = [];
  for (let i = 0; i < array.length; i += rowSize) {
    rows.push(array.slice(i, i + rowSize));
  }
  return rows;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default forwardRef(QRCode);

# react-native-qr-code
React Native component for generating and displaying qr codes. Uses js library [node-qrcode](https://github.com/soldair/node-qrcode) for generating qr code data. Uses pure react-native solution to display generated code, does not need additional dependencies to render code on screen.

![](Example/btn_anim.gif)

# Saving code as image
Library will use [react-native-view-shot](https://github.com/gre/react-native-view-shot) to save generated code as image. If you need this feature you should install and link this library in your project.

NOTE: This is needed only if you want to save code as image, code can be generated without this dependency.

# Usage
Install module:
```
npm install --save react-native-qr-code
```

or

```
yarn add react-native-qr-code
```

Import component and use it in your app:
```js
import QRCode from 'react-native-qr-code';

export default function App() {
  const qrRef = useRef();

  const saveQrAsImg = async () => {
    const uri = qrRef.current.saveImg();
    console.log('QR code img uri: ', uri);
  }

  return (
      <View>
        <QRCode
          value="https://github.com/msadura/react-native-qr-code"
          size={200}
          ref={qrRef}
        />
      </View>
  );
}
```

# CyberButton props
| Props                | Type          | Description  | Default      |
| --------------------- |:-------------:| ------------ | ------------ |
| `value`  | `string` | Value of code to be generated.| `''` |
| `size` | `Integer`     | Used as height andf width of generated QR code. |`200` |
| `color`  | `string` | Qr code main color.| `black` |
| `backgroundColor`  | `string` | QR code background color (empty blocks).| `white` |
| `errorCorrection`  | `low | medium | quartile | high` | Error correction level. See [node-qrcode docs](https://github.com/soldair/node-qrcode#error-correction-level) for more details.| `medium` |
| `outerSpacing`  | `number` | Margin around generated QR code. Will also be used as spacing when saving as image | `0` |

# CyberButton instance methods
`saveImg` - Async method to generate image out of current QR code and return temp uri.

# React Native Epicode Academy
This package is a part of [React Native Epicode Academy](https://www.youtube.com/channel/UCjeodJlopQe4b91Y-uS18Ow) YouTube series.


import React, {Fragment, Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';

export default class ImageScreen extends Component {
  state = {
    fileUri: '',
    showFullScreen: false,
  };

  chooseImage = () => {
    let options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          fileUri: response.uri,
        });
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          fileUri: response.uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      if (this.state.showFullScreen) {
        return (
          <Modal
            visible={this.state.showFullScreen}
            animationType="slide"
            transparent={true}>
            <View style={styles.modal}>
              <Image
                source={{uri: this.state.fileUri}}
                style={styles.images1}
              />
              <TouchableOpacity
                onPress={() => this.setState({showFullScreen: false})}
                style={styles.closeButton}>
                <Image
                  source={require('./Close1.png')}
                  style={styles.imageClose}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => this.setState({showFullScreen: true})}>
            <Image source={{uri: this.state.fileUri}} style={styles.images} />
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            ToastAndroid.show(
              'Please select a image',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            )
          }>
          <Image source={require('./dummy.png')} style={styles.images} />
        </TouchableOpacity>
      );
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.ImageScreen}>
            <Text
              style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
              Pick Images from Camera & Gallery
            </Text>
            <View style={styles.imageToDisplay}>{this.renderFileUri()}</View>
            <View style={styles.btnParentSection}>
              <TouchableOpacity
                onPress={this.chooseImage}
                style={styles.buttons}>
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.launchCamera}
                style={styles.buttons}>
                <Text style={styles.btnText}>Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.launchImageLibrary}
                style={styles.buttons}>
                <Text style={styles.btnText}>Launch Image Library</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'grey',
  },

  ImageScreen: {
    backgroundColor: '#f1f1f6',
    justifyContent: 'center',
    borderColor: 'black',
    height: '100%',
    alignItems: 'center',
  },
  imageToDisplay: {
    padding: 20,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  images1: {
    height: '70%',
    width: '90%',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttons: {
    width: 225,
    height: 50,
    backgroundColor: '#be9fe1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageClose: {
    height: 30,
    width: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

import React, {Fragment, Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {getText} from '../../Store/Action/ActionCreators';
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

class ImageScreen extends Component {
  state = {
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
        ToastAndroid.show(
          'Image has been cancelled',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (response.error) {
        ToastAndroid.show(
          'Something had gone wrong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        this.props.getTextFromImage(response.uri);
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
        ToastAndroid.show(
          'Image has been cancelled',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (response.error) {
        ToastAndroid.show(
          'Something had gone wrong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        this.props.getTextFromImage(response.uri);
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
      if (response.didCancel) {
        ToastAndroid.show(
          'Image has been cancelled',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (response.error) {
        ToastAndroid.show(
          'Something had gone wrong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        this.props.getTextFromImage(response.uri);
      }
    });
  };

  renderFileUri() {
    if (this.props.imageUri) {
      if (this.state.showFullScreen) {
        return (
          <Modal
            visible={this.state.showFullScreen}
            animationType="slide"
            transparent={true}>
            <View style={styles.modal}>
              <Image
                source={{uri: this.props.imageUri}}
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
            <Image source={{uri: this.props.imageUri}} style={styles.images} />
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
            <Text style={styles.heading}>
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
  ImageScreen: {
    backgroundColor: '#f1f1f6',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    paddingBottom: 10,
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
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttons: {
    width: 225,
    height: 50,
    backgroundColor: '#be9fe1',
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

const mapStateToProps = state => {
  return {
    imageUri: state.ImageReducer.imageUri,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTextFromImage: imageUri => dispatch(getText(imageUri)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageScreen);

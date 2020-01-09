import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {changeTheText} from '../../Store/Action/ActionCreators';
const TextScreen = props => {
  return (
    <View style={Styles.textScreen}>
      <Text style={Styles.heading}>Text from Image</Text>
      <ScrollView style={Styles.textContainer}>
        {props.text.length > 0 ? (
          <TextInput
            multiline
            style={Styles.textStyle}
            onChangeText={value => props.changeText(value)}
            value={props.text}
            editable
            autoCorrect={false}
          />
        ) : (
          <Text style={Styles.textStyle}>No image.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  textScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f6',
  },
  textContainer: {
    width: '80%',
    padding: 20,
    margin: 10,
    backgroundColor: '#6c7b95',
    height: '10%',
    maxHeight: '50%',
  },
  textStyle: {
    lineHeight: 30,
    color: 'white',
  },
  heading: {
    fontSize: 20,
    paddingBottom: 10,
  },
});

const mapStateToProps = state => {
  return {
    text: state.ImageReducer.text,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeText: value => dispatch(changeTheText(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextScreen);

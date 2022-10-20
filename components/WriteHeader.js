import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}) {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.pop();
  };

  const [mode, setMode] = useState('date');
  const [display, setDisplay] = useState('display')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onPressDate = () => {
    setMode('date');
    setDisplay('calendar');
    setDatePickerVisibility(true);
  };

  const onPressTime = () => {
    setMode('time');
    setDisplay('clock');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    onChangeDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.block}>
      
      <View style={styles.center}>
        <Pressable onPress={onPressDate}>
          <Text style={styles.text}>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.separator} />        
        <Pressable onPress={onPressTime}>
          <Text style={styles.text}>{format(new Date(date), 'p', {locale: ko,})}</Text>
        </Pressable>        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={onConfirm}
          onCancel={hideDatePicker}
          minuteInterval= '10'
          textColor='white'
          />
      </View>

      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 60,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 15,
  },
  text:{
    fontSize: 18,
  },
});

export default WriteHeader;

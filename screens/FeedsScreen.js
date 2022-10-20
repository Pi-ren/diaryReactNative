import React, {useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import FeedList from '../components/FeedList';
import FloatingSearchButton from '../components/FloatingSearchButton';
import LogContext from '../contexts/LogContext';

function FeedsScreen() {
  const {logs} = useContext(LogContext);
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingSearchButton hidden={hidden} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsScreen;

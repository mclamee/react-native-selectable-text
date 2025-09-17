import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SelectableTextView } from 'react-native-selectable-text';

export default function App() {
  const [selectedText, setSelectedText] = useState('');
  const handleSelection = (event: {
    chosenOption: string;
    highlightedText: string;
  }) => {
    const { chosenOption, highlightedText } = event;
    Alert.alert(
      'Selection Event',
      `Option: ${chosenOption}\nSelected Text: ${highlightedText}`
    );
    console.log('Selection event:', event);
    setSelectedText(highlightedText);
  };

  return (
    <View style={styles.container}>
      <Text>Selected Text: {selectedText}</Text>
      <Text selectable>
        Regular text
      </Text>
      <SelectableTextView
        menuOptions={['look up', 'copy', 'share']}
        onSelection={handleSelection}
        style={{ marginBottom: 20, marginHorizontal: 20 }}
      >
        <Text style={{ color: 'black' }}>
          This text is black{' '}
          <Text style={{ textDecorationLine: 'underline', color: 'red' }}>
            This text is underlined and red
          </Text>{' '}
          This text is black again, and all of it is selectable
        </Text>
      </SelectableTextView>

      <SelectableTextView
        menuOptions={['Action 1', 'Action 2']}
        onSelection={handleSelection}
      >
        <Text>This is just one line of text that you can select</Text>
      </SelectableTextView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

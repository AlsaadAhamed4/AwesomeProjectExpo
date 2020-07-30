import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listContainer}
                data={route.params.colors}
                keyExtractor={(item) => item.hexCode}
                renderItem={({ item }) => (
                    <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        marginVertical: 30,
    },
});

export default ColorPalette;
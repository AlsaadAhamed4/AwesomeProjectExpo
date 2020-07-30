import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const PaletteView = ({ colorPalette, handlePress }) => {
    return (
        <TouchableOpacity style={styles.link} onPress={handlePress}>
            <Text style={styles.text}>{colorPalette.paletteName} Color Palettes</Text>
            <FlatList
                horizontal={true}
                data={colorPalette.colors.slice(0, 5)}
                keyExtractor={(item) => item.colorName}
                renderItem={({ item }) => (
                    <View style={[styles.colorBox, { backgroundColor: item.hexCode }]} />
                )}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link: {
        marginBottom: 5,
        marginTop: 5,
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    colorBox: {
        width: 30,
        height: 30,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
    },
});

export default PaletteView;
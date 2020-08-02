import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, RefreshControl, FlatList, TouchableOpacity, Text } from 'react-native'
import PaletteView from '../components/PaletteView';

const Home = ({ navigation, route }) => {

    const newColorPalette = route.params ? route.params.newColorPalette : null;

    const [allColors, setAllColors] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchColors = useCallback(async () => {
        const allData = await fetch('https://color-palette-api.kadikraman.now.sh/palettes')
            .then((result) => result.json())
            .catch((error) => console.log(error));
        setAllColors(allData);
    }, [],
    );

    const handleRefreshing = useCallback(
        async () => {
            setIsRefreshing(true);
            await fetchColors();
            setIsRefreshing(false);
        },
        [],
    )

    useEffect(() => {
        fetchColors();
    }, []);

    useEffect(() => {
        if (newColorPalette) {
            setAllColors(current => [newColorPalette, ...current]);
        }
    }, [newColorPalette]);


    return (
        <FlatList
            style={styles.list}
            data={allColors}
            keyExtractor={(item) => item.paletteName}
            renderItem={({ item }) => (
                <PaletteView handlePress={() => navigation.push('ColorPalette', item)} colorPalette={item} />
            )}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshing} />}
            ListHeaderComponent={
                <TouchableOpacity style={{ padding: 10 }} onPress={() => { navigation.push('AddColorPaletteModal') }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "teal" }}>+ Color Scheme</Text>
                </TouchableOpacity>
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
});

export default Home;
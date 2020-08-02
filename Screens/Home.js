import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import PaletteView from '../components/PaletteView';

const Home = ({ navigation }) => {

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


    return (
        <FlatList
            style={styles.list}
            data={allColors}
            keyExtractor={(item) => item.paletteName}
            renderItem={({ item }) => (
                <PaletteView handlePress={() => navigation.push('ColorPalette', item)} colorPalette={item} />
            )}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshing} />}
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
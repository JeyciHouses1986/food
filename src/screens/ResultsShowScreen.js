import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import yelp from "../api/yelp";
import Lightbox from 'react-native-lightbox';

const ResultShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const id = navigation.getParam('id');

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data);
    };
    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) {
        return null;
    }

    const { display_address } = result.location;

    const images = result.photos.map(photo => ({ url: photo }));

    const openGallery = (index) => {
        setImageIndex(index);
        navigation.navigate('GalleryModal');
    };

    return (
        <View style={styles.container} >
            <Text style={styles.name} >{result.name}</Text>
            <FlatList
                data={display_address}
                keyExtractor={(address) => address}
                renderItem={({ item }) => <Text style={styles.address} >{item}</Text>}
            />
            <FlatList
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => (
                    <Lightbox>
                        <Image style={styles.image} source={{ uri: item }} />
                    </Lightbox>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    name: {
        textAlign: 'center',
        fontSize: 70,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 'auto',
    },
    image: {
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'black',
        height: 200,
        width: 400,
    }
});

export default ResultShowScreen;
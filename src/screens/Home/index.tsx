import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import api from "../../services/api";
import { Dimensions } from "react-native";
import MarkerIcon from "../../assets/images/marker.svg";
import Loading from "../../components/Loading";

import { Container } from "./style";

const { width } = Dimensions.get("window");

type Coords = {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
};

interface ILocation {
  id: string;
  created_at: string;
  latitude: number;
  longitude: number;
  user_id: string;
}

interface initialLocation {
  coords: Pick<Coords, "latitude" | "longitude">;
}

export default function Home() {
  const [location, setLocation] = useState<initialLocation>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [infetedLocations, setInfetedLocations] = useState([]);
  const [denyLocation, setDenyLocation] = useState(false);

  useEffect(() => {
    async function loadIntectedLocation() {
      const { data } = await api.get("/infected");
      setInfetedLocations(data);
    }
    loadIntectedLocation();
  }, []);

  useEffect(() => {
    async function loadLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setDenyLocation(true);
        return;
      }

      watchPositionChange();
    }
    loadLocation();
  }, []);

  const watchPositionChange = async () => {
    const user = await AsyncStorage.getItem("userInfo");
    const token = await AsyncStorage.getItem("token");
    if (user && token) {
      const headerConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { id } = JSON.parse(user);
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000000,
          distanceInterval: 10,
        },
        async (currentLocation) => {
          setLocation(currentLocation);
          if (
            currentLocation.coords.latitude !== location.coords.latitude &&
            currentLocation.coords.longitude !== location.coords.longitude
          ) {
            await api.post(
              "/location",
              {
                user_id: id,
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              },
              headerConfig
            );
          }
        }
      );
    }
  };

  return (
    <Container>
      {location.coords.latitude === 0 || denyLocation ? (
        <Loading />
      ) : (
        <MapView
          style={{ width: width, height: "100%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={location.coords}>
            <MarkerIcon height="45" width="45" />
          </Marker>
          {infetedLocations?.map((location: ILocation) => (
            <Circle
              center={{
                latitude: Number(location.latitude),
                longitude: Number(location.longitude),
              }}
              radius={150}
              fillColor="rgba(255, 0, 0, 0.2)"
              strokeColor="rgba(255, 0, 0, 0.5)"
              zIndex={2}
              strokeWidth={2}
              key={location.id}
            />
          ))}
        </MapView>
      )}
    </Container>
  );
}

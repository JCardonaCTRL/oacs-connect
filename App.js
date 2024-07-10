import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store/index";
import { PersistGate } from "redux-persist/integration/react";

export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {Platform.OS === "ios" && (
            <StatusBar barStyle="default" translucent />
          )}
          <AppNavigator enableURLHandling={true} />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123",
  },
});

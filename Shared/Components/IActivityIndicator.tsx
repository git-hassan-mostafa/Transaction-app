import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

function IActivityIndicator() {
  return <ActivityIndicator size={50} style={styles.activityIndicator} />;
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(IActivityIndicator);

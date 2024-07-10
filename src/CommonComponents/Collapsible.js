import React, { useState } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "react-native";

export const Collapsable = ({ title, child }) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapse isExpanded={open} onToggle={(isExpanded) => setOpen(isExpanded)}>
      <CollapseHeader>
        <View style={styles.header}>
          <View style={styles.titleArea}>
            <Text numberOfLines={1} style={styles.title}>
              {title.length < 35 ? `${title}` : `${title.substring(0, 35)}...`}{" "}
            </Text>
          </View>
          <Icon name={open ? "minus" : "plus"} size={20} color="#777" />
        </View>
      </CollapseHeader>
      <CollapseBody>{child}</CollapseBody>
    </Collapse>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    padding: 10,
    marginTop: 5,
    alignItems: "flex-start",
  },
  titleArea: { flex: 1, flexDirection: "column" },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
    alignSelf: "flex-start",
  },
};

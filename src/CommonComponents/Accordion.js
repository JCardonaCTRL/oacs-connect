import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "react-native";

export const Accordion = ({ list }) => {
  return (
    <AccordionList
      list={list}
      header={_head}
      body={_body}
      keyExtractor={(item) => item.id}
      expandedIndex={0}
    />
  );
};

const _head = (item, index, isExpanded) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleArea}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title.length < 35
            ? `${item.title}`
            : `${item.title.substring(0, 35)}...`}{" "}
        </Text>
      </View>
      <Icon name={isExpanded ? "minus" : "plus"} size={20} color="#777" />
    </View>
  );
};

const _body = (item) => {
  return item.body;
};

const styles = {
  header: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    padding: 7,
    marginTop: 1,
    alignItems: "flex-start",
  },
  titleArea: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
    alignSelf: "flex-start",
  },
};

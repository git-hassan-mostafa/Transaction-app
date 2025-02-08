import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import CustomDropDownType from "./CustomDropDownComponent.types";
import styles from "./CustomDropDownComponent.style";

export default function CustomDropDown({
  value,
  setValue,
  data,
}: CustomDropDownType) {
  useEffect(() => {
    data.sort((a, b) =>
      a.label
        .toLocaleString()
        .localeCompare(b.label.toString(), undefined, { sensitivity: "base" })
    );
  }, []);

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="بحث..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}

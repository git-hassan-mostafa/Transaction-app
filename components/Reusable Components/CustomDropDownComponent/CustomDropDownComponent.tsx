import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./CustomDropDownComponent.style";
import IDropDownType from "@/Global/Types/IDropDownType";

export default function CustomDropDown({
  value,
  setValue,
  data,
}: IDropDownType) {
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

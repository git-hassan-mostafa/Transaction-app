import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./CustomDropDownComponent.style";
import IDropDownType from "@/Global/Types/IDropDownType";

export default function CustomDropDown(props: IDropDownType) {
  props.data.sort((a, b) =>
    a.label
      .toLocaleString()
      .localeCompare(b.label.toString(), undefined, { sensitivity: "base" })
  );

  return (
    <View style={props.dropDownContainerStyle}>
      <Dropdown
        style={[styles.dropdown, props.dropDownStyle]}
        placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        data={props.data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="بحث..."
        placeholder={props.placeholder ?? "اختر من القائمة"}
        value={props.value}
        onChange={(item) => {
          props.setValue(item.value);
        }}
      />
    </View>
  );
}

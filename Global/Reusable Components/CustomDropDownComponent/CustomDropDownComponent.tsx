import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./CustomDropDownComponent.style";
import IDropDownType from "@/Global/Types/IDropDownType";
import i18n from "@/Global/I18n/I18n";

export default function CustomDropDown(props: IDropDownType) {
  props?.data?.sort((a, b) =>
    a.label
      ?.toLocaleString()
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
        search={props.search || false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder={i18n.t("search") + "..."}
        placeholder={props.placeholder ?? i18n.t("select-from-list")}
        value={props.value}
        onChange={(item) => {
          props.setValue(item.value);
        }}
      />
    </View>
  );
}

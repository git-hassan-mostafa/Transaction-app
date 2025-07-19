import React, { useMemo } from "react";
import IDropDownType from "@/Shared/Types/IDropDownType";
import IDropDownItem from "../Types/IDropDownItem";
import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "./ThemedText";
import Constants from "../Constants/Constants";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import i18n from "../I18n/I18n";

const DropDown = (props: IDropDownType) => {
  const data = useMemo<IDropDownItem[]>(() => {
    return (
      props?.data?.sort((a, b) =>
        a.label
          ?.toLocaleString()
          .localeCompare(b.label.toString(), undefined, { sensitivity: "base" })
      ) ?? []
    );
  }, [props.data]);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <ThemedText style={styles.textItem}>{item.label}</ThemedText>
        {item.value === props.value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={props.search || true}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={i18n.t("select-from-list") + "..."}
      searchPlaceholder={i18n.t("search") + "..."}
      value={props.value}
      onChange={(item: IDropDownItem) => props.setValue(item.value || -1)}
      renderItem={renderItem}
    />
  );
};

export default React.memo(DropDown);

const styles = StyleSheet.create({
  dropdown: {
    // height: 50,
    borderColor: Constants.colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,

    color: Constants.colors.darkGray,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
});

import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import styles from "./AddProduct.style";
import useAddProductService from "./AddProduct.service";
import CustomDropDown from "@/Global/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import IAddItemProps from "@/ViewModels/Products/IAddProductProps";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";

export default function AddProduct(props: IAddItemProps) {
  const service = useAddProductService(props);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("product-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("please-enter-product-name") + "..."}
          placeholderTextColor="#999"
          value={service.product.productName}
          onChangeText={service.setProductName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("product-price")}</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={"00.00"}
          placeholderTextColor="#999"
          value={service.product.productPrice?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setProductPrice(text)}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>
          {i18n.t("product-quantity")}
        </ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={"0"}
          placeholderTextColor="#999"
          value={service.product.productQuantity?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setProductQuantity(text)}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("provider")}</ThemedText>
        <CustomDropDown
          value={service.product.product_ProviderId}
          setValue={(value) => service.setProvider(value as number)}
          data={service.providers}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={service.product.productNotes}
          onChangeText={service.setProductNotes}
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.products}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={service.addProduct}
        >
          <ThemedText style={styles.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}

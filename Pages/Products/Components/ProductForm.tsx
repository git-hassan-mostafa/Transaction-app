import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import Constants from "@/Shared/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../../Shared/Reusable Components/HelperComponents/ThemedText";
import useProductFormService from "./ProductForm.service";
import CustomDropDown from "@/Shared/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import ValidationMessage from "@/Shared/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Shared/I18n/I18n";
import formStyle from "@/Shared/Styles/form.style";
import IProductFormProps from "@/Models/Products/IProductFormProps";

export default function ProductForm(props: IProductFormProps) {
  const service = useProductFormService(props);

  return (
    <View style={formStyle.container}>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("product-name")}
        </ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={i18n.t("please-enter-product-name") + "..."}
          placeholderTextColor="#999"
          value={service.product.productName}
          onChangeText={service.setProductName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("product-price")}
        </ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={"00.00"}
          placeholderTextColor="#999"
          value={service.product.productPrice?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setProductPrice(text)}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("product-quantity")}
        </ThemedText>
        <TextInput
          style={formStyle.input as StyleProp<TextStyle>}
          placeholder={"0"}
          placeholderTextColor="#999"
          value={service.product.productQuantity?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setProductQuantity(text)}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("provider")}</ThemedText>
        <CustomDropDown
          value={service.product.product_ProviderId}
          setValue={(value) => service.setProvider(value as number)}
          data={service.providers}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[formStyle.input, formStyle.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={service.product.productNotes}
          onChangeText={service.setProductNotes}
        />
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.products}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={service.save}
        >
          <ThemedText weight={400} style={formStyle.saveText}>
            {i18n.t("save")}
          </ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}

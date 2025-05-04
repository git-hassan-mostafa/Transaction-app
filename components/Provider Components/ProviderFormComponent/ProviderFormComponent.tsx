import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./ProviderFormComponent.style";
import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useProviderFormComponentService from "./ProviderFormComponent.service";
import { ThemedText } from "../../HelperComponents/ThemedText";
import { IProviderFormProps } from "@/Global/ViewModels/Providers/IProviderFormProps";
export function ProviderFormComponent({
  id,
  updateFromProvidersList,
  deleteFromProvidersList,
}: IProviderFormProps) {
  const {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    updateProviderName,
    updateProviderPhonember,
    setProviderNotes,
    updateProviderNotes,
  } = useProviderFormComponentService({
    id,
    updateFromProvidersList,
    deleteFromProvidersList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.pricesRow}>
        <View style={[styles.pricesContainer, styles.borrowedConainer]}>
          <ThemedText style={styles.price}>
            ${provider.providerBorrowedPrice}
          </ThemedText>
        </View>
        <View style={[styles.pricesContainer, styles.payedContainer]}>
          <Icon style={styles.priceIcon} name="cash-check" />
          <ThemedText style={styles.price}>
            ${provider.providerayedPrice}
          </ThemedText>
        </View>
        <View style={[styles.pricesContainer, styles.totalContainer]}>
          <Icon style={styles.priceIcon} name="account-cash" />
          <ThemedText style={styles.price}>
            ${provider.providerBorrowedPrice - provider.providerayedPrice}
          </ThemedText>
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الاسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الاسم"
          placeholderTextColor="#999"
          value={provider.providerName}
          onChangeText={setProviderName}
          onEndEditing={updateProviderName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={provider.providerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setProviderPhoneNumber}
          onEndEditing={updateProviderPhonember}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder="أدخل الملاحظات"
          placeholderTextColor="#999"
          value={provider.providerNotes}
          onChangeText={setProviderNotes}
          onEndEditing={updateProviderNotes}
        />
      </View>
      {(provider?.itemsList?.length as number) > 0 && (
        <View style={styles.itemsListContainer}>
          <View>
            <ThemedText style={styles.itemsListTitle}>قائمة الديون</ThemedText>
          </View>
          <View style={styles.itemsList}>
            {provider.itemsList?.map((item) => (
              <View key={item.InnerDebtId} style={styles.borrowedListItem}>
                <ThemedText style={styles.borrowedListText}>
                  {/* {item.TotalPrice} */}
                </ThemedText>
                <ThemedText> --- </ThemedText>
                <ThemedText style={styles.borrowedListText}>
                  {/* {item.PricePaid} */}
                </ThemedText>
                <ThemedText> --- </ThemedText>
                <ThemedText style={styles.borrowedListText}>
                  {item.Date}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

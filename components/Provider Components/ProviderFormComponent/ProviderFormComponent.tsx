import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./ProviderFormComponent.style";
import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import useProviderFormComponentService from "./ProviderFormComponent.service";
import { ThemedText } from "../../HelperComponents/ThemedText";
import { IProviderProps } from "./ProviderFormComponent.types";
export function ProviderFormComponent({
  deleteFromProviderList,
  id,
  updateFromProvidersList,
}: IProviderProps) {
  const {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    updateProviderName,
    updateProviderPhonember,
    handleDeleteProvider,
  } = useProviderFormComponentService({
    id,
    deleteFromProviderList,
    updateFromProvidersList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={handleDeleteProvider}>
          <Icon style={styles.deleteProvider} name="delete-forever" />
        </TouchableOpacity>
      </View>
      <View style={styles.pricesRow}>
        <View style={[styles.pricesContainer, styles.borrowedConainer]}>
          <Icon style={styles.priceIcon} name="cash-remove" />
          <ThemedText style={styles.price}>
            ${provider.borrowedPrice}
          </ThemedText>
        </View>
        <View style={[styles.pricesContainer, styles.payedContainer]}>
          <Icon style={styles.priceIcon} name="cash-check" />
          <ThemedText style={styles.price}>${provider.payedPrice}</ThemedText>
        </View>
        <View style={[styles.pricesContainer, styles.totalContainer]}>
          <Icon style={styles.priceIcon} name="account-cash" />
          <ThemedText style={styles.price}>
            ${provider.borrowedPrice - provider.payedPrice}
          </ThemedText>
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الاسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الاسم"
          placeholderTextColor="#999"
          value={provider.name}
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
          value={provider.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setProviderPhoneNumber}
          onEndEditing={updateProviderPhonember}
        />
      </View>
      {(provider?.itemsList?.length as number) > 0 && (
        <View style={styles.itemsListContainer}>
          <View>
            <ThemedText style={styles.itemsListTitle}>قائمة الديون</ThemedText>
          </View>
          <View style={styles.itemsList}>
            {provider.itemsList?.map((item) => (
              <View key={item.id} style={styles.borrowedListItem}>
                <ThemedText style={styles.borrowedListText}>
                  {item.totalPrice}
                </ThemedText>
                <ThemedText> --- </ThemedText>
                <ThemedText style={styles.borrowedListText}>
                  {item.pricePaid}
                </ThemedText>
                <ThemedText> --- </ThemedText>
                <ThemedText style={styles.borrowedListText}>
                  {item.date}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

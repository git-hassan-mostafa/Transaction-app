import {
  I18nManager,
  Pressable,
  ScrollView,
  TouchableHighlight,
  View,
} from "react-native";
import styles from "./CustomerForm.style";
import { ThemedText } from "@/Shared/Components/ThemedText";
import { DataTable } from "react-native-paper";
import useDataTable from "@/Shared/Hooks/useDataTable";
import globalStyles from "@/Shared/Styles/global.style";
import i18n from "@/Shared/I18n/I18n";
import useCustomerFormService from "./CustomerForm.service";
import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";
import { fromatLocaleDate } from "@/Shared/Helpers/Functions/FormatDate";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import Icon from "react-native-vector-icons/Ionicons";

export default function CustomerDebtList(props: ICustomerFormProps) {
  const service = useCustomerFormService(props);
  const { from, to, Pagination } = useDataTable(service.customer.Debts || []);
  const [expandedRows, setExpandedRows] = React.useState<
    Record<string, boolean>
  >({});

  const handleRowPress = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isRTL = I18nManager.isRTL; // Check if the current language is Arabic

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            {Object.values(expandedRows).some((e) => e === true) ? (
              <React.Fragment>
                <DataTable.Title style={globalStyles.dateColumn}>
                  <ThemedText fontSize={12}></ThemedText>
                </DataTable.Title>
                <DataTable.Title style={globalStyles.column}>
                  <ThemedText fontSize={12}>
                    {i18n.t("product-name")}
                  </ThemedText>
                </DataTable.Title>
                <DataTable.Title style={globalStyles.column}>
                  <ThemedText fontSize={12}>
                    {i18n.t("product-price")}
                  </ThemedText>
                </DataTable.Title>
                <DataTable.Title style={globalStyles.column} numeric>
                  <ThemedText fontSize={12}>{i18n.t("quantity")}</ThemedText>
                </DataTable.Title>
                <DataTable.Title style={globalStyles.column} numeric>
                  <ThemedText fontSize={12}>{i18n.t("price")}</ThemedText>
                </DataTable.Title>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DataTable.Title style={globalStyles.dateColumn}>
                  <View />
                </DataTable.Title>
                <DataTable.Title style={globalStyles.column} numeric>
                  <ThemedText fontSize={12}>{i18n.t("price")}</ThemedText>
                </DataTable.Title>
              </React.Fragment>
            )}
          </DataTable.Header>

          {Boolean(service.customer.Debts?.length) &&
            service.customer.Debts?.slice(from, to).map((item) => {
              const isExpanded = expandedRows[String(item.Id)];
              if (!isExpanded)
                return (
                  <DataTable.Row
                    key={item.Id}
                    onPress={() => handleRowPress(String(item.Id))}
                  >
                    <DataTable.Cell style={globalStyles.dateColumn} numeric>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon name={isRTL ? "caret-back" : "caret-forward"} />
                        <ThemedText
                          color={Constants.colors.darkGray}
                          fontSize={12}
                          style={{
                            textAlign: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {fromatLocaleDate(item.Date)}
                        </ThemedText>
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={globalStyles.column}>
                      <ThemedText color={Constants.colors.darkGreen}>
                        ${item.TotalPrice}
                      </ThemedText>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              return (
                <Pressable
                  onPress={() => handleRowPress(String(item.Id))}
                  key={item.Id}
                >
                  {item.InternalDebtProducts.map((p, idx) => (
                    <DataTable.Row key={p.Id}>
                      <DataTable.Cell style={globalStyles.dateColumn} numeric>
                        {idx === 0 && (
                          <View>
                            <ThemedText
                              color={Constants.colors.darkGreen}
                              fontSize={12}
                              style={{
                                textAlign: "center",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Icon name="caret-down" />{" "}
                              <>{fromatLocaleDate(item.Date)}</>
                            </ThemedText>
                            <ThemedText
                              fontSize={12}
                              color={Constants.colors.red}
                              style={{ textAlign: "center" }}
                            >
                              ${item.TotalPrice}
                            </ThemedText>
                          </View>
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell style={globalStyles.column}>
                        <ThemedText>{p.Product?.Name}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell style={globalStyles.column}>
                        <ThemedText>${p.Product?.Price}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell style={globalStyles.column} numeric>
                        <ThemedText>{p.Quantity}</ThemedText>
                      </DataTable.Cell>
                      <DataTable.Cell style={globalStyles.column} numeric>
                        <ThemedText>${p.TotalPrice.toFixed(2)}</ThemedText>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                  <View
                    style={{
                      borderBottomColor: Constants.colors.gray,
                      borderBottomWidth: 1,
                    }}
                  />
                </Pressable>
              );
            })}
        </DataTable>
      </ScrollView>
      {<Pagination />}
    </View>
  );
}

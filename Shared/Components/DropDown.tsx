import React, { useEffect, useMemo, useState } from "react";
import IDropDownType from "@/Shared/Types/IDropDownType";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import IDropDownItem from "../Types/IDropDownItem";
import { ThemedText } from "./ThemedText";
import Constants from "../Constants/Constants";

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

  const [selectedIndex, setSelectedIndex] = useState<IndexPath | null>(null);

  useEffect(() => {
    const index = data.findIndex((item) => item.value === props.value);
    if (index !== -1) {
      setSelectedIndex(new IndexPath(index));
    }
  }, [props.value, data]);

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    setSelectedIndex(index as IndexPath);
    const selectedItem = data[(index as IndexPath).row];
    props.setValue(selectedItem?.value || "");
  };

  return (
    <Select
      style={props.style}
      placeholder={() => (
        <ThemedText fontSize={10} color={Constants.colors.darkGray}>
          {props.placeholder}
        </ThemedText>
      )}
      value={() => (
        <ThemedText>
          {selectedIndex !== null && data[selectedIndex.row]
            ? data[selectedIndex.row].label
            : ""}
        </ThemedText>
      )}
      selectedIndex={selectedIndex as IndexPath}
      onSelect={handleSelect}
      size={props.size || "medium"}
    >
      {data.map((item) => (
        <SelectItem
          key={item.value}
          title={() => <ThemedText>{item.label}</ThemedText>}
        />
      ))}
    </Select>
  );
};

export default React.memo(DropDown);

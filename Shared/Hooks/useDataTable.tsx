import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";

export default function useDataTable<T>(data: T[]) {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data?.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  function Pagination() {
    return (
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data?.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1} - ${to} of ${data?.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
      />
    );
  }

  return {
    from,
    to,
    Pagination,
  };
}

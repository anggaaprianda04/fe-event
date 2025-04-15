import DataTable from "@/components/ui/Datatable";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    currentLimit,
    currentPage,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "actions":
          return (
            <div className="flex justify-center gap-2">
              <Button
                onPress={() => push(`/admin/category/${category._id}`)}
                key="detail-category-button"
                color="default"
              >
                Detail
              </Button>
              <Button key="delete-category" color="danger">
                Delete
              </Button>
            </div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          currentPage={Number(currentPage)}
          buttonContentTopLabel="Create Category"
          emptyContent="Category is empty"
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          limit={String(currentLimit)}
          isLoading={isLoadingCategory || isRefetchingCategory}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <InputFile name="input" isDropable />
    </section>
  );
};

export default Category;

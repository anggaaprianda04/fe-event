import DataTable from "@/components/ui/Datatable";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import { LIMIT_LIST } from "@/constans/list.constans";

const Category = () => {
  const { push } = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
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
            // <Dropdown>
            //   <DropdownTrigger>
            //     <Button isIconOnly size="sm" variant="light">
            //       <CiMenuKebab className="text-default-700" />
            //     </Button>
            //   </DropdownTrigger>
            //   <DropdownMenu>
            //     <DropdownItem
            //       key="detail-category-button"
            //       onPress={() => push(`/admin/category/${category._id}`)}
            //     >
            //       Detail Category
            //     </DropdownItem>
            //     <DropdownItem key="delete-category" className="text-danger-500">
            //       Delete
            //     </DropdownItem>
            //   </DropdownMenu>
            // </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <DataTable
        currentPage={1}
        buttonContentTopLabel="Create Category"
        emptyContent="Content is empty"
        columns={COLUMN_LISTS_CATEGORY}
        data={[
          {
            _id: "123",
            name: "Category 1",
            description: "Description 1",
            icon: "/images/general/logo.png",
          },
        ]}
        limit={LIMIT_LIST[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPages={2}
      />
    </section>
  );
};

export default Category;

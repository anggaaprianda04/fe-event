import DataTable from "@/components/ui/Datatable";
import { Button, Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
// import AddCategoryModal from "./AddCategoryModal";
// import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import { COLUMN_LISTS_EVENT } from "./Event.constans";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refecthEvent,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventyModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip color={cellValue ? "success" : "warning"}>
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              keysDetail="detail-event-button"
              keysDelete="delete-event"
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                // deleteCategoryModal.onOpen();
              }}
            />
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
          buttonContentTopLabel="Create Event"
          emptyContent="Event is empty"
          columns={COLUMN_LISTS_EVENT}
          data={dataEvent?.data || []}
          isLoading={isLoadingEvent || isRefetchingEvent}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvent?.pagination.totalPages}
        />
      )}
      {/* <AddCategoryModal
        {...addCategorModal}
        refecthCategory={refecthCategory}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refecthCategory={refecthCategory}
      /> */}
    </section>
  );
};

export default Event;

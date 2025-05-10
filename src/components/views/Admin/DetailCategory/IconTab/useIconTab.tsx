import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaIconUpdated = yup.object().shape({
  icon: yup
    .mixed<FileList | string>()
    .required("Please input icon of category"),
});

const useIconTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errosUpdateIcon },
    reset: resetUpdateIcon,
    watch: watchUpdateIcon,
    getValues: getValuesUpdateIcon,
    setValue: setValueUpdateIcon,
  } = useForm({
    resolver: yupResolver(schemaIconUpdated),
  });

  const preview = watchUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateIcon("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateIcon("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errosUpdateIcon,
    handleSubmitUpdateIcon,

    preview,
    resetUpdateIcon,
  };
};

export default useIconTab;

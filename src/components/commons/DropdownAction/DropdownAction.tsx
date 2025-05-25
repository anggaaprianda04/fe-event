import { Button } from "@heroui/react";

interface PropTypes {
  onPressButtonDetail: () => void;
  keysDetail: string;
  onPressButtonDelete: () => void;
  keysDelete: string;
}

const DropdownAction = (props: PropTypes) => {
  const { onPressButtonDelete, onPressButtonDetail, keysDelete, keysDetail } =
    props;
  return (
    <div className="flex justify-center gap-2">
      <Button onPress={onPressButtonDetail} key={keysDetail} color="default">
        Detail
      </Button>
      <Button onPress={onPressButtonDelete} key={keysDelete} color="danger">
        Delete
      </Button>
    </div>
  );
};

export default DropdownAction;

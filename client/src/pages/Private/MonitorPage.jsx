import { Button } from '@mui/material';
import CustomDialog, {
  dialogOpenSubject$,
} from '../../components/CustomDialog';

const MonitorPage = () => {
  const handleOpenDialog = () => {
    dialogOpenSubject$.setSubject('dialog2');
  };
  return (
    <div>
      <CustomDialog onClose="dialog2">
        <h2>chua</h2>
      </CustomDialog>
      <Button
        variant="contained"
        size="small"
        color="neutral"
        onClick={() => handleOpenDialog()}
      >
        Agregar
      </Button>
    </div>
  );
};

export default MonitorPage;

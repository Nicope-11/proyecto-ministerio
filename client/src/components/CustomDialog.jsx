import { useEffect, useState } from 'react';
import { SubjectManager } from '../models/subjectmanager';
import { Dialog } from '@mui/material';

export const dialogOpenSubject$ = new SubjectManager();

const CustomDialog = ({ children, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const subscription = dialogOpenSubject$
      .getSubject()
      .subscribe((dialogId) => {
        if (dialogId === onClose) {
          setOpen(true);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [onClose]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        {children}
      </Dialog>
    </div>
  );
};

export default CustomDialog;

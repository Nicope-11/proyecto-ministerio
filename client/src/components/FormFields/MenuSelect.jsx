import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import InputField from './InputField';
import * as Yup from 'yup';
import {
  useAddOptionMutation,
  useDeleteOptionMutation,
  useEditOptionMutation,
  useGetOptionsQuery,
} from '../../app/api/optionsApiSlice';
import { StyledDialog } from '../StyledDialog';
import { tokens } from '../../theme';
import { StyledMenu } from '../StyledMenu';
import { useConfirm } from 'material-ui-confirm';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
});

const MenuSelect = ({ url, name, label, disabled, valuesForm, setField }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errContent, setErrorContent] = useState('');
  const [initialValues, setInitialValues] = useState(valuesForm);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();

  const { data } = useGetOptionsQuery(`${url}/${valuesForm?.name}`);

  const [addOption, { isSuccess, data: dataAdd, error }] =
    useAddOptionMutation();
  const [editOption, { isSuccess: isUpdSuccess, error: errorUpd }] =
    useEditOptionMutation();
  const [deleteOption] = useDeleteOptionMutation();

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setModal(true);
    handleClose();
    setErrorContent('');
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleAddOption = () => {
    console.log('agregar');
    openModal();
    setIsEditing(false);
    setInitialValues({ ...valuesForm, name: '' });
  };
  const handleEditOption = () => {
    console.log('editar');
    openModal();
    setIsEditing(true);
    setInitialValues({ ...valuesForm, name: data?.name || '' });
  };

  const handleDeleteOption = async () => {
    console.log('eliminar');
    try {
      await confirm({
        description: `El ${label} ${data.name} se eliminará permanentemente.`,
      });
      const { error: errorDel } = await deleteOption({ url, id: data.id });
      if (!errorDel) {
        setField(name, '');
        handleClose();
      } else {
        enqueueSnackbar(errorDel?.data?.message, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.log('Deletion cancelled.');
    }
  };

  /* useEffect(() => {
    if (errorDel) {
      enqueueSnackbar(errorDel?.data?.message, {
        variant: 'error',
      });
    }
  }, [errorDel]); */

  const handleSubmit = async (values) => {
    if (isEditing) {
      await editOption({
        url,
        id: data.id,
        data: values,
      });
    } else {
      await addOption({ url, data: values });
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      closeModal();
      if (isSuccess) {
        const id = dataAdd.id;
        setField(name, id);
      }
    }
  }, [isSuccess, isUpdSuccess]);

  useEffect(() => {
    setErrorContent((error?.data?.message || errorUpd?.data?.message) ?? '');
    setTimeout(() => {
      setErrorContent('');
    }, 3000);
  }, [error, errorUpd]);

  return (
    <>
      <IconButton
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        <AddIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        <MenuItem onClick={handleAddOption} key="add" disableRipple>
          <LibraryAddIcon />
          Agregar
        </MenuItem>
        {valuesForm.name && [
          <MenuItem onClick={handleEditOption} disableRipple key="edit">
            <EditIcon />
            Editar
          </MenuItem>,
          <MenuItem onClick={handleDeleteOption} disableRipple key="delete">
            <DeleteIcon />
            Eliminar
          </MenuItem>,
        ]}
      </StyledMenu>
      <StyledDialog open={modal} onClose={closeModal} sx={{}}>
        <DialogTitle
          sx={{
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            color: '#fff',
            margin: 0,
            padding: 1,
          }}
        >
          {isEditing ? 'Editar ' : 'Agregar '}
          {label}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: '0 5px 5px',
            padding: '0 2rem 0.5rem',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            background: colors.bgTable,
            gap: 3,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {() => (
              <Form>
                <Box
                  sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  {errContent && <Alert severity="error">{errContent}</Alert>}
                  <InputField name="name" label={label} />
                  <DialogActions>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button type="submit" variant="contained">
                      {isEditing ? 'Editar' : 'Agregar'}
                    </Button>
                  </DialogActions>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default MenuSelect;

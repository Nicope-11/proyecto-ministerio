import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { StyledMenu } from './StyledMenu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';

export const MenuForm = ({
  selectedOption,
  label,
  addOption,
  deleteOption,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOption, setEditedOption] = useState('');

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddOption = () => {
    setIsModalOpen(true);
    setEditedOption('');
  };

  const handleEditOption = () => {
    console.log(selectedOption.name);
    setIsModalOpen(true);
    setEditedOption(selectedOption.name);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    deleteOption();
  };

  const handleSubmit = () => {
    addOption(editedOption, isEditing);
    setIsModalOpen(false);
    setIsEditing(false);
    handleClose();
  };

  const handleOptionChange = (e) => {
    setEditedOption(e.target.value);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleAddOption} disableRipple>
          <LibraryAddIcon />
          Agregar
        </MenuItem>
        {selectedOption && [
          <MenuItem onClick={handleEditOption} disableRipple key="edit">
            <EditIcon />
            Editar
          </MenuItem>,
          <MenuItem onClick={handleDelete} disableRipple key="delete">
            <DeleteIcon />
            Eliminar
          </MenuItem>,
        ]}
      </StyledMenu>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle
          sx={{
            background: '#444',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          {isEditing ? 'Editar ' : 'Agregar '}
          {label}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            label="Nuevo valor"
            value={editedOption}
            onChange={handleOptionChange}
            fullWidth
            sx={{ mt: 3, mb: 3 }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? 'Editar' : 'Agregar'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

//export default MenuForm;

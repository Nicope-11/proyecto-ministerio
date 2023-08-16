import { IconButton, MenuItem } from '@mui/material';
import { StyledMenu } from '../../../../components/StyledMenu';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FeedIcon from '@mui/icons-material/Feed';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePrinterMutation } from '../../../../app/api/printersApiSlice';
import { useConfirm } from 'material-ui-confirm';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../../../context/ModalContext';

const ButtonMoreMenu = ({ id, name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { openModal } = useModal();
  const location = useLocation();

  const [deletePrinter] = useDeletePrinterMutation();

  const confirm = useConfirm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMore = () => {
    console.log(id);
  };
  const handleEdit = () => {};

  const handleDelete = async () => {
    try {
      await confirm({
        description: `El monitor ${name} se eliminará permanentemente.`,
      });
      await deletePrinter(id);
    } catch (error) {
      console.log('Deletion cancelled.');
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} variant="contained">
        <MoreVertIcon />
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleMore}>
          <FeedIcon />
          Ver mas
        </MenuItem>
        <MenuItem
          component={Link}
          to={`editar/${id}`}
          onClick={openModal}
          state={{ background: location }}
        >
          <EditIcon />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          Eliminar
        </MenuItem>
      </StyledMenu>
    </>
  );
};
export default ButtonMoreMenu;

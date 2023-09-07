import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material';
import { useField } from 'formik';
import { at } from 'lodash';
import MenuSelect from './MenuSelect';

const SelectWithMenu = ({
  url,
  label,
  name,
  options,
  disabled,
  valuesForm,
  setField,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const [touched, error] = at(meta, 'touched', 'error');

  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <>
      <FormControl error={isError} fullWidth disabled={disabled}>
        <Box display="flex" alignItems="center">
          <InputLabel>{label}</InputLabel>
          <Select {...field} {...rest} label={label} fullWidth>
            {options &&
              options?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
          <MenuSelect
            name={name}
            label={label}
            disabled={disabled}
            url={url}
            valuesForm={valuesForm}
            setField={setField}
          />
        </Box>
        {_renderHelperText()}
      </FormControl>
    </>
  );
};

export default SelectWithMenu;

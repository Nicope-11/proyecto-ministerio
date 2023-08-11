import { at } from 'lodash';
import { useField } from 'formik';
import { FormControl, InputLabel, TextField, styled } from '@mui/material';
import { useState } from 'react';

export default function CustomInputField(props) {
  const { errorText, label, ...rest } = props;
  const [field, meta] = useField(props);

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        shrink
        //onMouseEnter={() => setFocused(true)} // Aplica hover al input
        //onMouseLeave={() => setFocused(false)} // Quita hover del input
        focused={focused || field.value.length > 0}
        htmlFor={rest.id}
        error={meta.touched && meta.error && true}
        sx={{
          cursor: focused || field.value.length > 0 ? '' : 'text',
          transform:
            focused || field.value.length > 0
              ? 'translate(14px, -20px) scale(0.9)'
              : 'translate(14px, 16px) scale(1)',
        }}
      >
        {label}
      </InputLabel>
      <StyledTextField
        type="text"
        variant="outlined"
        error={meta.touched && meta.error && true}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
        helperText={_renderHelperText()}
        {...field}
        {...rest}
      />
    </FormControl>
  );
}

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    //backgroundColor: '#f0f2f5',
    trasition: 'all 0.3s ease',
    borderRadius: 20,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3b6f9c',
    },
    '&:hover:not(.Mui-error) fieldset': {
      borderColor: '#97c4e5', // Cambio de color al pasar el mouse cuando no hay error
    },
    '&.Mui-focused:not(.Mui-error) fieldset': {
      borderColor: '#97c4e5',
      boxShadow: `rgba(147,197,253,0.5) 0px 0px 0px 2.8px`,
    },
  },
  /* '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3b6f9c',
    },
    '&:hover fieldset': {
      borderColor: '#97c4e5',
    },
    '&.Mui-focused fieldset': {
      //borderColor: '#3f51b5',
      borderColor: '#97c4e5',
      boxShadow: `rgba(147,197,253,0.5) 0px 0px 0px 2.8px`,
    },
    '&.Mui-error .MuiOutlinedInput-root fieldset': {
      borderColor: '#f44336', // Color del borde cuando hay un error
    },
  }, */
});

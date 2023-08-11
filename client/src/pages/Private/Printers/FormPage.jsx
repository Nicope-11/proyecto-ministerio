import { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  useTheme,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';

import AditionalForm from './Forms/AditionalForm';
import TecnicalForm from './Forms/TecnicalForm';

import validationSchema from './FormModel/validationSchema';
import printerFormModel from './FormModel/printerFormModel';
import formInitialValues from './FormModel/formInitialValues';
import { StyledDialog } from '../../../components/StyledDialog';
import { tokens } from '../../../theme';
import { useCreatePrinterMutation } from '../../../api/printersApiSlice';

const steps = ['Informacion Tecnica', 'Informacion Adicional'];
const { formId, formField } = printerFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TecnicalForm formField={formField} />;
    case 1:
      return <AditionalForm formField={formField} />;
    default:
      return <div>Not found</div>;
  }
}

export default function FormPage({ title, open, onClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [createPrinter, { error }] = useCreatePrinterMutation();

  const [activeStep, setActiveStep] = useState(0);

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function _submitForm(values, actions) {
    /* console.log(values);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false); */

    try {
      const response = await createPrinter(values);
      actions.setSubmitting(false);
      if (!response.data.error) {
        setActiveStep(activeStep + 1);
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setActiveStep(0);
          }, 200);
        }, 2000);
      }
    } catch (err) {
      console.error('Error al agregar la impresora:', err);
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      handleNext();
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
    <>
      <StyledDialog
        open={open}
        onClose={onClose}
        fullWidth
        /* sx={{
          //You can copy the code below in your theme
          //background: 'rgba(0, 0, 0, 0.8)', // Change to 'red' for example to make it more visible
          '& .MuiPaper-root': {
            background: '#070e16', // Change to 'red' for example to make it more visible
          },
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(1px)', // Change to 'red' for example to make it more visible

            //backgroundColor: 'transparent', // Try to remove this to see the difference
          },
        }} */
      >
        <DialogTitle
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          <Typography>{title}</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            margin: '0 5px 5px',
            padding: '0 4rem 2rem',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            background: colors.bgTable,
            gap: 3,
          }}
        >
          <Box sx={{ marginTop: '2rem' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {error && <Alert severity="error">{error?.data?.message}</Alert>}
          <>
            {activeStep === steps.length ? (
              <h5>Formulario Enviado</h5>
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {_renderStepContent(activeStep)}

                    <DialogActions>
                      <Box
                        display="flex"
                        justifyContent="end"
                        gap="10px"
                        marginTop={3}
                      >
                        {activeStep !== 0 && (
                          <Button
                            variant="contained"
                            color="neutral"
                            onClick={handleBack}
                          >
                            Atras
                          </Button>
                        )}
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={isSubmitting}
                        >
                          {isLastStep ? 'Agregar' : 'Siguiente'}
                        </Button>
                        {isSubmitting && <CircularProgress size={24} />}
                      </Box>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            )}
          </>
        </DialogContent>
      </StyledDialog>
    </>
  );
}

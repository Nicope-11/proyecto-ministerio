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
  useTheme,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';

import AditionalForm from './Forms/AditionalForm';
import TecnicalForm from './Forms/TecnicalForm';

import validationSchema from './FormModel/validationSchema';
import printerFormModel from './FormModel/printerFormModel';
import formInitialValues from './FormModel/formInitialValues';
const {
  formField: { nroInventario, nroSerie, maker, model, place, state },
} = printerFormModel;

import { StyledDialog } from '../../../components/StyledDialog';
import { tokens } from '../../../theme';

import { useModal } from '../../../context/ModalContext';

import { useNavigate, useParams } from 'react-router-dom';
import {
  selectAllPrinters,
  selectPrinterById,
  useCreatePrinterMutation,
} from '../../../app/api/printersApiSlice';

import { useSelector } from 'react-redux';

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

export default function FormPage({ title, preloadedData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { modalOpen, closeModal } = useModal();

  const [createPrinter, { error }] = useCreatePrinterMutation();

  const [activeStep, setActiveStep] = useState(0);

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const params = useParams();

  const printerOne = useSelector((state) =>
    selectPrinterById(state, params.id)
  );

  console.log(printerOne);

  console.log(printerOne.maker.name);

  console.log(formInitialValues);

  const initialValues = printerOne
    ? {
        ...printerOne,
        [maker.name]: printerOne.maker.name, // Asignar el nombre del fabricante directamente al campo maker
      }
    : formInitialValues;

  console.log(printerOne);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function _submitForm(values, actions) {
    try {
      const response = await createPrinter(values);
      actions.setSubmitting(false);
      if (!response.data.error) {
        setActiveStep(activeStep + 1);
        setTimeout(() => {
          //onClose();
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
      <StyledDialog open={modalOpen} onClose={closeModal} fullWidth>
        <DialogTitle
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
            color: '#fff',
            margin: 0,
            padding: 1,
          }}
        >
          Agregar Impresora
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
                initialValues={initialValues}
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

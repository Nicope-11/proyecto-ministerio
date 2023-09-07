import { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  useTheme,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';

import AditionalForm from './Forms/AditionalForm';
import TecnicalForm from './Forms/TecnicalForm';

import validationSchema from './FormModel/validationSchema';
import printerFormModel from './FormModel/printerFormModel';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { tokens } from '../../theme';
import { useModal } from '../../context/ModalContext';
import {
  selectPrinterById,
  useCreatePrinterMutation,
  useUpdatePrinterMutation,
} from '../../app/api/printersApiSlice';
import { StyledDialog } from '../../components/StyledDialog';
import { resetField, setIntialField } from './formPrinterSlice';

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

export default function FormPrinter() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { modalOpen, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const formData = useSelector((state) => state.formPrinter);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [createPrinter, { data, isSuccess, isLoading, isError, error }] =
    useCreatePrinterMutation();
  const [
    updatePrinter,
    {
      data: dataUpd,
      isSuccess: isUpdSuccess,
      isLoading: isUpdLoading,
      isError: isUpdError,
      error: errorUpd,
    },
  ] = useUpdatePrinterMutation();

  const [activeStep, setActiveStep] = useState(0);

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const params = useParams();

  const printer = useSelector((state) => selectPrinterById(state, params.id));

  useEffect(() => {
    if (printer) {
      const parsePrinter = {
        ...printer,
        [formField.maker.name]: printer.maker.id,
        [formField.model.name]: printer.model.id,
        [formField.place.name]: printer.place.id,
        stateOption: printer.state.id,
      };
      dispatch(setIntialField(parsePrinter));
    } else {
      dispatch(resetField());
    }
  }, [printer, dispatch]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // MEJORAR MANEJO DE ERRORES

  /* async function _submitForm(values, actions) {
    try {
      let response;
      if (params.id) {
        response = await updatePrinter(values);
      } else {
        response = await createPrinter(values);
      }
      actions.setSubmitting(false);
      if (!response.data.error) {
        setActiveStep(activeStep + 1);
        setTimeout(() => {
          //onClose();
          navigate('/impresoras');
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
  } */

  useEffect(() => {
    if (isSuccess || isUpdSuccess) {
      navigate('/impresoras');
      setActiveStep(0);
      console.log(data);
      console.log(dataUpd);
      enqueueSnackbar(data?.message || dataUpd?.message, {
        variant: 'success',
      });
    }
  }, [isSuccess, isUpdSuccess]);

  const _handleSubmit = async (values, actions) => {
    if (isLastStep) {
      try {
        if (params.id) {
          await updatePrinter(values);
        } else {
          await createPrinter(values);
        }
      } catch (err) {
        console.error('Error al agregar la impresora:', err);
      }
    } else {
      handleNext();
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const errContent = (error?.data?.message || errorUpd?.data?.message) ?? '';

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
          {errContent && <Alert severity="error">{errContent}</Alert>}
          <>
            {activeStep === steps.length ? (
              <h5>Formulario Enviado</h5>
            ) : (
              <Formik
                enableReinitialize
                initialValues={formData}
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
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                          loading={isLoading || isUpdLoading}
                        >
                          {isLastStep ? 'Agregar' : 'Siguiente'}
                        </LoadingButton>
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

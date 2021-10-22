import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//Models
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';
import * as Yup from 'yup';

//Styles
import '../../../styles/form.scss'

const TaskFormFormik = ({add, length}) => {

    /**Valores iniciales del formulario */
    const initialValues = {
        name: '',
        description: '',
        completed: false,
        level: ''
    }
    

    /**Esquema de validación con Yup */
    const TaskSchema = Yup.object().shape({
        name: Yup.string().min(4, 'El nombre de la tarea ha de tener mínimo cuatro caracteres').matches(/^[A-Za-z0-9\s]+$/g, 'El nombre solo puede contener caracteres alfanuméricos').required('Nombre obligatorio'),
        description: Yup.string().matches(/^[A-Za-z0-9\s]+$/g, 'La descripción solo puede contener caracteres alfanuméricos').required('Descripción obligatoria'),
        level: Yup.string().matches(/(normal|blocking|urgent)/, "Seleccione una opción").required('Nivel obligatorio')
    });

    /**Manejador del envío del form */
    function addTask(values) {

        const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
        );
        add(newTask);
    }

    return (
        <div>
            <h4 className="mt-3">New Task</h4>
            <Formik
                initialValues={initialValues}
                // *** Yup Validation Schema ***
                validationSchema={TaskSchema}
                // ** onSubmit Event
                onSubmit={addTask}
            >
                {({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
                    <Form className="'d-flex justify-content-center align-items-center mb-4" >
                        <div className='form-outline flex-fill'>
                            <Field id="name" type="text" name="name" placeholder="Add task name" className='form-control form-control-lg mb-2' required />
                            {/* TAsk name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name="name" component='div' className="error mb-2"></ErrorMessage>
                                )
                            }
                            <Field id="description" type="text" name="description" placeholder="Add task description" className='form-control form-control-lg mb-2' required />
                            {/* Task description Errors */}
                            {
                                errors.description && touched.description && (
                                    <ErrorMessage name="description" component='div' className="error mb-2"></ErrorMessage>
                                )
                            }
                            <Field name="level" as="select" className="form-control form-control-lg mb-2">
                                <option value="none">Select a level</option>
                                <option value={LEVELS.NORMAL}>Normal</option>
                                <option value={LEVELS.URGENT}>Urgent</option>
                                <option value={LEVELS.BLOCKING}>Blocking</option>
                            </Field>
                            {/* Level Errors */}
                            {
                                errors.level && touched.level && (
                                    <ErrorMessage name="level" component='div' className="error mb-2"></ErrorMessage>
                                )
                            }
                            <button type='submit' className='btn btn-success btn-lg ms-2'>
                                {length > 0 ? 'Add New Task' : 'Create your First Task'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


TaskFormFormik.protoTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}
export default TaskFormFormik;

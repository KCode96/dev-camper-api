import * as yup from 'yup';

const createUserShcema = yup.object({
    body: yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email().required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars min')
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                'Password can only contain Latin letters.'
            ),
    }),
});

const createUserSessionSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars min')
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                'Password can only contain Latin letters.'
            ),
    }),
});

export { createUserShcema, createUserSessionSchema };

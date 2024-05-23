import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const CustomForm = () => {

    return (
        <Formik
        initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'Minimum 2 characters required')
                    .required('Required field!'),
            email: Yup.string()
                    .email('Invalid email address')
                    .required('Required field!'),
            amount: Yup.number()
                    .required('Amount is required')
                    .min(5, 'At least 5'),
            currency: Yup.string().required('Select a currency'),
            text: Yup.string()
                    .min(10, 'At least 10 characters required'),
            terms: Yup.boolean()
                    .required('Consent is required')
                    .oneOf([true], "Consent is required")
        })}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Make a Donation</h2>
                <MyTextInput
                    label="Your Name"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                />
                <MyTextInput
                    label="Your Email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                    autoComplete="off"
                />
                <ErrorMessage component="div" className="error" name="amount"/>
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Select a currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CNY">CNY</option>
                </Field>
                <ErrorMessage component="div" className="error" name="currency"/>
                <label htmlFor="text">Your Message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage component="div" className="error" name="text"/>
                <MyCheckbox name="terms">
                    Do you agree with the privacy policy?
                </MyCheckbox>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;

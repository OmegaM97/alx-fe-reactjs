// src/components/FormikForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setStatus("✅ User registered successfully!");
        resetForm();
      } else {
        setStatus("❌ Registration failed.");
      }
    } catch (err) {
      setStatus("❌ Network error.");
    }
  };

  return (
    <div className="p-4 border rounded w-80 mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Formik Registration Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form>
            <div className="mb-2">
              <Field
                name="username"
                placeholder="Username"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>

            {status && <p className="mt-2">{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

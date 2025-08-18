// src/App.jsx
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center">Form Handling in React</h1>
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

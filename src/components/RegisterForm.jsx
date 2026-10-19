import { useActionState, use } from 'react';
import { useFormStatus } from 'react-dom';
import { UserContext } from '../context/UserContext';
import CustomInput from './CustomInput';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  );
}

export default function RegisterForm({ nameInputRef }) {
  const { user, setUser } = use(UserContext);

  async function registerAction(prevState, formData) {
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const password = formData.get('password') || '';

    // I have added it here to simulate the network delay
    await new Promise((resolve) => setTimeout(resolve, 1300));

    const errors = {};
    if (name.length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    }
    if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please fix the errors highlighted below.',
        errors,
        values: { name, email }
      };
    }

    setUser({ name, email, registeredAt: new Date().toLocaleTimeString() });

    return {
      success: true,
      message: `Registration complete! Welcome aboard, ${name}.`,
      errors: {},
      values: { name: '', email: '' }
    };
  }

  const [state, formAction] = useActionState(registerAction, {
    success: false,
    message: '',
    errors: {},
    values: { name: '', email: '' }
  });

  return (
    <section className="card register-section">
      <div className="section-header">
        <h2>Account Registration</h2>
        <p className="muted-text">
          Register your account to save preferences and track orders.
        </p>
      </div>

      <form action={formAction} className="register-form" noValidate>
        <CustomInput
          ref={nameInputRef}
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="e.g. Rohan Sharma"
          defaultValue={state.values?.name}
        />
        {state.errors?.name && <p className="field-error">{state.errors.name}</p>}

        <CustomInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="rohan@example.com"
          defaultValue={state.values?.email}
        />
        {state.errors?.email && <p className="field-error">{state.errors.email}</p>}

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Minimum 6 characters"
        />
        {state.errors?.password && <p className="field-error">{state.errors.password}</p>}

        <div className="form-actions">
          <SubmitButton />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => nameInputRef.current?.focus()}
          >
            Focus Name Field (Ref Prop)
          </button>
        </div>

        {state.message && (
          <div className={`alert ${state.success ? 'alert-success' : 'alert-error'}`}>
            {state.message}
          </div>
        )}
      </form>

      {user && (
        <div className="registered-summary">
          <h3>Active Session Context</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Registered At:</strong> {user.registeredAt}</p>
        </div>
      )}
    </section>
  );
}
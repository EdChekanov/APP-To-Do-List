import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const schema = z.object({
  username: z
    .string()
    .min(1, 'Логин минимум 1 символ')
    .max(20, 'Логин максимум 20 символов'),
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(8, 'Пароль минимум 8 символов')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Пароль должен содержать: 1 заглавную букву, 1 строчную, 1 цифру, 1 спецсимвол'
    ),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Выберите пол',
  }),
  age: z.coerce
    .number()
    .min(10, 'Возраст минимум 10')
    .max(100, 'Возраст максимум 100'),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(JSON.stringify(data));
      await api.post('/users/register', JSON.stringify(data));
      navigate('/login');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, [navigate]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label htmlFor="username">Логин</label>
        <input
          {...register('username')}
          type="text"
          id="username"
          className={errors.login ? 'error' : ''}
        />
        {errors.username && (
          <span className="error-text">{errors.username.message}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="email">E-mail</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error-text">{errors.email.message}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="password">Пароль</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}
      </div>

      <div className="form-row">
        <label>Пол</label>
        <input
          {...register('gender')}
          type="radio"
          id="gender-male"
          value="male"
        />
        <label htmlFor="gender-male">Мужской</label>

        <input
          {...register('gender')}
          type="radio"
          id="gender-female"
          value="female"
        />
        <label htmlFor="gender-female">Женский</label>

        {errors.gender && (
          <span className="error-text">{errors.gender.message}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="age">Возраст</label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          id="age"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-text">{errors.age.message}</span>}
      </div>

      <button type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
      <button
        type="button"
        className="small-btn-text"
        onClick={() => navigate('/login')}
      >
        Войти
      </button>
    </form>
  );
};

export default RegisterForm;

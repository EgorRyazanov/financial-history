import isValidEmail from "../../utils/valid-email";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/user";
import styles from "./register-page.module.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ email: values.email, password: values.password, name: values.name }));
    };
    const handleLogin = () => {
        navigate("/login");
    };

    const { values, handleChange } = useForm({
        email: "",
        password: "",
        repeatPassword: "",
        name: "",
    });
    return (
        <div className="form__container">
            <h2 className="form__title">Регистрация</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form__input" onChange={handleChange} value={values.name} placeholder="Введите Имя" type="text" name="name" />
                <input className="form__input" onChange={handleChange} value={values.email} placeholder="Введите Почту" type="email" name="email" />
                <input className="form__input" onChange={handleChange} value={values.password} placeholder="Введите Пароль" type="password" name="password" />
                <input
                    className="form__input"
                    onChange={handleChange}
                    value={values.repeatPassword}
                    placeholder="Потворите Пароль"
                    type="password"
                    name="repeatPassword"
                />
                {!(/^[a-zA-Z0-9_]+$/.test(values.password) && /[a-zA-Z]/.test(values.password) && values.password.length > 6) &&
                    values.password.length !== 0 && <p className={styles.form__attention}>Неподходящий пароль</p>}
                {!isValidEmail(values.email) && values.email.length > 0 && <p className={styles.form__attention}>Некорректная почта</p>}
                <button
                    className={`form__button ${
                        values.email.length > 0 &&
                        isValidEmail(values.email) &&
                        values.name.length > 1 &&
                        /^[a-zA-Z0-9_]+$/.test(values.password) &&
                        /[a-zA-Z]/.test(values.password) &&
                        values.password.length > 6 &&
                        values.password === values.repeatPassword
                            ? "form__button_active"
                            : null
                    }`}
                    disabled={
                        !(
                            values.email.length > 0 &&
                            isValidEmail(values.email) &&
                            /^[a-zA-Z0-9_]+$/.test(values.password) &&
                            /[a-zA-Z]/.test(values.password) &&
                            values.password.length > 6 &&
                            values.name.length > 1 &&
                            values.password === values.repeatPassword
                        )
                    }
                    type="submit"
                >
                    Регистрация
                </button>
            </form>
            <div className="form__text_container">
                <p>Зарегистрированы?</p>
                <button onClick={handleLogin} className="form__link">
                    Войти
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;

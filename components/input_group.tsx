import { useState } from 'react'
import styles from '../styles/components/input_group.module.scss'


interface Props {
    label: string
    value?: any
    onChange: any
    type?: string
    id?: string
    name?: string
    required: boolean
    max?: number;
    min?: number;
}
const InputGroup = ({ label, value, onChange, type, id, name, required, max, min }: Props) => {

    const [valid, setValid] = useState(false);
    const [touch, setTouch] = useState(false)
    const handleChange = (e: any) => {
        const validate = isValid()
        setValid(validate)
        onChange(e, validate);
    }



    const onTouch = () => {
        setTouch(true)
    }

    const isValid = () => {
        if (!touch) {
            return true
        }
        if (required && (!value || value.trim() === '')) {
            return false;
        }

        if (max !== undefined && value && value.length > max) {
            return false;
        }
        
        if (min !== undefined && value && value.length < min) {
            return false;
        }

        if (type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
            return false;
        }

        if (type === 'password' && value) {
            const uppercaseRegex = /[A-Z]/;
            const digitRegex = /\d/;
            const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
            const hasUppercase = uppercaseRegex.test(value);
            const hasDigit = digitRegex.test(value);
            const hasSpecialChar = specialCharRegex.test(value);

            if (!(hasUppercase && hasDigit && hasSpecialChar)) {
                return false;
            }
        }

        return true;
    };

    


    return <div className={styles.formGroup}>
        <input type={type ?? 'text'} id={id ?? label} name={name ?? label} onClick={onTouch}
            required={true} value={value ?? ''} onChange={(e: any) => handleChange(e)} className={!isValid() ? styles.invalid : ''} />
        <label htmlFor={id ?? label} className={required ? 'required' : ''}>{label}</label>
    </div>
}

export default InputGroup
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
    ext?: number;
}
const InputGroup = ({ label, value, onChange, type, id, name, required, max, min, ext }: Props) => {

    const [valid, setValid] = useState(false);
    const [touch, setTouch] = useState(false)
    const handleChange =  (e: any) => {
        onChange(e, isValid(e.target.value));
    }



    const onTouch = () => {
        setTouch(true)
    }

    const isValid =  (valueChange) => {
        if (!touch) {
            if (value.length > 0 && min !== undefined && min > value ) return false
            return true
        } 
        if (!required) {
            return true
        }
        if (valueChange?.trim() === '' ) {
            return false
        }
        if (required && (!valueChange || valueChange.trim() === '')) {
            return false;
        }

        if (max !== undefined && valueChange && valueChange.length > max) {
            return false;
        }

        if (min !== undefined && valueChange && valueChange.length < min) {
            return false;
        }
        
        if (ext !== undefined && valueChange && valueChange.length !== ext) {
            return false;
        }

        if (type === 'email' && valueChange && !/\S+@\S+\.\S+/.test(valueChange)) {
            return false;
        }

        if (type === 'password' && valueChange) {
            
            const uppercaseRegex = /[A-Z]/;
            const digitRegex = /\d/;
            const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
            const hasUppercase = uppercaseRegex.test(valueChange);
            const hasDigit = digitRegex.test(valueChange);
            const hasSpecialChar = specialCharRegex.test(valueChange);

            if (!(hasUppercase && hasDigit && hasSpecialChar)) {
                return false;
            }
        }
        
        return true;
    };




    return <div className={styles.formGroup}>
        <input type={type ?? 'text'} id={id ?? label} name={name ?? label} onClick={onTouch}
            required={true} value={value ?? ''} onChange={(e: any) => handleChange(e)} className={!isValid(value) ? styles.invalid : ''} />
        <label htmlFor={id ?? label} className={required ? 'required' : ''}>{label} {required && <span style={{
            color: 'red'
        }}>*</span>}</label>
    </div>
}

export default InputGroup
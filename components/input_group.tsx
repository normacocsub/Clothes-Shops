import styles from '../styles/components/input_group.module.scss'


interface Props {
    label: string
    value?: any
    onChange: any
    type?: string
    id?: string
    name?: string
    required?: boolean
}
const InputGroup = ({label, value, onChange, type, id, name}: Props) => {

    const handleChange = (e: any) => {
        onChange(e);
    }

    
    return <div className={styles.formGroup}>
        <input type={type ?? 'text'} id={id ?? label} name={name ?? label} 
        required={true} value={value ?? ''}  onChange={(e: any) => handleChange(e)}/>
        <label htmlFor={id ?? label}>{label}</label>
    </div>
}

export default InputGroup
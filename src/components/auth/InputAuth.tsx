interface InputAuthProps {
    label: string;
    value: any;
    type?: 'text' | 'email' | 'password' | 'number' | 'date';
    required?: boolean;
    notRender?: boolean;
    valueChanged: (newValue: any) => void;
}
export default function InputAuth(props:InputAuthProps) {
    return props.notRender ? null : (
        <div className="w-full flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                type={props.type ?? 'text'}
                value={props.value}
                onChange={e => props.valueChanged?.(e.target.value)}
                required={props.required}
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
            />
        </div>
    )
}
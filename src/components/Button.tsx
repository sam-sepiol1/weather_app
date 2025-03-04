type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    text: string;
    name?: string;
};

export default function Button(props: ButtonProps) {
    return (
        <button 
            type={props.type} 
            name={props.name} 
            className="bg-slate-200 p-4 rounded-full hover:bg-slate-300 cursor-pointer"
        >
            {props.text}
        </button>
    );
}

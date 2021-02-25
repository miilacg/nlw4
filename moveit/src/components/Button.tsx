import { useState } from 'react'; 

interface ButtonProps {
    color: string;
    children: string;
}

//o componente recebe por paramentro todas as propriedades dele
export function Button(props: ButtonProps){    
    const [counter, setCounter] = useState(1); 
    
    function increment() {
        setCounter(counter + 1); //eu preciso criar um novo valor para counter ao inves de mudar o valor dele
    }

    return (
        //o estilo poderia ser passado igual em HTML
        <button 
            type="button" 
            style={{ backgroundColor: props.color }}
            onClick={increment} //incrementa um número ao clicar no botão
        > 
            { props.children } <strong>{ counter }</strong>
        </button>
    );
}
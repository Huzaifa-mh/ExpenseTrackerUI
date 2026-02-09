import { useState, type FormEvent } from "react";


interface DateFilterProps {
    onFilter:(startDate: string, endDate:string) => void;
    onClear:() => void;
}

function DateFilter( {onFilter, onClear}: DateFilterProps) {

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(startDate && endDate){
            onFilter(startDate, endDate);
        }
    };

    const handleClear = () =>{
        setStartDate('');
        setEndDate('');
        onClear();
    }
}
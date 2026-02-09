import { useState } from "react";


interface DateFilterProps {
    onFilter:(startDate: string, endDate:string) => void;
    onClear:() => void;
}

function DateFilter( {onFilter, onClear}: DateFilterProps) {

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    
}
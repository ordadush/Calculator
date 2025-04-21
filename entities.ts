
export class CalculatorState {
    currentValue: string = "0"; 
    memoryValue: number = 0;  
    operator: string | null = null; 
    waitingForNext: boolean = false; 
}

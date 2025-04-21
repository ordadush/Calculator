export class CalculatorState {
    constructor() {
        this.currentValue = "0";
        this.memoryValue = 0;
        this.operator = null;
        this.waitingForNext = false;
    }
}

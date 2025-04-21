// calculator.ts
import { CalculatorState } from './entities';


console.log("loaded")

const state = new CalculatorState();

const displayElement = document.querySelector(".display") as HTMLElement;
const buttons = document.querySelectorAll(".box");

// עבור כל כפתור במחשבון – מאזינים ללחיצה
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent?.trim() || "";
        const type = button.getAttribute("data-type");

        switch (type) {
            case "num":
                handleNumber(value);
                break;
            case "acction":
                handleOperator(value);
                break;
            case "general":
                handleGeneral(value);
                break;
            case "clear":
                handleClear();
                break;
        }

        updateDisplay();
    });
});

function handleNumber(value: string) {
    if (state.waitingForNext) {
        state.currentValue = value;
        state.waitingForNext = false;
    } else {
        state.currentValue =
            state.currentValue === "0" ? value : state.currentValue + value;
    }
}

function handleOperator(op: string) {
    state.operator = op;
    state.memoryValue = parseFloat(state.currentValue);
    state.waitingForNext = true;
}

function handleGeneral(value: string) {
    if (value === "=") {
        const current = parseFloat(state.currentValue);
        let result = 0;

        switch (state.operator) {
            case "+": result = state.memoryValue + current; break;
            case "-": result = state.memoryValue - current; break;
            case "*": result = state.memoryValue * current; break;
            case "/": result = state.memoryValue / current; break;
        }

        state.currentValue = result.toString();
        state.waitingForNext = true;
        state.operator = null;
    } else if (value === "C") {
        state.currentValue = "0";
        state.operator = null;
        state.memoryValue = 0;
    }
}

function handleClear() {
    state.currentValue = state.currentValue.slice(0, -1) || "0";
}

function updateDisplay() {
    if (displayElement) {
        displayElement.innerText = state.currentValue;
    }
}


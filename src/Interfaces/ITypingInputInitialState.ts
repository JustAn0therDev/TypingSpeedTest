export default interface ITypingInputInitialState {
    wordArrayIndex: number,
    wordsPerMinute: number,
    startDateInMilisseconds: number
    referenceToInputElement: HTMLInputElement | null
}
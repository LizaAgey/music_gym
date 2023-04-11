export function getRandomIndex<T>(arr: T[], excludedIndex?: number): number {
    const length = arr.length;
    let randomIndex: number;

    do {
        randomIndex = Math.floor(Math.random() * length);
    } while (randomIndex === excludedIndex);

    return randomIndex;
}
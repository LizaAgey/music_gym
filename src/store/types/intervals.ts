interface Interval {
    name: string;
    semitones: number;
}

export const intervals: Interval[] = [
    { name: "1P", semitones: 0 },
    { name: "2m", semitones: 1 },
    { name: "2M", semitones: 2 },
    { name: "3m", semitones: 3 },
    { name: "3M", semitones: 4 },
    { name: "4P", semitones: 5 },
    { name: "4A", semitones: 6 },
    { name: "5d", semitones: 6 },
    { name: "5P", semitones: 7 },
    { name: "6m", semitones: 8 },
    { name: "6M", semitones: 9 },
    { name: "7m", semitones: 10 },
    { name: "7M", semitones: 11 },
    { name: "8P", semitones: 12 }
];

export function getInterval(name: string): Interval | undefined {
    return intervals.find(interval => interval.name === name);
}
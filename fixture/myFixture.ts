import {test as myTest} from '@playwright/test';

type Sanjay = {
    age: number,
    email: string
}

const myFixtureTest = myTest.extend<Sanjay>({
    age: 27,
    email: "sanjayspear@gmail.com"
});

export const test = myFixtureTest;
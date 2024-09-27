import {test} from './myFixture';

test('fixture Demo', async ({age, email}) => {
    console.log(`My age is ${age}, and my email id is ${email}.`);
    console.log(`My age is ${age+15}, and my email id is ${email.toUpperCase()}.`);
}); 
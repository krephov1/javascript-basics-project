'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

const profile = {};

// Voornaam: mag niet leeg zijn
while (true) {
    const answer = prompt('What is your first name? ').trim();

    if (answer !== '') {
        profile.first_name = answer;
        break;
    }

    console.log('Please enter your first name.');
}

// Achternaam: mag niet leeg zijn
while (true) {
    const answer = prompt('What is your last name? ').trim();

    if (answer !== '') {
        profile.last_name = answer;
        break;
    }

    console.log('Please enter your last name.');
}

// Leeftijd: moet een getal van minimaal 18 zijn
while (true) {
    const answer = Number(prompt('How old are you? '));

    if (Number.isFinite(answer) && answer >= 18) {
        profile.age = answer;
        break;
    }

    console.log('Please enter a valid age of 18 or higher.');
}

// Gender: alleen M, F of X
while (true) {
    const answer = prompt('What is your gender? (M/F/X): ')
        .trim()
        .toUpperCase();

    if (['M', 'F', 'X'].includes(answer)) {
        profile.gender = answer;
        break;
    }

    console.log('Please enter M, F or X.');
}

// Gender interesse: alleen M, F of X
while (true) {
    const answer = prompt('Which gender are you interested in? (M/F/X): ')
        .trim()
        .toUpperCase();

    if (['M', 'F', 'X'].includes(answer)) {
        profile.gender_preference = answer;
        break;
    }

    console.log('Please enter M, F or X.');
}

// Locatie: alleen rural of city
while (true) {
    const answer = prompt('Where do you live? (rural/city): ')
        .trim()
        .toLowerCase();

    if (['rural', 'city'].includes(answer)) {
        profile.location = answer;
        break;
    }

    console.log('Please enter rural or city.');
}

// Minimumleeftijd interesse: minimaal 18
while (true) {
    const answer = Number(
        prompt('What is the minimum age you are interested in? ')
    );

    if (Number.isFinite(answer) && answer >= 18) {
        profile.min_age_interest = answer;
        break;
    }

    console.log('Please enter a valid age of 18 or higher.');
}

// Maximumleeftijd: minimaal 18 en hoger dan de minimumleeftijd
while (true) {
    const answer = Number(
        prompt('What is the maximum age you are interested in? ')
    );

    if (
        Number.isFinite(answer) &&
        answer >= 18 &&
        answer > profile.min_age_interest
    ) {
        profile.max_age_interest = answer;
        break;
    }

    console.log(
        'Please enter a valid age of 18 or higher, greater than ' +
        profile.min_age_interest + '.'
    );
}

console.log('Your profile:', profile);
const matches = [];

for (const candidate of mockData) {
    if (
        candidate.age > profile.min_age_interest &&
        candidate.age <= profile.max_age_interest &&
        candidate.gender_preference === profile.gender &&
        candidate.gender === profile.gender_preference &&
        candidate.location === profile.location
    ) {
        matches.push(candidate);
    }
}

console.log(`\nNumber of matches: ${matches.length}`);

if (matches.length === 0) {
    console.log('No matches found.');
} else {
    console.log('\nYour matches:');

    for (const match of matches) {
        console.log(
            `${match.first_name} ${match.last_name} | ` +
            `Age: ${match.age} | Location: ${match.location}`
        );
    }
}
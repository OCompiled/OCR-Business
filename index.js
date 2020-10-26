/**
 * Author: Olujimi Adetula
 * Date: 10/26/20
 * Purpose: Find specific information from the Array of data.
 */
class ContactInfo {

    /**
     * Returns First and Last Name
     * @param {*} scannedDoc The array of collected information
     */
    getName(scannedDoc) {
        var len = scannedDoc.length;
        //The email is always at the bottom, so get the last item
        //from the input
        var mail = scannedDoc[len - 1];
        var name = this.findName(mail, scannedDoc);
        name = name.trim(); //remove any extra space between the words
        return name;
    }

    /**
     * Returns: The first and last name found in the array
     * @param {*} mail Is the email from the bussiness card
     * @param {*} scannedDoc  Is the array of collected information
     */
    findName(mail, scannedDoc) {
        var mailLetters = mail.split("");
        var values = [];
        var index = 0;

        //The emails contain information about the name, before a character
        //that is not a letter, find those characters
        while (mailLetters[index].toLowerCase() != mailLetters[index].toUpperCase()) {
            values[index] = mailLetters[index];
            index++;
        }
        values = values.join(""); //combine those characters
        var nameData = values;
        //Sometimes there are initials, attached to the name, remove a letter
        //at a time from the value, and compare it to the rest of the Business Card
        try {
            for (var i = 0; i < scannedDoc.length - 2; i++) {
                for (var n = 0; n < scannedDoc.length - 2; n++) {
                    if (scannedDoc[i].includes(nameData)) {
                        console.log(scannedDoc[i]);
                        return scannedDoc[i];
                    }
                    else if (nameData.length >= 4) {
                        nameData = nameData.substring(1);
                    }
                    else {
                        n = scannedDoc.length - 2;
                    }
                }
                nameData = values;
            }
        }
        catch (exception) { console.log("Array Out of bound"); }
    }

    /**
     * Returns the phone number
     * @param {*} scannedDoc The array of collected information
     */
    getPhoneNumber(scannedDoc) {
        var numFormat1 = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/im
        var found = 0;
        var number;
        //Find where there are a string of numbers
        scannedDoc.forEach(ele => {
            if (ele.match(numFormat1)) {
                //Because match returns all occurances, but we only need the first one
                //The phone number is always the first set of numbers
                if (ele.includes(ele) && found == 0) {
                    found++;
                    ele = ele.replace(/[^0-9]/g, '');
                    console.log(ele);
                    number = ele;
                }
            }
        })
        return number;

    }
    /**
 * Returns the email
 * @param {*} scannedDoc The array of collected information
 */
    getEmailAddress(scannedDoc) {
        var mail;
        //Email contains @ symbol, find it, remove all unneeded spaces
        scannedDoc.forEach(email => {
            if (email.includes("@")) {
                email = email.replace(/\s/g, '');
                console.log(email);
                mail = email;
            }
        })
        return mail;
    }
}
/**
 * Author: Olujimi Adetula
 * Date: 10/26/20
 * Purpose: Get contact information
 */

class BusinessCardParser {
    /**
     * Returns an Array of information
     * @param {*} cardInfo The OCR result from scanning an image
     */
    getContactInfo(input) {
        var infoGetter = new ContactInfo();
        const consoleLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Request user input
        consoleLine.setPrompt(chalk.yellow.underline('Business card Data:'));
        consoleLine.prompt();

        //trim so each line is an entry
        consoleLine.on('line', cmd => input.push(cmd.trimEnd()));

        consoleLine.on('close', () => {
            const name = infoGetter.getName(input);
            const phone = infoGetter.getPhoneNumber(input);
            const email = infoGetter.getEmailAddress(input);

            //print the result
            console.log(chalk.inverse('Result:'));
            console.log(chalk.blue('Name:'), name);
            console.log(chalk.blue('Phone:'), phone);
            console.log(chalk.blue('Email:'), email);

            process.exit(0);
        });
    }
}

const readline = require('readline');
const chalk = require('chalk'); //adding some color
const input = [];
var cardParser = new BusinessCardParser();
cardParser.getContactInfo(input);






# OCR Business-Card
- Is a Command Line tool, that reads the result of an OCR(Optical Character Recognition) operation has text, and then extract the name, phone number, and email from the text.

## Requirement
- This program needs node/npm if you currently do not have node.npm you can download it at: https://nodejs.org/en/
- The dependencies like chalk are already installed in package-lock.json file.

## Usage
- Open up terminal
- Clone project with: git clone https://github.com/OCompiled/OCR-Bussiness.git
- Or you can download the Zip
- Change directory to the installed file using: cd [FILE PATH]
- If package-lock.json is missing run: npm install
- Once complete run the file: node index.js
- Enter Bussiness card information
- Once complete, show the output with: Control-D

## Testing
- For easy testing open testDOC.txt. It contains 3 sample Bussiness Cards. All you need to do is copy each one and paste it into the program.


## Program Breakdown
- ContactInfo
  - ContactInfo serves the purpose of extracting the name, phone number, and email from the
    input collected by the user. The getName() method takes in the input in array from, uses knowledge of the email pattern to determine the name with findName(). getPhoneNumber() finds a string of numbers and extract their values from the string.
    The getEmailAddress() finds the email string, using characteristic of an email.
- BusinessCardParser
  - BusinessCardParser serves the purpose of collecting Bussiness Card information from the
    user, processing that information, and then displaying the result using getContactInfo() method.


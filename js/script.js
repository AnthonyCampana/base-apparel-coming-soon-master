const formButton = document.getElementById("formSubmission");
const formbttn = document.getElementsByTagName("button");
function validatePrefix(prefix) {
    let quoteClosure = true;
        
        for (let i = 0; i < prefix.length; i++) {
            if(quoteClosure) {
                if((33 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 39) || prefix.charCodeAt(i) === 42 || prefix.charCodeAt(i) === 43 || (45 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 47) || prefix.charCodeAt(i) === 61 || prefix.charCodeAt(i) == 63 || (123 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 126)) {
                    if(prefix.charAt(i) === '"' ) {
                        quoteClosure = false
                    } else if(prefix.charAt(i) === '.') {
                        if(i === 0 || i === prefix.length -1) {
                            return false;
                        } else if(prefix.charAt(i+1) === '.') {
                            return false;
                        }
                    }
                } else if((48 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 57) || (65 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 90) || (97 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 122)) {
                } else {
                    return false
                }
            } else {
                if(prefix.charAt(i) === '"') {
                    quoteClosure = true;
                } else if(i == prefix.length-1) {
                    return false;
                }
            }
        }
        return true;
}

function validateDomain(domain) {
    let IPaddress = false;
    for (let i = 0; i < domain.length; i++) {
        if(!IPaddress) {
            if(domain.charCodeAt(i) === 45 || domain.charCodeAt(i) === 46 || (48 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 57) || (65 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 91) || (97 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 122)) {
                if(domain.charAt(i) === '-' && (i === 0 || i === domain.length -1)) {
                    return false
                } else if(domain.charAt(i) == '.' && domain.length - (i+1) < 2) {
                    return false;
                } else if(domain.charAt(i) === '[') {
                    IPaddress = true;
                }
            }
        } else {
            if(domain.charAt(i) === ']' && i != domain.length-1) {
                return false;
            }  
        }
    }
    return true;
}

formButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputField = document.getElementsByTagName("input");
    const errorMessage = document.getElementsByClassName("error-message");
    const errorIcon = document.getElementsByClassName("error-icon");
    const form = document.getElementsByTagName("form");
    let validEmail = true;

    if (inputField[0].value.indexOf("@") != -1 ) {
        const prefix = inputField[0].value.substring(0, inputField[0].value.indexOf("@"));
        const domain = inputField[0].value.substring(inputField[0].value.indexOf("@")+1);
        
        validEmail = validatePrefix(prefix) && validateDomain(domain);

        console.log(validEmail);
    } else {
        validEmail = false
    }

    console.log(formButton.style);
    console.log(formbttn[0].style);
    if (!validEmail) {
        errorMessage[0].style.display = "block";
        errorIcon[0].style.display = "block"
        form[0].style.border = "1px solid hsl(0, 93%, 68%)";
        formButton.style.backgroundImage = "linear-gradient(135deg, hsl(0, 80%, 86%), hsl(0, 80%, 86%))";
    } else {
        errorMessage[0].style.display = "none";
        errorIcon[0].style.display = "none";
        form[0].style.border = ".5px solid hsl(0, 36%, 70%)";
        formButton.style.backgroundImage = "linear-gradient(135deg, hsl(0, 80%, 86%), hsl(0, 74%, 74%))";
    }
})
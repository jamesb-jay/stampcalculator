const canvas = document.getElementById("stampDisplay");
const context = canvas.getContext("2d");
const postageAmount = document.getElementById("postageAmount");

onep = document.getElementById("img1");

const stampWidth = 140;
const stampHeight = 110
const allStampValues = [1, 2, 5, 10, 20, 50, 75, 100, 110, 115, 160, 185, 200, 220, 255, 500];

let enabledStampValues = allStampValues;


function getStampImage(value)
{
    if (allStampValues.includes(value))
    {
        return document.getElementById(`img${value}`);
    }
    return null;
}

function drawStamps(stampsToDraw)
{
    var i = 0;
    var image;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < stampHeight * 5; y += stampHeight)
    {
        for (let x = 0; x < stampWidth * 5; x += stampWidth)
        {
            image = getStampImage(stampsToDraw[i++]);
            if (image)
            {
                context.drawImage(image, x, y);
            }
            if (i > stampsToDraw.length - 1)
            {
                return;
            }
        }
    }
}

function drawMessage(message, subMessage)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Arial";

    context.fillText(message, 100, 100);

    context.font = "20px Arial";
    context.fillText(subMessage, 100, 150);

    return;
}

function calcAndUpdate()
{
    let possibleResults = [[], []];
    let targetValue = Math.round(postageAmount.value * 100);
    let lastStampValue = 0;
    
    // Try all values
    let amountLeftA = targetValue;

    for (let i = enabledStampValues.length - 1; i > -1;)
    {
        if (amountLeftA - enabledStampValues[i] > -1)
        {
            amountLeftA -= enabledStampValues[i];
            possibleResults[0].push(enabledStampValues[i]);
        }
        else
        {
            i--;
        }
    }
    
    // Try just multiples of 10 
    let amountLeftB = targetValue;
    for (let i = enabledStampValues.length - 1; i > -1;)
    {
        if (enabledStampValues[i] % 10 != 0)
        {
            i--;
            continue;
        }

        if (amountLeftB - enabledStampValues[i] > -1)
        {
            amountLeftB -= enabledStampValues[i];
            possibleResults[1].push(enabledStampValues[i]);
        }
        else
        {
            i--;
        }
    }

    for (let i = enabledStampValues.length - 1; i > -1;)
    {
        if (amountLeftB - enabledStampValues[i] > -1)
        {
            amountLeftB -= enabledStampValues[i];
            possibleResults[1].push(enabledStampValues[i]);
        }
        else
        {
            i--;
        }
    }


    if (amountLeftA > 0 && amountLeftB > 0)
    {
        // If not possible
        drawMessage("Not possible.", "Enable more stamps.")
        return;
    }

    if (possibleResults[1].length < possibleResults[0].length)
    {
        drawStamps(possibleResults[1]);
        return;
    }
    else
    {
        drawStamps(possibleResults[0]);
        return;
    }
    
}

function updateEnabled()
{
    let cb;
    enabledStampValues = [];

    for (let i = 0; i < allStampValues.length; i++)
    {
        cb = document.getElementById(`enable${allStampValues[i]}`);
        if (cb == null)
            continue;

        if (cb.checked)
        {
            enabledStampValues.push(allStampValues[i]);
        }    
    }

    calcAndUpdate();
}

function onPageLoad()
{
    postageAmount.addEventListener("input", updateEnabled);
}

window.addEventListener("load", onPageLoad);

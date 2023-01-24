const canvas = document.getElementById("stampDisplay");
const context = canvas.getContext("2d");
const postageAmount = document.getElementById("postageAmount");

onep = document.getElementById("img1");

const stampWidth = 140;
const stampHeight = 110
const stampValues = [1, 2, 5, 10, 20, 50, 68, 100, 105, 145, 185, 200, 255, 500];

let stamps = [1, 2, 2, 5, 5, 5, 5];
let enabledStamps = [];


function getStampImage(value)
{
    if (stampValues.includes(value))
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

function amountChanged()
{
    let stampsToUse = [];
    let amountLeft = postageAmount.value * 100;
    let i = stampValues.length - 1;
    
    while (i > -1)
    {
        let cStamp = stampValues[i];
        if (amountLeft - cStamp < 0)
        {
            i--;
        }
        else
        {
            amountLeft -= cStamp;
            stampsToUse.push(cStamp);
        }
    }

    drawStamps(stampsToUse);
}

function onPageLoad()
{
    postageAmount.addEventListener("input", amountChanged);
}

window.addEventListener("load", onPageLoad);
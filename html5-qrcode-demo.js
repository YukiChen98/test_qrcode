var lastResult = ""
var resultCount = 0


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++resultCount;
        lastResult = decodedText;
        console.log(`Scan result = ${decodedText}`, decodedResult);
 
        resultContainer.innerHTML += `<div>[${resultCount}] - ${decodedText}</div>`;
    }
}

function onScanError(qrCodeError) {
    // This callback would be called in case of qr code scan error or setup error.
    // You can avoid this callback completely, as it can be very verbose in nature.
}

docReady(function() {
    var resultContainer = document.getElementById('qr-reader-results');
    
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10 });
   
    html5QrcodeScanner.render(onScanSuccess, onScanError);
});

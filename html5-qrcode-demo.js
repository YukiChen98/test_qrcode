var lastResult = ""
var resultCount = 0
var resultContainer = document.getElementById('qr-reader-results');

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
        
        test_call()
    }
}

function onScanError(qrCodeError) {
    // This callback would be called in case of qr code scan error or setup error.
    // You can avoid this callback completely, as it can be very verbose in nature.
}

function test_call() {
    fetch("https://a44f-2600-6c5e-54f0-6310-53ac-a9cb-3b36-60da.ngrok-free.app/coupon/123", {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((data) => document.getElementById('qr-reader-results').innerHTML += data)
      .catch((err) => console.log(err));
}

docReady(function() {
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10 });
   
    html5QrcodeScanner.render(onScanSuccess, onScanError);
});

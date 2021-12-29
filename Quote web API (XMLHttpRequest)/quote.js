window.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#fetchQuotesBtn")
    .addEventListener("click", function () {
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic =
        topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount =
        countDropdown.options[countDropdown.selectedIndex].value;

      fetchQuotes(selectedTopic, selectedCount);
    });
});

function fetchQuotes(topic, count) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open(
    "GET",
    "https://wp.zybooks.com/quotes.php?topic=" + topic + "&count=" + count
  );
  xhr.send();
}

function responseReceivedHandler() {
  if (this.status === 200) {
    let quotes = this.response;
    let html = "<ol>";
    for (let c = 0; c < quotes.length; c++) {
      html += `<li>${quotes[c]["quote"]} - ${quotes[c]["source"]}</li>`;
    }
    html += "</ol>";

    document.querySelector("#quotes").innerHTML = html;

    let errorMessage = quotes["error"];

    if (errorMessage != null) {
      document.querySelector("#quotes").innerHTML = errorMessage;
    }
  }
}

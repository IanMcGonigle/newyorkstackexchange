window.onload = function() {
  document.getElementById("reloadBtn").addEventListener("click", function() {
    window.location.reload();
  });
  document.getElementById("saveBtn").addEventListener("click", function() {
    console.log("domtoimage ", window.domtoimage);
    var cartoon = document.getElementById("cartoon");
    var title = document.getElementById("thetext").value;

    domtoimage
      .toPng(cartoon, { bgcolor: "#fff" })
      .then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = `${title}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  });
};

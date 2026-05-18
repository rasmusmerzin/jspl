addEventListener("load", onLoad);

function onLoad() {
  Array.from(document.getElementsByTagName("pre")).forEach(async (pre) => {
    const src = pre.getAttribute("src");
    if (!src) return;
    const url = new URL(src, location);
    const response = await fetch(url);
    const content = await response.text();
    pre.innerText = content;
  });
}

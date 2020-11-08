export function getHeader() {
  let header = {};
  header.id = localStorage.getItem("id");
  header.key = localStorage.getItem("key");
  if (!header.id || !header.key) {
    return;
  }
  let theHeader = new Headers();

  for (var k in header) {
    theHeader.append(k, header[k]);
  }

  theHeader.append("Content-Type", "application/json");

  return theHeader;
}

export function setHeader(header) {
  localStorage.setItem("id", header.id);
  localStorage.setItem("key", header.key);
}

export function deleteHeader() {
  localStorage.clear();
  return;
}

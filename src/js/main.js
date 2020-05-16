window.onload = function displayTable() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/albums", true);
  xhr.onload = function () {
    if (this.status === 200) {
      let albums = JSON.parse(this.responseText);

      let state = {
        querySet: albums,
        page: 1,
        rows: 10,
      };

      buildTable();
      function pagination(querySet, page, rows) {
        let trimStart = (page - 1) * rows;
        let trimEnd = trimStart + rows;
        let trimmedData = querySet.slice(trimStart, trimEnd);
        let pages = Math.ceil(querySet.length / rows);
        return {
          querySet: trimmedData,
          pages: pages,
        };
      }
      function pageButtons(pages) {
        let wrapper = document.querySelector("#pagination-wrapper");
        wrapper.innerHTML = "";
        for (let page = 1; page <= pages; page++) {
          wrapper.innerHTML += `<button value="${page}" id="page" class="page bg-teal-600 text-teal-200 px-3 py-2 mr-1">${page}</button>`;
        }
        let pageButtons = document.querySelectorAll("#page");
        for (const pageButton of pageButtons) {
          pageButton.addEventListener("click", function (e) {
            let table = document.querySelector("#tableContent");
            table.innerHTML = "";
            state.page = Number(e.target.value);
            buildTable();
          });
        }
      }
      function buildTable() {
        let table = document.querySelector("#tableContent");
        let data = pagination(state.querySet, state.page, state.rows);
        let albums = data.querySet;
        let i = 1;
        let row = "";
        for (i in albums) {
          row += `<tr>
            <td>${albums[i].userId}</td>
            <td>${albums[i].id}</td>
            <td>${albums[i].title}</td>
            </tr>`;
        }
        table.innerHTML = row;
        pageButtons(data.pages);
      }
    }
  };
  xhr.send();
};

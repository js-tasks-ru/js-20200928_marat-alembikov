export default class SortableTable {
  headers = [];
  data = [];
  subElements = {};

  constructor(headers = [], { data = [] } = {}) {
    this.headers = headers;
    this.data = data;
    this.render();
  }

  renderTableHeader() {
    return `<div data-elem="header" class="sortable-table__header sortable-table__row">
      ${this.headers
        .map(
          ({ id, sortable, title }) =>
            `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
          
          <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
          </span>
      </div>
      `
        )
        .join("")}
      </div>`;
  }

  renderTableBody() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.renderTableRows(this.data)}
    </div>`;
  }

  get tableTemplate() {
    return `
    <div class="sortable-table">
        ${this.renderTableHeader()}

        ${this.renderTableBody()}
    </div>`;
  }

  render() {
    const wrap = document.createElement("div");
    wrap.innerHTML = this.tableTemplate;

    const element = wrap.firstElementChild;
    this.element = element;
    this.subElements = this.renderSubElements(element);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll(
      ".sortable-table__cell[data-id]"
    );
    const currentColumn = this.element.querySelector(
      `.sortable-table__cell[data-id="${field}"]`
    );

    allColumns.forEach((column) => {
      column.dataset.order = "";
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.renderTableRows(sortedData);
  }

  sortData(field, order) {
    const column = this.headers.find((item) => item.id === field);
    const { sortType, customSorting } = column;
    const direction = order === "asc" ? 1 : -1;

    return [...this.data].sort((a, b) => {
      switch (sortType) {
        case "number":
          return direction * (a[field] - b[field]);
        case "string":
          return direction * a[field].localeCompare(b[field], "ru");
        case "custom":
          return direction * customSorting(a, b);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  renderSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");
    const subElementsCollection = {};

    for (const subElement of [...elements]) {
      subElementsCollection[subElement.dataset.element] = subElement;
    }

    return subElementsCollection;
  }

  renderTableRows(data) {
    return data
      .map(
        (item) =>
          `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.renderTableRow(item)}
      </a>`
      )
      .join("");
  }

  renderTableRow(item) {
    const cells = this.headers.map(({ id, template }) => {
      return {
        id,
        template,
      };
    });

    return cells
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`;
      })
      .join("");
  }

  destroy() {
    return this.element.remove();
  }
}

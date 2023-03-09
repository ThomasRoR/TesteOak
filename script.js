const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const saveModalButton = document.querySelector("#saveButton");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade, saveModalButton].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();
    if (this.editId == null) {
      this.adicionar(produto);
    } else {
      this.atualizar(this.editId, produto);
    }

    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();
      let td_id = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_disponibilidade = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_nome.innerText = this.arrayProdutos[i].nomeProduto;
      td_descricao.innerText = this.arrayProdutos[i].descricao;
      td_preco.innerText = this.arrayProdutos[i].preco;
      td_disponibilidade.innerText = this.arrayProdutos[i].disponibilidade;

      const toggleModal = () => {
        modal.classList.toggle("hide");
        fade.classList.toggle("hide");
      };

      let imgEdit = document.createElement("img");
      imgEdit.src = "img/editar.png";
      imgEdit.setAttribute("id", "edit");
      imgEdit.setAttribute(
        "onclick",
        "produto.preparaEditacao(" + JSON.stringify(this.arrayProdutos[i]) + ")"
      );

      imgEdit.addEventListener("click", () => toggleModal());

      let imgDelete = document.createElement("img");
      imgDelete.src = "img/excluir.png";
      imgDelete.setAttribute(
        "onclick",
        "produto.deletar(" + this.arrayProdutos[i].id + ")"
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);

      console.log(this.arrayProdutos);
    }
  }

  openModalEdit() {
    let edit = document.getElementById("edit");
    edit.setAttribute(
      "onclick",
      "produto.preparaEditacao(" + JSON.stringify(this.arrayProdutos[i]) + ")"
    );
  }
  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].descricao = produto.descricao;
        this.arrayProdutos[i].preco = produto.preco;
        this.arrayProdutos[i].disponibilidade = produto.disponibilidade;
      }
    }
  }

  preparaEditacao(dados) {
    this.editId = dados.id;

    document.getElementById("produto").value = dados.nomeProduto;
    document.getElementById("descricao").value = dados.descricao;
    document.getElementById("currency-field").value = dados.preco;
    document.getElementById("disponibilidadeVenda").value =
      dados.disponibilidade;
    document.getElementById("saveButton").innerText = "Atualizar";
  }

  lerDados() {
    let produto = {};
    produto.id = this.id;
    produto.nomeProduto = document.getElementById("produto").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.preco = document.getElementById("currency-field").value;
    produto.disponibilidade = document.getElementById(
      "disponibilidadeVenda"
    ).value;

    return produto;
  }

  cancelar() {
    produto.nomeProduto = document.getElementById("produto").value = "";
    produto.preco = document.getElementById("currency-field").value = "";
    produto.descricao = document.getElementById("descricao").value = "";
    produto.disponibilidade = document.getElementById(
      "disponibilidadeVenda"
    ).value = "";

    document.getElementById("saveButton").value = "Salvar";
    this.editId = null;
  }

  deletar(id) {
    if (confirm("deseja realmente deletar o produto de ID" + id)) {
      let tbody = document.getElementById("tbody");
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
}

th = document.getElementsByTagName("th");
for (let c = 0; c < th.length; c++) {
  th[c].addEventListener("click", item(c));
}

function item(c) {
  return function () {
    console.log(c);
    sortTable(c);
  };
}
function sortTable(c) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[c];
      y = rows[i + 1].getElementsByTagName("TD")[c];
      // Check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

var produto = new Produto();

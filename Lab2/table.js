class Table {
    constructor(containerID) {
        let objName = "MuseumTable";
        this.objName = objName;
        let dialogs = "\n" +
            "<div class=\"modal fade\" id=\"addRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"addRowModalTitle\">Добавить экспонат</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <div class=\"\">\n" +
            "                    <label for=\"NameCreateInput\">Название</label>\n" +
            "                    <input required id=\"NameCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"NameCreateInput\">Страна</label>\n" +
            "                    <input  required id=\"CountryCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"NameCreateInput\">количество</label>\n" +
            "                    <input required id=\"SumCreateInput\" type=\"number\" class=\"form-control\">\n" +
            "                    <label for=\"NameCreateInput\">Тип</label>\n" +
            "                    <input required id=\"TypeCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeAddRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отмена</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickCreateshowpiece('" + objName + "')\">Подтвердить</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"deleteRowsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteRowsModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"deleteRowsModalTitle\">Удалить экспонат</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                Вы действительно хотите удалить?\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeDeleteRowsModalModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отмена</button>\n" +
            "                <button type=\"button\" class=\"btn btn-danger\" onclick=\"onClickDeleteshowpiece('" + objName + "')\">Да</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"updateRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"updateRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"updateRowModalTitle\">Обновить</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <label for=\"NameCreateInput\">Название</label>\n" +
            "                <input required id=\"NameUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"NameCreateInput\">Страна</label>\n" +
            "                <input  required id=\"CountryUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"NameCreateInput\">количество</label>\n" +
            "                <input required id=\"SumUpdateInput\" type=\"number\" class=\"form-control\">\n" +
            "                <label for=\"NameCreateInput\">Тип</label>\n" +
            "                <input required id=\"TypeUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <input hidden required id=\"keyUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeUpdateRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Отмена</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickUpdateSaveshowpiece('" + objName + "')\">Сохранить</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n";
        var thisObj = this;
        this.containerID = containerID;
        $("html").append(dialogs);
        this.dbUrl = 'http://localhost:8000';
        this.allshowpiece = [];
        this.displayshowpiece = [];
        this.sortField = null;
        this.isDescSort = false;
        this.filter = '';
        this.currentPage = 0;
        this.displayPagesCount = 0;
        this.rowsOnPage = 10;
        this.maxDisplayPages = 50;
        this.showpieceFields = ['Название', 'Страна', 'Количество', 'Тип'];
        this.createInputName = $('#NameCreateInput');
        this.createInputCountry = $('#CountryCreateInput');
        this.createInputsum = $('#sumCreateInput');
        this.createInputType = $('#TypeCreateInput');

        this.updateInputName = $('#NameUpdateInput');
        this.updateInputCountry = $('#CountryUpdateInput');
        this.updateInputsum = $('#sumUpdateInput');
        this.updateInputType = $('#TypeUpdateInput');
        this.updateInputKey = $('#keyUpdateInput');

        this.filterBy();
        this.sortByField();
        this.renderWidget();
    }
    createshowpiece(Name, Country, Sum, Type) {
        let newUser = {
            Name: Name,
            Country: Country,
            Sum: Sum,
            Type: Type
        };
        $.post(this.dbUrl + '/showpiece', newUser)
            .done((data, status) => {
                console.log({data: data, status: status});
                this.refresh();
            });
    }
    updateshowpiece(key, Name, Country, Sum, Type) {
        let newUser = {
            Name: Name,
            Country: Country,
            Sum: Sum,
            Type: Type
        };
        $.ajax({
            url: this.dbUrl + '/showpiece/' + key,
            method: 'PUT',
            data: newUser,
            success: (result)=>{
                this.refresh();
            },
        });
    }
    deleteshowpiece(key) {
        $.ajax({
            url: this.dbUrl + '/showpiece/' + key,
            method: 'DELETE',
            success: (result)=>{
                this.refresh();
            },
        });
    }
    renderWidget() {
        let objectName = "MuseumTable";
        let container = $(this.containerID);
        container.html('');

        let searchDiv = $('<div class="form-group row" style="margin: 10px 0 30px 20px">');
        searchDiv.append('<label for="searchInput" class="col-sm-0.5 col-form-label">Поиск</label>');
        searchDiv.append(
            $('<div class="col-sm-5">').append(
                $('<input id="searchInput" class="form-control" onchange="onClickFilter(\'' + objectName + '\');">').val(this.filter)
            )
        );
        container.append(searchDiv);
        container.append($('<div>').text('Количество записей: ' + this.displayshowpiece.length));
        let tableHtml = $('<table class="table table-striped">');

        let header = $('<tr>');
        header.append($('<th>').html('<i class="fas fa-trash"></i>'));
        header.append($('<th>').html('<i class="fas fa-edit"></i>'));
        header.append($('<th>').text('Номер'));
        for (let i = 0; i < this.showpieceFields.length; i++) {
            let a = $('<a href="#">').click({param1: objectName}, onClickSortByField).text(this.showpieceFields[i]);
            if (this.showpieceFields[i] === this.sortField) {
                a = $('<b>').append(a).append(this.isDescSort ? ' <i class="fas fa-long-arrow-alt-down"></i>' : ' <i class="fas fa-long-arrow-alt-up"></i>');
            } else {
                a = $('<span>').append(a).append(' <i class="fas fa-arrows-alt-v" style="color: rgba(133,133,133,0.31)"></i>');
            }
            header.append($('<th>').append(a))
        }
        tableHtml.append(header);
        let firstDisplayI = (this.currentPage) * this.rowsOnPage;
        let lastDisplayI = ((this.currentPage) * this.rowsOnPage + this.rowsOnPage < this.displayshowpiece.length) ? (this.currentPage) * this.rowsOnPage + this.rowsOnPage : this.displayshowpiece.length;
        for (let i = firstDisplayI; i < lastDisplayI; i++) {
            let rowHtml = $('<tr>');
            rowHtml.append($('<td>').html('<input type="checkbox" name="type" value="' + this.displayshowpiece[i]._id + '" />'));
            rowHtml.append($('<td>').append($('<a href="#" class="fas fa-pen">').click({
                param1: i,
                param2: objectName
            }, onClickUpdateshowpiece)));
            rowHtml.append($('<td>').text(i));
            for (let j = 0; j < this.showpieceFields.length; j++) {
                rowHtml.append(
                    $('<td>').text(this.displayshowpiece[i][this.showpieceFields[j]])
                );
            }
            rowHtml.append($('<td id="key' + i + '" hidden>').text(this.displayshowpiece[i]._id));
            tableHtml.append(rowHtml);
        }
        container.append(tableHtml);
        let pagination = $('<div class="col-md-12" style="margin: 10px">');
        let allPagesCount = Math.ceil((this.displayshowpiece.length) / this.rowsOnPage);
        this.displayPagesCount = (allPagesCount > this.maxDisplayPages) ? this.maxDisplayPages : allPagesCount;
        let firstDisplayPage = 0;
        let lastDisplayPage = this.displayPagesCount;
        if (allPagesCount > this.maxDisplayPages) {
            if (this.currentPage - Math.trunc(this.maxDisplayPages / 2) < 0) {
                firstDisplayPage = 0;
                lastDisplayPage = this.maxDisplayPages;
            } else if (this.currentPage + Math.trunc(this.maxDisplayPages / 2) > allPagesCount) {
                firstDisplayPage = allPagesCount - 10;
                lastDisplayPage = allPagesCount;
            } else {
                firstDisplayPage = this.currentPage - Math.trunc(this.maxDisplayPages / 2);
                lastDisplayPage = this.currentPage + Math.trunc(this.maxDisplayPages / 2);
            }
        }
        for (let i = firstDisplayPage; i < lastDisplayPage; i++) {
            let enable = 'enable';
            if (i === this.currentPage)
                enable = 'disabled';
            let button = $('<button ' + enable + ' class="btn btn-sm btn-info" style="margin: 2px 10px 10px 0; width: 40px; height: 40px;">').text(i + 1);
            button.click({param1: objectName}, onSwitchPageClick);
            pagination.append(button);
        }
        container.append(pagination);
        let controlPanel = $('<div style="margin: 100px 50px 50px 10px">');
        controlPanel.append($('<button  type="button" class="btn btn-primary" data-toggle="modal" data-target="#addRowModal" style=" color: white">').text('Добавить'));
        controlPanel.append($('<button class="btn btn-danger" data-toggle="modal" data-target="#deleteRowsModal" style=" margin-left: 50px ;">').text('Удалить'));
        controlPanel.append($('<button class="btn btn-info" style=" margin-left: 50px ;">').text('Обновить').click(()=>{
            window[this.objName].refresh();
        }));
        controlPanel.append($('<button hidden id="updateButton" data-toggle="modal" data-target="#updateRowModal">').text('Обновить'));
        container.append(controlPanel);
    }
    refresh() {
        this.downloadData(() => {
            this.filterBy();
            this.sortByField();
            this.renderWidget();
        });
    }
    sortByField() {
        if (this.sortField !== null) {
            if (typeof this.allshowpiece[0][this.sortField] === "number") {
                if (this.isDescSort) {
                    this.displayshowpiece = this.displayshowpiece.sort((a, b) => {
                        return a[this.sortField] - b[this.sortField];
                    });
                } else {
                    this.displayshowpiece = this.displayshowpiece.sort((a, b) => {
                        return b[this.sortField] - a[this.sortField];
                    });
                }
            } else {
                if (this.isDescSort) {
                    this.displayshowpiece = this.displayshowpiece.sort((a, b) => {
                        return -a[this.sortField].localeCompare(b[this.sortField])
                    });
                } else {
                    this.displayshowpiece = this.displayshowpiece.sort((a, b) => {

                        return a[this.sortField].localeCompare(b[this.sortField])
                    });
                }
            }
        }
    }
    filterBy() {
        if (this.filter !== '') {
            this.displayshowpiece = this.allshowpiece.filter((value) => {
                return value.Name.indexOf(this.filter) !== -1
                    || value.Country.indexOf(this.filter) !== -1
                    || (value.Sum + '').indexOf(this.filter) !== -1
                    || value.Type.indexOf(this.filter) !== -1
            });
        } else
            this.displayshowpiece = this.allshowpiece.slice(0);
    }
    downloadData(done) {
        $.get(this.dbUrl + '/showpiece', (data, status) => {
            console.log({data: data, status: status});
            this.allshowpiece = data;
            done();
        });
    }
}
function onSwitchPageClick(objName) {
    let datatableonj = window[objName.data.param1];
    datatableonj.currentPage = parseInt(this.innerText) - 1;
    console.log(this);
    datatableonj.renderWidget();
}
function onClickFilter(objName) {
    let datatableonj = window[objName];
    datatableonj.filter = $('#searchInput').val();
    console.log(datatableonj.filter);
    datatableonj.filterBy();
    datatableonj.renderWidget();
}
function onClickSortByField(objName) {
    let datatableonj = window[objName.data.param1];
    let oldSortField = datatableonj.sortField;
    datatableonj.sortField = this.innerText;
    if (oldSortField === datatableonj.sortField) {
        datatableonj.isDescSort = !datatableonj.isDescSort;
    } else {
        datatableonj.isDescSort = false;
    }
    datatableonj.sortByField();
    datatableonj.renderWidget();
}
function onClickCreateshowpiece(objName) {
    let datatableonj = window[objName];
    let Name = datatableonj.createInputName.val();
    let Country = datatableonj.createInputCountry.val();
    let Sum = datatableonj.createInputSum.val();
    let Type = datatableonj.createInputType.val();
    if (Name === '' || Country === '' || Sum === '' || Type === '')
        return;
    datatableonj.createshowpiece(Name, Country, parseInt(Sum), Type);

    $('#closeAddRowModal').click();

    datatableonj.createInputName.val('');
    datatableonj.createInputCountry.val('');
    datatableonj.createInputSum.val('');
    datatableonj.createInputType.val('');

}
function onClickUpdateshowpiece(event) {
    let index = event.data.param1;
    let datatableonj = window[event.data.param2];
    $('#updateButton').click();
    datatableonj.updateInputName.val(datatableonj.displayshowpiece[index].Name);
    datatableonj.updateInputCountry.val(datatableonj.displayshowpiece[index].Country);
    datatableonj.updateInputSum.val(datatableonj.displayshowpiece[index].Sum);
    datatableonj.updateInputType.val(datatableonj.displayshowpiece[index].Type);
    datatableonj.updateInputKey.val(datatableonj.displayshowpiece[index]._id);
}
function onClickUpdateSaveshowpiece(objName) {
    let datatableonj = window[objName];
    let Name = datatableonj.updateInputName.val();
    let Country = datatableonj.updateInputCountry.val();
    let Sum = datatableonj.updateInputSum.val();
    let Type = datatableonj.updateInputType.val();
    let key = datatableonj.updateInputKey.val();

    if (Name === '' || Country === '' || Sum === '' || Type === '')
        return;
    datatableonj.updateshowpiece(key, Name, Country, parseInt(Sum), Type);

    $('#closeUpdateRowModal').click();

    datatableonj.updateInputName.val('');
    datatableonj.updateInputCountry.val('');
    datatableonj.updateInputSum.val('');
    datatableonj.updateInputType.val('');
}
function onClickDeleteshowpiece(objName) {
    let datatableonj = window[objName];
    let selected = [];
    $("input:checkbox[name=type]:checked").each(function () {
        selected.push($(this).val());
    });
    selected.forEach(function (value) {
        datatableonj.deleteshowpiece(value);
    });
    $('#closeDeleteRowsModalModal').click();
}
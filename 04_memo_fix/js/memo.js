"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません。");
            return;
        } else {
            viweStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    }, false
);

function viweStorage() {
    const list = document.getElementById("list");

    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name = 'checkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src = 'img/trash_icon.png' class = 'trash'>";
    }

    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");
}

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKev").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"
                    , html: "Key,Memoはいずれも必須です。"
                    , type: "error"
                    , allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = ("LocalStorageに\n「" + key + " " + value + "」\nを保存(save)しますか？");
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {

                        localStorage.setItem(key, value);
                        viweStorage();
                        let w_msg = "LocalStorageから" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKev").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
            }
        }, false
    );
};

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const checkbox1 = document.getElementsByName("checkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox(del);

            if (w_cnt >= 1) {

                let w_confirm = "LocalStorageから選択されている" + w_cnt + "件を削除しますか？";

                Swal.fire({
                    title: "Memo app"
                    , html: w_confirm
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {

                        for (let i = 0; i < checkbox1.length; i++) {
                            if (checkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viweStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKev").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
            }
        }, false
    );

    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {

            if (e.target.classList.contains("trash") === true) {
                let parent = e.target.closest('td');
                let eprev = parent.previousElementSibling;
                let eprevprev = eprev.previousElementSibling;
                let key = eprevprev.firstChild.data;
                let value = eprev.firstChild.data;
                let w_delete = `LocalStorageから\n ${key} ${value} \nを削除しますか？`;

                Swal.fire({
                    title: "Memo app",
                    html: w_delete,
                    type: "question",
                    showCancelButton: true
                }).then(result => {
                    if (result.value === true) {
                        localStorage.removeItem(key);
                        viweStorage();
                        let w_msg = `LocalStorageから${key} ${value}」\nを削除しました！`;
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.getElementById("textKev").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
            }
        }
    );
}

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = "LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか?";

            Swal.fire({
                title: "Memo app"
                , html: w_confirm
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {

                    localStorage.clear();
                    viweStorage();
                    let w_msg = "LocalStorageから全て削除しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKev").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })

        }, false
    );
}

function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox(select);
        }, false
    );
}

function selectCheckBox(model) {
    // let w_sel = "0";
    let w_cnt = 0;
    const checkbox1 = document.getElementsByName("checkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < checkbox1.length; i++) {
        if (checkbox1[i].checked) {
            if (w_cnt === 0) {

                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }

    document.getElementById("textKev").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (model === document.getElementById("select")) {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "１つ選択(select)してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
    if (model === document.getElementById("del")) {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "１つ以上選択(select)してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
};
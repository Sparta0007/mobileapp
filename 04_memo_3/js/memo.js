"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません。");
            return;
        } else {
            viweStorage();
            saveLocalStorage();
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
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name = 'radio1' type = 'radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
}

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKev").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                window.alert("Key,Memoはいずれも必須です。");
                return;
            } else {
                viweStorage();
                localStorage.setItem(key, value);
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectRadioBtn();
        }, false
    );
}

function selectRadioBtn() {
    let w_sel = "0";
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKev").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }

    alert("１つ選択(select)してください。");
}
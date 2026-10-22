// ================================
// HTMLの部品を取得
// ================================

const addButton = document.getElementById("addButton");
const inputForm = document.getElementById("inputForm");
const saveButton = document.getElementById("saveButton");

const type = document.getElementById("type");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const memo = document.getElementById("memo");
const date = document.getElementById("date");

const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");

const history = document.getElementById("history");


// ================================
// 保存されているデータを読み込む
// ================================

let records =
    JSON.parse(localStorage.getItem("records")) || [];


// ================================
// 「＋収支を追加」ボタン
// ================================

addButton.addEventListener("click", function () {

    // フォームが開いていたら閉じる
    if (inputForm.style.display === "block") {

        inputForm.style.display = "none";

    } else {

        // 閉じていたら開く
        inputForm.style.display = "block";
    }

});


// ================================
// 「登録する」ボタン
// ================================

saveButton.addEventListener("click", function () {

    // 入力された金額を数字に変換
    const money = Number(amount.value);


    // 金額が正しく入力されているか確認
    if (money <= 0) {

        alert("金額を入力してください");

        return;
    }


    // 日付が入力されているか確認
    if (date.value === "") {

        alert("日付を入力してください");

        return;
    }


    // 1件分の家計簿データを作成
    const record = {

        date: date.value,

        type: type.value,

        amount: money,

        category: category.value,

        memo: memo.value

    };


    // データを追加
    records.push(record);


    // localStorageに保存
    localStorage.setItem(
        "records",
        JSON.stringify(records)
    );


    // 画面を更新
    displayRecords();


    // 金額を空にする
    amount.value = "";


    // メモを空にする
    memo.value = "";


    // 入力フォームを閉じる
    inputForm.style.display = "none";

});


// ================================
// 家計簿を画面に表示する関数
// ================================

function displayRecords() {

    // 合計収入
    let totalIncome = 0;

    // 合計支出
    let totalExpense = 0;


    // 履歴表示を一度全部消す
    history.innerHTML = "";


    // recordsの中身を1件ずつ処理
    records.forEach(function (record, index) {


        // ----------------
        // 金額を計算
        // ----------------

        if (record.type === "income") {

            totalIncome += record.amount;

        } else {

            totalExpense += record.amount;

        }


        // ----------------
        // 履歴の箱を作る
        // ----------------

        const historyItem =
            document.createElement("div");

        historyItem.classList.add(
            "history-item"
        );


        // ----------------
        // 履歴の文字
        // ----------------

        const historyText =
            document.createElement("span");


        // 収入の場合
        if (record.type === "income") {

            historyText.textContent =
                record.date +
                "　" +
                record.category +
                "　+" +
                record.amount.toLocaleString() +
                "円";

        }

        // 支出の場合
        else {

            historyText.textContent =
                record.date +
                "　" +
                record.category +
                "　-" +
                record.amount.toLocaleString() +
                "円";

        }


        // ----------------
        // 削除ボタン
        // ----------------

        const deleteButton =
            document.createElement("button");


        deleteButton.textContent =
            "削除";


        deleteButton.classList.add(
            "delete-button"
        );


        // 削除ボタンが押されたとき
        deleteButton.addEventListener(
            "click",
            function () {


                // 指定されたデータを削除
                records.splice(index, 1);


                // 削除後のデータを保存
                localStorage.setItem(
                    "records",
                    JSON.stringify(records)
                );


                // 画面を更新
                displayRecords();

            }
        );


        // ----------------
        // 履歴を組み立てる
        // ----------------

        historyItem.appendChild(
            historyText
        );


        historyItem.appendChild(
            deleteButton
        );


        // 新しい履歴を上に追加
        history.prepend(
            historyItem
        );

    });


    // ================================
    // 合計金額を表示
    // ================================

    income.textContent =
        totalIncome.toLocaleString();


    expense.textContent =
        totalExpense.toLocaleString();


    balance.textContent =
        (
            totalIncome -
            totalExpense
        ).toLocaleString();


    // ================================
    // 履歴がない場合
    // ================================

    if (records.length === 0) {

        history.innerHTML =
            '<p id="noHistory">まだ履歴はありません。</p>';

    }

}


// ================================
// 今日の日付を最初から入力
// ================================

date.value =
    new Date().toLocaleDateString(
        "sv-SE"
    );


// ================================
// アプリ起動時に家計簿を表示
// ================================

displayRecords();
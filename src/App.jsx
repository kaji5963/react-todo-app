import React, { useState } from "react";
import "./App.css";

export const App = () => {
  //useState宣言
  //入力データの状態管理
  const [todo, setTodo] = useState({
    id: Math.floor(Math.random() * 300),
    title: "",
    date: "",
    detail: "",
    status: "schedule",
  });
  //追加されるTODOの状態管理
  const [addTodo, setAddTodo] = useState([]);
  //edit及びaddのフォーマット切り替えの状態管理
  const [editTodo, setEditTodo] = useState(false);
  //edit中の新しいデータの状態管理
  const [currentTodo, setCurrentTodo] = useState({});
  //ステータスに応じたフィルタリングの状態管理
  const [filter, setFilter] = useState("all");

  //入力データのTODO追加処理
  const onClickAdd = () => {
    if (todo.title === "") return;
    const newTodo = [...addTodo, todo];
    setAddTodo(newTodo);
    setTodo({
      id: Math.floor(Math.random() * 300),
      title: "",
      date: "",
      detail: "",
      status: "schedule",
    });
  };
  //入力TODOの削除処理
  const clickDelete = (id) => {
    const deleteTodo = [...addTodo];
    const newDeleteTodo = deleteTodo.filter((todo) => {
      return todo.id !== id;
    });
    setAddTodo(newDeleteTodo);
  };
  //editとの切り替え処理
  const clickEdit = (todo) => {
    // const editChangeTodo = [...addTodo];
    // const newEditTodo = editChangeTodo.map((todo, id) => {
    //   return todo.id !== id
    // });
    setEditTodo(true);
    setCurrentTodo({ ...todo });
  };

  // const editUpdateTodo = (todo, id) => {
  // const updateTodo = addTodo.map((id, updateTodo) => {
  //   return addTodo.id === id ? updateTodo : id;
  // });
  // }
  // updateTodo(currentTodo.id, currentTodo);

  const clickUpdate = () => {
    const newClickUpdate = [{ ...currentTodo }];
    setAddTodo(newClickUpdate);
    setEditTodo(false);
  };
  //絞り込み処理
  const selectChange = (e) => {
    setFilter(e.target.value);
    setFilter({ ...todo });
  };
  // const filterTodo = (todo) => {
  //   const filterTodo = [...addTodo, { ...todo }];
  //   const newFilterTodo = filterTodo.filter(({ filter }) => {
  //     switch (filter) {
  //       case "all":
  //         return true;
  //       case "schedule":
  //         return !complete;
  //       case "progress":
  //         return !complete;
  //       case "complete":
  //         return complete;
  //       default:
  //         return true;
  //     }
  //   });
  // };

  return (
    <>
      {/* 見出し */}
      <h1>~ React TODO App ~</h1>
      {/* TODO入力部分 */}
      <div className="input-area">
        <p className="title">~ Add TODO ~</p>
        <input
          placeholder="please enter todo"
          type="text"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })} //入力部分のデータを取得
        />
        <input
          type="date"
          value={todo.date}
          onChange={(e) => setTodo({ ...todo, date: e.target.value })} //日付部分のデータを取得
        />
        <textarea
          placeholder="Please enter details"
          type="text"
          value={todo.detail}
          onChange={(e) => setTodo({ ...todo, detail: e.target.value })} //テキスト部分のデータを取得
        ></textarea>
        <button onClick={onClickAdd}>Add TODO</button>
      </div>
      {editTodo ? (
        //ここからeditに切り替える
        //true=edit処理
        <div className="schedule-contents">
          <div className="schedule-section">
            <p className="title" style={{ color: "red" }}>
              ~ Edit TODO ~
            </p>
            <select className="status-select">
              <option value="all">ALL TODO</option>
              <option value="schedule">Schedule TODO</option>
              <option value="progress">Progress TODO</option>
              <option value="complete">Complete TODO</option>
            </select>
          </div>
          {/* TODO選択部分 */}
          {addTodo.map((todo) => {
            return (
              <div key={todo.id} className="edit-item">
                <input
                  className="edit-input"
                  value={currentTodo.title}
                  onChange={(e) =>
                    // 切り替え前のデータ(title)を取得しedit状態にする
                    setCurrentTodo({ ...currentTodo, title: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={currentTodo.date}
                  onChange={(e) =>
                    // 切り替え前のデータ(date)を取得しedit状態にする
                    setCurrentTodo({ ...currentTodo, date: e.target.value })
                  }
                />
                <select className="status-select">
                  <option value="Schedule">Schedule TODO</option>
                  <option value="Progress">Progress TODO</option>
                  <option value="Complete">Complete TODO</option>
                </select>
                <textarea
                  type="text"
                  value={currentTodo.detail}
                  onChange={(e) =>
                    // 切り替え前のデータ(detail)を取得しedit状態にする
                    setCurrentTodo({ ...currentTodo, detail: e.target.value })
                  }
                ></textarea>
                <button onClick={() => clickUpdate(todo)}>Update</button>
                <button onClick={() => setEditTodo(false)}>Cancel</button>
              </div>
            );
          })}
        </div>
      ) : (
        //ここからaddに切り替える
        //false=add処理（初期値false）
        <div className="schedule-contents">
          <div className="schedule-section">
            <p className="title">~ Schedule TODO ~</p>
            <select className="status-select" onChange={selectChange}>
              <option value="all">ALL TODO</option>
              <option value="schedule">Schedule TODO</option>
              <option value="progress">Progress TODO</option>
              <option value="complete">Complete TODO</option>
            </select>
          </div>
          {/* TODO/追加部分 */}
          {addTodo
            .filter((todo) => todo.status !== filter)
            .map((todo) => {
              return (
                <div key={todo.id} className="schedule-item">
                  <p>{todo.title}</p>
                  <input
                    type="date"
                    value={todo.date}
                    onChange={(e) => setTodo({ ...todo, date: e.target.value })} //日付部分のデータを取得
                  />
                  <select className="status-select" onChange={selectChange}>
                    <option value="Schedule">Schedule TODO</option>
                    <option value="Progress">Progress TODO</option>
                    <option value="Complete">Complete TODO</option>
                  </select>
                  <textarea
                    type="text"
                    value={todo.detail}
                    onChange={
                      (e) => setTodo({ ...todo, detail: e.target.value }) //テキスト部分のデータを取得
                    }
                  ></textarea>
                  <button onClick={() => clickEdit(todo)}>Edit</button>
                  <button onClick={() => clickDelete(todo.id)}>Remove</button>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
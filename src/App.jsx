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

  // const [filter, setFilter] = useState("schedule");

  //入力部分のデータを取得
  const changeInput = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };
  //日付部分のデータを取得
  const changeDate = (e) => {
    setTodo({ ...todo, date: e.target.value });
  };
  //テキスト部分のデータを取得
  const changeDetail = (e) => {
    setTodo({ ...todo, detail: e.target.value });
  };
  //入力データのクリック処理
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
    setEditTodo(true);
    setCurrentTodo({ ...todo });
  };
  // 切り替え前のデータ(title)を取得しedit状態にする
  const editInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };
  // 切り替え前のデータ(date)を取得しedit状態にする
  const editDateChange = (e) => {
    setCurrentTodo({ ...currentTodo, date: e.target.value });
  };
  // 切り替え前のデータ(detail)を取得しedit状態にする
  const editDetailChange = (e) => {
    setCurrentTodo({ ...currentTodo, detail: e.target.value });
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

  // const selectChange = (e, todo) => {
  //   setAddTodo(e.target.value);
  //   const filterTodo = [...addTodo, { ...todo }];
  //   const newFilterTodo = filterTodo.filter(({ complete }) => {
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
  //   setFilter(newFilterTodo);
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
          onChange={changeInput}
        />
        <input type="date" value={todo.date} onChange={changeDate} />
        <textarea
          placeholder="Please enter details"
          type="text"
          value={todo.detail}
          onChange={changeDetail}
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
                  onChange={editInputChange}
                />
                <input
                  type="date"
                  value={currentTodo.date}
                  onChange={editDateChange}
                />
                <select className="status-select">
                  <option value="Schedule">Schedule TODO</option>
                  <option value="Progress">Progress TODO</option>
                  <option value="Complete">Complete TODO</option>
                </select>
                <textarea
                  type="text"
                  value={currentTodo.detail}
                  onChange={editDetailChange}
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
            <select className="status-select">
              <option value="all">ALL TODO</option>
              <option value="schedule">Schedule TODO</option>
              <option value="progress">Progress TODO</option>
              <option value="complete">Complete TODO</option>
            </select>
          </div>
          {/* TODO/追加部分 */}
          {addTodo.map((todo, id) => {
            return (
              <div key={todo.id} className="schedule-item">
                <p>{todo.title}</p>
                <input type="date" value={todo.date} onChange={changeDate} />
                <select className="status-select">
                  <option value="Schedule">Schedule TODO</option>
                  <option value="Progress">Progress TODO</option>
                  <option value="Complete">Complete TODO</option>
                </select>
                <textarea
                  type="text"
                  value={todo.detail}
                  onChange={changeDetail}
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

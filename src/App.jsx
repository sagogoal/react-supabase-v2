import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// SupabaseのURLとキーを設定
const supabaseUrl = "https://amjcstrouwnkdjcvrvrz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamNzdHJvdXdua2RqY3ZydnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NjMyMTgsImV4cCI6MjA1MjEzOTIxOH0.qn3r0Hiam2ldS7YarQEvgl1JkhbDAgpV9Hhojt0jilk";

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  //フォームの入力内容を保持
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState("");

  //画面描画に使うSupabaseのデータを保持
  const [records, setRecords] = useState([]);

  //画面の状態を管理
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onChangeStudyTitle= (event) => {
    setStudyTitle(event.target.value);
  };
  const onChangeStudyTime = (event) => {
    setStudyTime(event.target.value);
  };

  const onDeleteStudy = async (id) => {
    try {
      const error = await supabase
      .from("study-record")
      .delete()
      .eq('id', id)

      fetchRecords();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  }

  const onAddRecord = async () => {
    try {
      const { error } = await supabase
        .from("study-record")
        .insert({ title: studyTitle, time: studyTime })

        setStudyTime("");
        setStudyTitle("");
        fetchRecords();

        if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  // データを取得する関数
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("study-record")
        .select();

      if (error) throw error;

      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // ローディング状態を終了
    }
  };

  // コンポーネントの初回レンダリング時にデータを取得
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h2>学習記録</h2>
      <p>学習内容</p>
      <input  placeholder="学習内容を入力" type="text" value={studyTitle} onChange={onChangeStudyTitle} />
      <p>学習時間</p>
      <input placeholder="学習時間を入力" type="number" value={studyTime} onChange={onChangeStudyTime}/>
      <button onClick={onAddRecord}>登録</button>

      <h2>学習記録一覧</h2>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
      {!loading && !error && (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {record.title} : {record.time}時間   <button onClick={() => onDeleteStudy(record.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

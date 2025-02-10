import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  VStack,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { CustomModal } from "./components/morecures/CustomModal";

// SupabaseのURLとキーを設定
const supabaseUrl = "https://amjcstrouwnkdjcvrvrz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtamNzdHJvdXdua2RqY3ZydnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NjMyMTgsImV4cCI6MjA1MjEzOTIxOH0.qn3r0Hiam2ldS7YarQEvgl1JkhbDAgpV9Hhojt0jilk";

const supabase = createClient(supabaseUrl, supabaseKey);

interface StudyRecord {
  id: string;
  title: string;
  time: string;
}

function App() {
  //フォームの入力内容を保持
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState("");

  //編集対象のレコードを保持
  const [editingRecord, setEditingRecord] = useState<StudyRecord>({
    id: "",
    title: "",
    time: "",
  });

  //画面描画に使うSupabaseのデータを保持
  const [records, setRecords] = useState<StudyRecord[]>([]);

  //画面の状態を管理
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeStudyTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTitle(event.target.value);
  };
  const onChangeStudyTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTime(event.target.value);
  };

  const onDeleteStudy = async (id: string) => {
    try {
      const { error } = await supabase.from("study-record").delete().eq("id", id);

      if (error) throw error;
      fetchRecords();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  const onModifyStudy = async (id: string, title: string, time: string) => {
    console.log(id, title, time);
    try {
      const { error } = await supabase
        .from("study-record")
        .update({ id: id, title: title, time: time })
        .match({ id: id });
      if (error) throw error;
      fetchRecords();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  const onAddRecord = async () => {
    try {
      const { error } = await supabase
        .from("study-record")
        .insert({ title: studyTitle, time: studyTime });

      setStudyTime("");
      setStudyTitle("");
      fetchRecords();

      if (error) throw error;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const onOpenModal = (record: StudyRecord) => {
    setEditingRecord(record);
    onOpen();
  };

  // データを取得する関数
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("study-record").select();

      if (error) throw error;

      setRecords(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false); // ローディング状態を終了
    }
  };

  // コンポーネントの初回レンダリング時にデータを取得
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={5} align="center">
        <VStack align="center" spacing={3}>
          <h2>学習記録v2</h2>
          <Input placeholder="学習内容を入力" value={studyTitle} onChange={onChangeStudyTitle} />
          <Input
            placeholder="学習時間を入力"
            type="number"
            value={studyTime}
            onChange={onChangeStudyTime}
          />
          <Button colorScheme="blue" onClick={onAddRecord}>
            登録
          </Button>
        </VStack>

        <VStack align="stretch" spacing={3}>
          <h2>学習記録一覧</h2>
          {loading && <p>読み込み中...</p>}
          {error && <p style={{ color: "red" }}>エラー: {error}</p>}
          {!loading && !error && (
            <TableContainer borderWidth="1px" borderRadius="lg">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>タイトル</Th>
                    <Th>時間</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {records.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.title}</Td>
                      <Td>{record.time}時間</Td>
                      <Td>
                        <EditIcon
                          onClick={() => {
                            onOpenModal(record);
                          }}
                          w={4}
                          h={4}
                        />
                        <DeleteIcon
                          onClick={() => onDeleteStudy(record.id)}
                          margin={"0 10px"}
                          w={4}
                          h={4}
                          color="red.400"
                          data-testid="delete-button"
                        />
                      </Td>
                    </Tr>
                  ))}{" "}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </VStack>
      </VStack>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="記録編集"
        action={
          <Button
            colorScheme="blue"
            onClick={() => onModifyStudy(editingRecord.id, editingRecord.title, editingRecord.time)}
            mr={3}
          >
            更新
          </Button>
        }
      >
        <FormControl>
          <FormLabel>学習内容</FormLabel>
          <Input
            placeholder="学習内容を入力してね"
            value={editingRecord.title}
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                title: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>学習時間</FormLabel>
          <Input
            placeholder="学習時間を入力してね"
            value={editingRecord.time}
            onChange={(e) =>
              setEditingRecord({
                ...editingRecord,
                time: e.target.value,
              })
            }
          />
        </FormControl>
      </CustomModal>
    </Container>
  );
}

export default App;
